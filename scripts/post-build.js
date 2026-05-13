import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Copy index.html to client build
const sourceIndex = path.join(__dirname, '..', 'index.html');
const destIndex = path.join(__dirname, '..', 'dist', 'client', 'index.html');

fs.copyFileSync(sourceIndex, destIndex);

// Find the main entry script
const assetsDir = path.join(__dirname, '..', 'dist', 'client', 'assets');
const files = fs.readdirSync(assetsDir);
const indexJs = files.find(file => file.startsWith('index-') && file.endsWith('.js') && file.split('-').length === 2);

if (indexJs) {
  let htmlContent = fs.readFileSync(destIndex, 'utf8');
  htmlContent = htmlContent.replace('/src/start.ts', `/assets/${indexJs}`);
  fs.writeFileSync(destIndex, htmlContent);
  console.log(`Updated index.html to use ${indexJs}`);
} else {
  console.warn('Could not find index-*.js file');
}