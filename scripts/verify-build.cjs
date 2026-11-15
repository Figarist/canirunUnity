const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const distDir = path.resolve(__dirname, '..', 'dist');

const requiredFiles = [
  'index.html',
  'uk/index.html',
  'ru/index.html',
  'ko/index.html',
  'sitemap.xml',
  'robots.txt',
  'manifest.json',
  'sw.js',
  'favicon.svg'
];

for (const rel of requiredFiles) {
  const full = path.join(distDir, rel);
  assert.ok(fs.existsSync(full), `Missing build artifact: ${rel}`);
}

const routeChecks = [
  { file: 'index.html', lang: 'en', canonical: 'https://sivochka.com/canirunUnity/' },
  { file: 'uk/index.html', lang: 'uk', canonical: 'https://sivochka.com/canirunUnity/uk/' },
  { file: 'ru/index.html', lang: 'ru', canonical: 'https://sivochka.com/canirunUnity/ru/' },
  { file: 'ko/index.html', lang: 'ko', canonical: 'https://sivochka.com/canirunUnity/ko/' }
];

for (const rc of routeChecks) {
  const html = fs.readFileSync(path.join(distDir, rc.file), 'utf8');
  assert.ok(html.includes(`<html lang="${rc.lang}"`), `${rc.file} missing lang="${rc.lang}"`);
  assert.ok(html.includes(rc.canonical), `${rc.file} missing canonical ${rc.canonical}`);
  assert.ok(html.includes('Whr2bJTggESM1pyCXLfqwodNQu6cNqk_XKdZ0ix2Tyk'), `${rc.file} missing GSC verification meta`);
  assert.ok(html.includes('figarist.goatcounter.com/count'), `${rc.file} missing GoatCounter`);
  assert.ok(html.includes('"@type": "WebApplication"'), `${rc.file} missing WebApplication JSON-LD`);
  assert.ok(html.includes('"@type": "FAQPage"'), `${rc.file} missing FAQPage JSON-LD`);
  const qCount = (html.match(/"@type": "Question"/g) || []).length;
  assert.equal(qCount, 10, `${rc.file} expected 10 FAQ Questions in JSON-LD, got ${qCount}`);
  assert.ok(html.includes('hreflang="uk"'), `${rc.file} missing uk hreflang`);
}

console.log('Build verification passed: all 4 locales, 10-question FAQPage JSON-LD, SEO tags, and PWA assets present.');
