import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = resolve(fileURLToPath(import.meta.url), '..');
const clientDir = resolve(__dirname, '..', 'dist', 'client');

// Import the worker handler
let workerHandler;
try {
  const module = await import('../dist/server/index.js');
  workerHandler = module.default;
} catch (error) {
  console.error('Failed to load server handler:', error);
}

// Utility to check if a path is a static asset
function isStaticAsset(pathname) {
  return pathname.match(/\.(js|css|svg|png|ico|webmanifest|json)$/i) || 
         pathname.startsWith('/assets/') ||
         pathname.startsWith('/icons/') ||
         pathname === '/manifest.webmanifest' ||
         pathname === '/offline.html';
}

// Serve static files from dist/client
function serveStaticFile(pathname, response) {
  let filePath = pathname === '/' ? '/index.html' : pathname;
  const fullPath = resolve(clientDir, filePath.substring(1));
  
  if (!existsSync(fullPath)) {
    return null;
  }
  
  try {
    const content = readFileSync(fullPath);
    const ext = filePath.split('.').pop();
    
    const contentTypeMap = {
      'html': 'text/html; charset=utf-8',
      'js': 'application/javascript',
      'css': 'text/css',
      'svg': 'image/svg+xml',
      'png': 'image/png',
      'ico': 'image/x-icon',
      'json': 'application/json',
      'webmanifest': 'application/manifest+json',
    };
    
    response.setHeader('Content-Type', contentTypeMap[ext] || 'application/octet-stream');
    
    // Cache static assets
    if (ext !== 'html' && ext !== 'json') {
      response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
      response.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    }
    
    response.end(content);
    return true;
  } catch (error) {
    console.error('Static file serve error:', error);
    return null;
  }
}

// Convert Node.js request to Fetch API Request
async function createFetchRequest(nodeRequest) {
  const url = new URL(nodeRequest.url, `http://${nodeRequest.headers.host}`);
  const method = nodeRequest.method || 'GET';
  
  let body = undefined;
  if (method !== 'GET' && method !== 'HEAD') {
    body = nodeRequest;
  }
  
  return new Request(url.toString(), {
    method,
    headers: nodeRequest.headers,
    body,
  });
}

// Convert Fetch API Response to Node.js response
async function sendFetchResponse(fetchResponse, nodeResponse) {
  nodeResponse.statusCode = fetchResponse.status;
  
  for (const [key, value] of fetchResponse.headers.entries()) {
    nodeResponse.setHeader(key, value);
  }
  
  if (fetchResponse.body) {
    const buffer = await fetchResponse.arrayBuffer();
    nodeResponse.end(Buffer.from(buffer));
  } else {
    nodeResponse.end();
  }
}

// Main handler
export default async function handler(request, response) {
  const { pathname } = new URL(request.url, `http://${request.headers.host}`);
  
  // Security headers
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Frame-Options', 'DENY');
  response.setHeader('X-XSS-Protection', '1; mode=block');
  
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
        // Create a Fetch API request from the Node.js request
        const fetchRequest = await createFetchRequest(request);
        const fetchResponse = await workerHandler(fetchRequest);
        
        // Send the Fetch API response back as a Node.js response
        await sendFetchResponse(fetchResponse, response);
      } catch (error) {
        console.error('Handler execution error:', error);
        response.status(500).json({ error: 'Handler error: ' + error.message });
      }
    } else {
      response.status(500).json({ error: 'Server handler not available' });
    }
  } catch (error) {
    console.error('Request handler error:', error);
    response.status(500).json({ error: 'Internal server error: ' + error.message });
  }
}
