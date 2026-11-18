// Renders design/social-card.svg to public/social-card.png (1200x630) using headless Chrome.
// Usage: node scripts/render-social-card.cjs   (set CHROME_BIN to override the browser path)
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const svg = path.join(root, 'design', 'social-card.svg');
const out = path.join(root, 'public', 'social-card.png');
const chrome = process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'social-card-'));
const page = path.join(tmp, 'card.html');
fs.writeFileSync(
  page,
  `<!doctype html><html><body style="margin:0">${fs.readFileSync(svg, 'utf8')}</body></html>`
);
execFileSync(chrome, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars',
  '--window-size=1200,630', `--screenshot=${out}`, `file://${page}`
], { stdio: 'ignore' });
fs.rmSync(tmp, { recursive: true, force: true });
console.log('Wrote', path.relative(root, out));
