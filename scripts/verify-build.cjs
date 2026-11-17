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
  assert.equal(qCount, 12, `${rc.file} expected 12 FAQ Questions in JSON-LD, got ${qCount}`);
  assert.ok(html.includes('hreflang="uk"'), `${rc.file} missing uk hreflang`);

  // Static (no-JS) requirements section, tutoring link and consistent meta tags
  assert.ok(html.includes(`data-static-requirements="${rc.lang}"`), `${rc.file} missing static requirements section`);
  assert.ok(!html.includes('<!--STATIC_REQUIREMENTS-->'), `${rc.file} still has the requirements marker`);
  assert.ok((html.match(/<h2 id="(req|how|learn)-heading">/g) || []).length === 3, `${rc.file} expected 3 static H2 headings`);
  const tutoring = `https://sivochka.com${rc.lang === 'en' ? '' : `/${rc.lang}`}/unity/`;
  assert.ok(html.includes(`href="${tutoring}" data-goatcounter-click="canirun-hub"`), `${rc.file} missing tutoring link ${tutoring}`);
  const metaContent = (re) => (html.match(re) || [])[1];
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
  assert.ok(title && [...title.replace(/&amp;/g, '&')].length <= 60, `${rc.file} <title> missing or > 60 chars`);
  const desc = metaContent(/<meta name="description" content="([^"]*)"/);
  const descLen = [...(desc || '').replace(/&amp;/g, '&')].length;
  assert.ok(descLen >= 120 && descLen <= 155, `${rc.file} description length ${descLen} outside 120-155`);
  assert.equal(metaContent(/<meta property="og:description" content="([^"]*)"/), desc, `${rc.file} og:description != description`);
  assert.equal(metaContent(/<meta name="twitter:description" content="([^"]*)"/), desc, `${rc.file} twitter:description != og:description`);
  assert.equal(metaContent(/<meta property="og:title" content="([^"]*)"/), title, `${rc.file} og:title != title`);
  assert.equal(metaContent(/<meta name="twitter:title" content="([^"]*)"/), title, `${rc.file} twitter:title != title`);
}

// hreflang set must be identical (and reciprocal) on every page and match sitemap.xml
const sitemap = fs.readFileSync(path.join(distDir, 'sitemap.xml'), 'utf8');
const expectedHreflang = {
  en: 'https://sivochka.com/canirunUnity/',
  uk: 'https://sivochka.com/canirunUnity/uk/',
  ru: 'https://sivochka.com/canirunUnity/ru/',
  ko: 'https://sivochka.com/canirunUnity/ko/',
  'x-default': 'https://sivochka.com/canirunUnity/'
};
for (const rc of routeChecks) {
  const html = fs.readFileSync(path.join(distDir, rc.file), 'utf8');
  for (const [hl, href] of Object.entries(expectedHreflang)) {
    assert.ok(html.includes(`<link rel="alternate" hreflang="${hl}" href="${href}" />`), `${rc.file} missing hreflang ${hl} -> ${href}`);
    assert.ok(sitemap.includes(`<xhtml:link rel="alternate" hreflang="${hl}" href="${href}" />`), `sitemap.xml missing hreflang ${hl} -> ${href}`);
  }
  assert.ok(sitemap.includes(`<loc>${rc.canonical}</loc>`), `sitemap.xml missing <loc> ${rc.canonical}`);
}

console.log('Build verification passed: all 4 locales, 12-question FAQPage JSON-LD, static requirements section, SEO tags, and PWA assets present.');
