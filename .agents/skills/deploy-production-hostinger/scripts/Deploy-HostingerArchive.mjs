import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

function parseArguments(argv) {
  const values = {};
  for (const argument of argv) {
    const match = argument.match(/^--([^=]+)=(.*)$/s);
    if (match) values[match[1]] = match[2];
  }
  return values;
}

function readEnvFile(filePath) {
  const values = {};
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([^#=]+)=(.*)$/);
    if (!match) continue;
    values[match[1].trim()] = match[2]
      .trim()
      .replace(/^(['"])(.*)\1$/, "$2");
  }
  return values;
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 60_000) {
  return fetch(url, {
    ...options,
    signal: AbortSignal.timeout(timeoutMs),
  });
}

async function requireJson(response, operation) {
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`${operation} HTTP ${response.status}: ${text.slice(0, 500)}`);
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`${operation} devolvio una respuesta no JSON.`);
  }
}

const args = parseArguments(process.argv.slice(2));
const archivePath = path.resolve(args.archive ?? "");
const envPath = path.resolve(args.env ?? ".env.local");
const domain = args.domain ?? "cejasinternacionales.com";
const expectedNodeVersion = Number(args.node ?? "22");

if (!fs.existsSync(archivePath) || !fs.statSync(archivePath).isFile()) {
  throw new Error(`No existe el archivo de despliegue: ${archivePath}`);
}
if (!fs.existsSync(envPath)) throw new Error(`No existe ${envPath}.`);
if (![18, 20, 22, 24].includes(expectedNodeVersion)) {
  throw new Error(`Version de Node no soportada: ${expectedNodeVersion}`);
}

const archiveSize = fs.statSync(archivePath).size;
const maximumArchiveSize = 50 * 1024 * 1024;
if (archiveSize > maximumArchiveSize) {
  throw new Error(`El ZIP ocupa ${archiveSize} bytes y supera el limite de 50 MB.`);
}

const env = readEnvFile(envPath);
const token = env.HOSTINGER_API_TOKEN;
if (!token) throw new Error("Falta HOSTINGER_API_TOKEN en .env.local.");

const apiHeaders = {
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
  "User-Agent": "hostinger-mcp-server/1.8.2",
};

const websitesResponse = await fetchWithTimeout(
  "https://developers.hostinger.com/api/hosting/v1/websites",
  { headers: apiHeaders },
);
const websitesPayload = await requireJson(websitesResponse, "Listar websites");
const websites = websitesPayload.data ?? websitesPayload;
const website = websites.find((item) => item.domain === domain);
if (!website) throw new Error(`Hostinger no devolvio el dominio ${domain}.`);

const credentialsResponse = await fetchWithTimeout(
  "https://developers.hostinger.com/api/hosting/v1/files/upload-urls",
  {
    method: "POST",
    headers: apiHeaders,
    body: JSON.stringify({ username: website.username, domain }),
  },
);
const credentials = await requireJson(
  credentialsResponse,
  "Obtener credenciales de subida",
);
if (!credentials.url || !credentials.auth_key || !credentials.rest_auth_key) {
  throw new Error("Hostinger devolvio credenciales de subida incompletas.");
}

const remoteArchive = path.basename(archivePath);
const uploadUrl = `${credentials.url.replace(/\/$/, "")}/${encodeURIComponent(remoteArchive)}?override=true`;
const commonUploadHeaders = {
  "X-Auth": credentials.auth_key,
  "X-Auth-Rest": credentials.rest_auth_key,
  "upload-length": String(archiveSize),
  "upload-offset": "0",
};

const createResponse = await fetchWithTimeout(
  uploadUrl,
  { method: "POST", headers: commonUploadHeaders, body: "" },
);
if (createResponse.status !== 201) {
  throw new Error(
    `Crear subida TUS HTTP ${createResponse.status}: ${(await createResponse.text()).slice(0, 300)}`,
  );
}

let offset = 0;
const fileHandle = await fs.promises.open(archivePath, "r");
try {
  const chunkSize = 10 * 1024 * 1024;
  while (offset < archiveSize) {
    const requestedBytes = Math.min(chunkSize, archiveSize - offset);
    const chunk = Buffer.allocUnsafe(requestedBytes);
    const { bytesRead } = await fileHandle.read(
      chunk,
      0,
      requestedBytes,
      offset,
    );
    const body = bytesRead === requestedBytes ? chunk : chunk.subarray(0, bytesRead);
    const patchResponse = await fetchWithTimeout(
      uploadUrl,
      {
        method: "PATCH",
        headers: {
          ...commonUploadHeaders,
          "Content-Type": "application/offset+octet-stream",
          "upload-offset": String(offset),
        },
        body,
      },
      120_000,
    );
    if (patchResponse.status !== 204) {
      throw new Error(
        `Subir bloque TUS HTTP ${patchResponse.status}: ${(await patchResponse.text()).slice(0, 300)}`,
      );
    }
    offset = Number(
      patchResponse.headers.get("upload-offset") ?? offset + bytesRead,
    );
    console.error(`[Hostinger] Archivo ${Math.round((offset / archiveSize) * 100)}%.`);
  }
} finally {
  await fileHandle.close();
}

const buildsUrl = `https://developers.hostinger.com/api/hosting/v1/accounts/${encodeURIComponent(website.username)}/websites/${encodeURIComponent(domain)}/nodejs/builds`;
const settingsResponse = await fetchWithTimeout(
  `${buildsUrl}/settings/from-archive?archive_path=${encodeURIComponent(remoteArchive)}`,
  { headers: apiHeaders },
);
const settingsPayload = await requireJson(
  settingsResponse,
  "Detectar configuracion del archivo",
);
const settings = settingsPayload.data ?? settingsPayload;
if (settings.app_type !== "next") {
  throw new Error(`Hostinger detecto ${settings.app_type ?? "sin framework"}, no Next.js.`);
}

// Conservar la autodeteccion de Hostinger. Forzar "./" en lugar de null puede
// compilar correctamente y aun asi impedir que el runtime de Next se active.
const buildRequest = {
  ...settings,
  node_version: expectedNodeVersion,
  source_type: "archive",
  source_options: { archive_path: remoteArchive },
};
const buildResponse = await fetchWithTimeout(
  buildsUrl,
  {
    method: "POST",
    headers: apiHeaders,
    body: JSON.stringify(buildRequest),
  },
);
const buildPayload = await requireJson(buildResponse, "Crear build Hostinger");
const build = buildPayload.data ?? buildPayload;
if (!build.uuid) throw new Error("Hostinger no devolvio UUID para el build.");
if (Number(build.options?.node_version) !== expectedNodeVersion) {
  throw new Error(
    `Hostinger creo el build con Node ${build.options?.node_version}, no Node ${expectedNodeVersion}.`,
  );
}
if (build.options?.source_type !== "archive") {
  throw new Error(`Hostinger devolvio una fuente inesperada: ${build.options?.source_type}.`);
}

const sha256 = createHash("sha256")
  .update(fs.readFileSync(archivePath))
  .digest("hex")
  .toUpperCase();

process.stdout.write(
  `${JSON.stringify({
    schema: 1,
    domain,
    archive: archivePath,
    archive_bytes: archiveSize,
    archive_sha256: sha256,
    remote_archive: remoteArchive,
    detected: {
      app_type: settings.app_type,
      node_version: settings.node_version,
      root_directory: settings.root_directory,
      output_directory: settings.output_directory,
      build_script: settings.build_script,
      entry_file: settings.entry_file,
      package_manager: settings.package_manager,
    },
    build: {
      uuid: build.uuid,
      state: build.state,
      node_version: Number(build.options.node_version),
      source_type: build.options.source_type,
    },
  })}\n`,
);
