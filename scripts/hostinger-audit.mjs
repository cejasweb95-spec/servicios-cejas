#!/usr/bin/env node
/**
 * Auditoría Hostinger + producción cejasinternacionales.com
 * Uso: npm run hostinger:audit
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const SITE = "https://cejasinternacionales.com";
const DOMAIN = "cejasinternacionales.com";
const API_BASE = "https://developers.hostinger.com/api";

function loadEnvLocal() {
  const path = resolve(root, ".env.local");
  if (!existsSync(path)) return {};
  const env = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return env;
}

const env = { ...loadEnvLocal(), ...process.env };
const token = env.HOSTINGER_API_TOKEN?.trim();

async function hostingerGet(path, params = {}) {
  const url = new URL(`${API_BASE}${path}`);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") url.searchParams.set(k, String(v));
  }
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  const text = await res.text();
  let body;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }
  return { ok: res.ok, status: res.status, body };
}

function getLocalPageChunk() {
  try {
    const glob = execSync(
      'powershell -NoProfile -Command "Get-ChildItem .next/static/chunks/app/page-*.js -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty Name"',
      { cwd: root, encoding: "utf8" }
    ).trim();
    const match = glob.match(/page-([a-f0-9]+)\.js/);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

async function analyzeProduction() {
  const paths = ["/", "/robots.txt", "/sitemap.xml"];
  const results = [];
  let homeHtml = "";

  for (const path of paths) {
    const url = `${SITE}${path}`;
    try {
      const res = await fetch(url, { redirect: "follow" });
      const text = path === "/" ? await res.text() : "";
      if (path === "/") homeHtml = text;

      results.push({
        path,
        status: res.status,
        cache: res.headers.get("cache-control") ?? "(sin header)",
        nextCache: res.headers.get("x-nextjs-cache") ?? "(sin header)",
        server: res.headers.get("server") ?? "(sin header)",
        ok: res.ok,
      });
    } catch (err) {
      results.push({ path, error: String(err) });
    }
  }

  const pageChunk = (homeHtml.match(/page-([a-f0-9]+)\.js/) ?? [])[1] ?? null;
  const layoutChunk = (homeHtml.match(/layout-([a-f0-9]+)\.js/) ?? [])[1] ?? null;

  return {
    results,
    build: {
      pageChunk,
      layoutChunk,
      hasInstagram: homeHtml.includes("instagram.com/cejasinternacionales"),
      hasInstagramUi:
        homeHtml.includes("instagram-invite") ||
        homeHtml.includes("social-links") ||
        homeHtml.includes("icon-link--instagram"),
    },
  };
}

function printSection(title) {
  console.log(`\n${"=".repeat(60)}\n${title}\n${"=".repeat(60)}`);
}

async function main() {
  printSection("Producción — cejasinternacionales.com");
  const { results, build } = await analyzeProduction();

  for (const row of results) {
    if (row.error) {
      console.log(`  ✗ ${row.path}: ERROR — ${row.error}`);
      continue;
    }
    const icon = row.ok ? "✓" : "✗";
    console.log(`  ${icon} ${row.path} → HTTP ${row.status}`);
    console.log(`      cache-control: ${row.cache}`);
    console.log(`      x-nextjs-cache: ${row.nextCache}`);
  }

  printSection("Build en producción vs local");
  const localChunk = getLocalPageChunk();
  console.log(`  Producción page chunk: ${build.pageChunk ?? "(no detectado)"}`);
  console.log(`  Local (último build):  ${localChunk ?? "(ejecuta npm run build)"}`);
  console.log(`  Instagram en HTML:     ${build.hasInstagram ? "SÍ" : "NO"}`);
  console.log(`  UI Instagram (clases): ${build.hasInstagramUi ? "SÍ" : "NO"}`);

  if (localChunk && build.pageChunk && localChunk !== build.pageChunk) {
    console.log("\n  ⚠ DESFASE: producción sirve un build anterior al local.");
    console.log("    → Redeploy en hPanel (Frontend web app) y purga caché.");
  }

  if (!build.hasInstagram) {
    console.log("\n  ⚠ Instagram no está en el HTML servido (deploy o caché).");
  }

  if (!token) {
    printSection("Hostinger API");
    console.log("  ⚠ HOSTINGER_API_TOKEN vacío en .env.local");
    return;
  }

  printSection("Hostinger — cuenta y hosting");
  const [websites, portfolio, dns, domainInfo, billing] = await Promise.all([
    hostingerGet("/hosting/v1/websites", { domain: DOMAIN, per_page: 10 }),
    hostingerGet("/domains/v1/portfolio", { per_page: 20 }),
    hostingerGet(`/dns/v1/zones/${DOMAIN}`),
    hostingerGet(`/domains/v1/portfolio/${DOMAIN}`),
    hostingerGet("/billing/v1/subscriptions"),
  ]);

  if (websites.ok && websites.body?.data?.[0]) {
    const w = websites.body.data[0];
    console.log(`  ✓ Web: ${w.domain}`);
    console.log(`      plan order: ${w.order_id} · usuario: ${w.username}`);
    console.log(`      activa: ${w.is_enabled} · raíz: ${w.root_directory}`);
    console.log(`      creada: ${w.created_at}`);
  }

  if (domainInfo.ok && domainInfo.body) {
    const d = domainInfo.body;
    console.log(`\n  ✓ Dominio: ${d.domain} (${d.status})`);
    console.log(`      expira: ${d.expires_at}`);
    console.log(`      privacidad WHOIS: ${d.is_privacy_protected}`);
    console.log(`      NS: ${d.name_servers?.ns1}, ${d.name_servers?.ns2}`);
  }

  if (dns.ok && Array.isArray(dns.body)) {
    console.log("\n  ✓ Zona DNS (registros clave):");
    for (const rec of dns.body) {
      const val = rec.records?.map((r) => r.content).join(", ");
      console.log(`      ${rec.type} ${rec.name} → ${val} (TTL ${rec.ttl})`);
    }
  }

  if (billing.ok && Array.isArray(billing.body)) {
    console.log("\n  ✓ Suscripciones activas:");
    for (const s of billing.body) {
      console.log(
        `      · ${s.name} — ${s.status} — próx. factura ${s.next_billing_at?.slice(0, 10) ?? "?"}`
      );
    }
  }

  printSection("Diagnóstico rápido");
  console.log("  1. GitHub main tiene el commit con Instagram (eefb282).");
  console.log("  2. Si el chunk de producción ≠ local → falta redeploy en Hostinger.");
  console.log("  3. Home con s-maxage=31536000 + x-nextjs-cache HIT → caché agresiva.");
  console.log("  4. Tras redeploy: Ctrl+Shift+R o purgar caché LiteSpeed en hPanel.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
