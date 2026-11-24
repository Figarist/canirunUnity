const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const distDir = path.resolve(__dirname, '..', 'dist');
const baseHtmlPath = path.join(distDir, 'index.html');

function escapeAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function injectFaqJsonLd(html, faqItems) {
  const entities = faqItems.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a
    }
  }));
  return html.replace(/"@type": "FAQPage",\s*"@id": "([^"]+)",\s*"mainEntity": \[\s*\]/, `"@type": "FAQPage",\n        "@id": "$1",\n        "mainEntity": ${JSON.stringify(entities, null, 8).replace(/\n/g, '\n        ')}`);
}

async function run() {
  const translationsUrl = pathToFileURL(path.resolve(__dirname, '..', 'src', 'i18n', 'translations.js')).href;
  const { TRANSLATIONS } = await import(translationsUrl);
  const { renderRequirementsHtml } = await import(
    pathToFileURL(path.resolve(__dirname, '..', 'src', 'content', 'static-requirements.js')).href
  );

  const rawBaseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

  const REQ_MARKER = '<!--STATIC_REQUIREMENTS-->';
  const injectRequirements = (html, lang) => {
    if (!html.includes(REQ_MARKER)) throw new Error('Missing STATIC_REQUIREMENTS marker in dist/index.html');
    return html.replace(REQ_MARKER, () => renderRequirementsHtml(lang, TRANSLATIONS[lang]));
  };

  // Inject EN FAQPage + static requirements section into root dist/index.html
  const enHtml = injectRequirements(injectFaqJsonLd(rawBaseHtml, TRANSLATIONS.en.faqItems), 'en');
  fs.writeFileSync(baseHtmlPath, enHtml, 'utf8');

  const LOCALES = {
    uk: { ogLocale: 'uk_UA', canonical: 'https://sivochka.com/canirunUnity/uk/', imageAlt: 'Can I Run Unity? — перевірка, чи потягне ваш ПК Unity 6, URP, HDRP, VR і локальний ШІ прямо в браузері' },
    ru: { ogLocale: 'ru_RU', canonical: 'https://sivochka.com/canirunUnity/ru/', imageAlt: 'Can I Run Unity? — проверка, потянет ли ваш ПК Unity 6, URP, HDRP, VR и локальный ИИ прямо в браузере' },
    ko: { ogLocale: 'ko_KR', canonical: 'https://sivochka.com/canirunUnity/ko/', imageAlt: 'Can I Run Unity? — 브라우저에서 내 PC가 Unity 6, URP, HDRP, VR, 로컬 AI를 실행할 수 있는지 확인' }
  };

  for (const [lang, meta] of Object.entries(LOCALES)) {
    const dict = TRANSLATIONS[lang];
    let html = injectRequirements(injectFaqJsonLd(rawBaseHtml, dict.faqItems), lang);
    html = html.replace(/<html lang="en"/, `<html lang="${lang}"`);
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(dict.metaTitle)}</title>`);
    html = html.replace(
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${escapeAttr(dict.metaDesc)}" />`
    );
    html = html.replace(
      /<meta name="keywords" content="[^"]*"\s*\/?>/,
      `<meta name="keywords" content="${escapeAttr(dict.metaKeywords)}" />`
    );
    html = html.replace(
      /<link rel="canonical" href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${meta.canonical}" />`
    );
    html = html.replace(
      /<meta property="og:locale" content="[^"]*"\s*\/?>/,
      `<meta property="og:locale" content="${meta.ogLocale}" />`
    );
    html = html.replace(
      /<meta property="og:url" content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="${meta.canonical}" />`
    );
    html = html.replace(
      /<meta property="og:title" content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${escapeAttr(dict.metaTitle)}" />`
    );
    html = html.replace(
      /<meta property="og:description" content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${escapeAttr(dict.metaDesc)}" />`
    );
    html = html.replace(
      /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:title" content="${escapeAttr(dict.metaTitle)}" />`
    );
    html = html.replace(
      /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:description" content="${escapeAttr(dict.metaDesc)}" />`
    );

    html = html.replace(
      /<meta property="og:image:alt" content="[^"]*"\s*\/?>/,
      `<meta property="og:image:alt" content="${escapeAttr(meta.imageAlt)}" />`
    );
    html = html.replace(
      /<meta name="twitter:image:alt" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:image:alt" content="${escapeAttr(meta.imageAlt)}" />`
    );

    // Fix relative favicon/manifest paths for nested /uk/, /ru/, /ko/ routes
    html = html.replace(/href="\.\/favicon\.svg"/g, 'href="../favicon.svg"');
    html = html.replace(/href="\.\/manifest\.json"/g, 'href="../manifest.json"');

    const outDir = path.join(distDir, lang);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
  }

  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    'https://sivochka.com/canirunUnity/',
    'https://sivochka.com/canirunUnity/uk/',
    'https://sivochka.com/canirunUnity/ru/',
    'https://sivochka.com/canirunUnity/ko/'
  ];

  const hreflangs = `    <xhtml:link rel="alternate" hreflang="en" href="https://sivochka.com/canirunUnity/" />
    <xhtml:link rel="alternate" hreflang="uk" href="https://sivochka.com/canirunUnity/uk/" />
    <xhtml:link rel="alternate" hreflang="ru" href="https://sivochka.com/canirunUnity/ru/" />
    <xhtml:link rel="alternate" hreflang="ko" href="https://sivochka.com/canirunUnity/ko/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://sivochka.com/canirunUnity/" />`;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (u) => `  <url>
    <loc>${u}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
${hreflangs}
  </url>`
  )
  .join('\n')}
</urlset>
`;

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8');
  console.log('Generated 4 localized HTML routes (en, uk, ru, ko) with 12-item FAQPage JSON-LD, static requirements section and sitemap.xml');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
