import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = resolve(fileURLToPath(import.meta.url), "..");
const clientDir = resolve(process.cwd(), "dist", "client");

let workerHandler;
try {
  const paths = [
    resolve(process.cwd(), "dist", "server", "server.js"),
    resolve(process.cwd(), "dist", "server", "index.js"),
    "../dist/server/server.js",
  ];

  for (const p of paths) {
    try {
      if (existsSync(p) || !p.startsWith("/")) {
        const module = await import(p);
        workerHandler = module.default || module;
        if (workerHandler) {
          console.log(`Loaded server handler from: ${p}`);
          break;
        }
      }
    } catch (e) {
      // Continue to next path
    }
  }
} catch (error) {
  console.error("Failed to load server handler:", error);
}

// Utility to check if a path is a static asset
function isStaticAsset(pathname) {
  return (
    pathname.match(/\.(js|css|svg|png|ico|webmanifest|json)$/i) ||
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/icons/") ||
    pathname === "/manifest.webmanifest" ||
    pathname === "/offline.html"
  );
}

// Serve static files from dist/client
function serveStaticFile(pathname, response) {
  let filePath = pathname === "/" ? "/index.html" : pathname;
  const fullPath = resolve(clientDir, filePath.substring(1));

  if (!existsSync(fullPath)) {
    return null;
  }

  try {
    const content = readFileSync(fullPath);
    const ext = filePath.split(".").pop();

    const contentTypeMap = {
      html: "text/html; charset=utf-8",
      js: "application/javascript",
      css: "text/css",
      svg: "image/svg+xml",
      png: "image/png",
      ico: "image/x-icon",
      json: "application/json",
      webmanifest: "application/manifest+json",
    };

    response.setHeader("Content-Type", contentTypeMap[ext] || "application/octet-stream");

    // Cache static assets
    if (ext !== "html" && ext !== "json") {
      response.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    } else {
      response.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    }

    response.end(content);
    return true;
  } catch (error) {
    console.error("Static file serve error:", error);
    return null;
  }
}

// Convert Node.js request to Fetch API Request
async function createFetchRequest(nodeRequest) {
  const protocol = nodeRequest.headers["x-forwarded-proto"] || "http";
  const host = nodeRequest.headers["host"];
  const url = new URL(nodeRequest.url, `${protocol}://${host}`);
  const method = nodeRequest.method || "GET";

  // Filter headers
  const forbiddenHeaders = [
    "connection",
    "content-length",
    "host",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailers",
    "transfer-encoding",
    "upgrade",
  ];
  const headers = new Headers();
  for (const [key, value] of Object.entries(nodeRequest.headers)) {
    if (!forbiddenHeaders.includes(key.toLowerCase()) && value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((v) => headers.append(key, v));
      } else {
        headers.set(key, value);
      }
    }
  }

  let body = undefined;
  if (method !== "GET" && method !== "HEAD") {
    body = nodeRequest;
  }

  return new Request(url.toString(), {
    method,
    headers,
    body,
    redirect: "manual",
  });
}

// Convert Fetch API Response to Node.js response
async function sendFetchResponse(fetchResponse, nodeResponse) {
  nodeResponse.statusCode = fetchResponse.status;

  for (const [key, value] of fetchResponse.headers.entries()) {
    if (key.toLowerCase() !== "content-length") {
      nodeResponse.setHeader(key, value);
    }
  }

  const body = await fetchResponse.arrayBuffer();
  nodeResponse.end(Buffer.from(body));
}

// Main handler
export default async function handler(request, response) {
  const { pathname } = new URL(request.url, `http://${request.headers.host}`);

  try {
    // Try to serve static files first
    if (isStaticAsset(pathname)) {
      if (serveStaticFile(pathname, response)) {
        return;
      }
    }

    // Fall back to server handler (SSR)
    if (workerHandler) {
      try {
        const fetchRequest = await createFetchRequest(request);

        const fetchResponse =
          typeof workerHandler === "function"
            ? await workerHandler(fetchRequest, process.env, {})
            : await workerHandler.fetch(fetchRequest, process.env, {});

        await sendFetchResponse(fetchResponse, response);
      } catch (error) {
        console.error("SSR Execution Error:", error);
        response.statusCode = 500;
        response.setHeader("Content-Type", "application/json");
        response.end(
          JSON.stringify({
            error: "SSR Execution Error",
            message: error.message,
            stack: error.stack,
          }),
        );
      }
    } else {
      console.error("Server handler not found in dist/server");
      response.statusCode = 500;
      response.end('Server handler not available. Check if "npm run build" was successful.');
    }
  } catch (error) {
    console.error("Global Request Error:", error);
    response.statusCode = 500;
    response.end("Internal Error: " + error.message);
  }
}
