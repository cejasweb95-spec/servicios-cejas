const baseUrl = process.env.SEO_BASE_URL ?? "http://localhost:3000";
const concurrency = 12;

function match(html, pattern) {
  return pattern.exec(html)?.[1]?.trim() ?? "";
}

async function auditUrl(url) {
  const response = await fetch(url);
  const html = await response.text();
  const title = match(html, /<title>(.*?)<\/title>/is);
  const description = match(
    html,
    /<meta name="description" content="(.*?)"\s*\/?>/is,
  );
  const canonical = match(
    html,
    /<link rel="canonical" href="(.*?)"\s*\/?>/is,
  );
  const lang = match(html, /<html[^>]*lang="([^"]+)"/is);
  const h1Count = (html.match(/<h1(?:\s|>)/gi) ?? []).length;
  const alternates = [
    ...html.matchAll(
      /<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"\s*\/?>/gi,
    ),
  ].map((item) => item[1]);

  return {
    alternates,
    canonical,
    description,
    h1Count,
    lang,
    status: response.status,
    title,
    url,
  };
}

async function mapConcurrent(items, worker) {
  const results = [];
  let nextIndex = 0;

  async function run() {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await worker(items[index]);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => run()),
  );

  return results;
}

const sitemapResponse = await fetch(new URL("/sitemap.xml", baseUrl));

if (!sitemapResponse.ok) {
  throw new Error(`Sitemap returned HTTP ${sitemapResponse.status}`);
}

const sitemap = await sitemapResponse.text();
const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => new URL(match[1]).pathname,
);
const records = await mapConcurrent(paths, (path) =>
  auditUrl(new URL(path, baseUrl).toString()),
);
const issues = [];
const warnings = [];

for (const record of records) {
  const path = new URL(record.url).pathname;
  const canonicalPath = record.canonical
    ? new URL(record.canonical).pathname
    : "";
  const expectedLang = path.startsWith("/en") ? "en" : "es";

  if (record.status !== 200) issues.push(`${path}: HTTP ${record.status}`);
  if (!record.title) issues.push(`${path}: missing title`);
  if (!record.description) issues.push(`${path}: missing meta description`);
  if (canonicalPath !== path) issues.push(`${path}: invalid canonical`);
  if (record.h1Count !== 1) issues.push(`${path}: expected 1 H1, got ${record.h1Count}`);
  if (record.lang !== expectedLang) issues.push(`${path}: invalid lang ${record.lang}`);

  for (const hreflang of ["es", "en", "x-default"]) {
    if (!record.alternates.includes(hreflang)) {
      issues.push(`${path}: missing hreflang ${hreflang}`);
    }
  }

  if (record.title.length > 65) {
    warnings.push(`${path}: title has ${record.title.length} characters`);
  }
  if (record.description.length > 180) {
    warnings.push(
      `${path}: description has ${record.description.length} characters`,
    );
  }
}

for (const field of ["title", "description"]) {
  const values = new Map();

  for (const record of records) {
    const value = record[field];
    values.set(value, [...(values.get(value) ?? []), record.url]);
  }

  for (const [value, urls] of values) {
    if (value && urls.length > 1) {
      issues.push(`duplicate ${field} on ${urls.length} URLs: ${value}`);
    }
  }
}

console.log(
  `SEO crawl: ${records.length} URLs, ${issues.length} issues, ${warnings.length} length warnings.`,
);

if (warnings.length) {
  console.log(warnings.slice(0, 20).join("\n"));
}

if (issues.length) {
  console.error(issues.join("\n"));
  process.exit(1);
}
