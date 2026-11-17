import { CPUS } from '../data/hardware-db.js';
import { WORKFLOWS } from '../data/unity-targets.js';

// Crawlable "Unity system requirements" block rendered below the tool UI.
//
// The requirements table is generated from WORKFLOWS in src/data/unity-targets.js
// (minRam/recRam, minVram/recVram, minCpu/recCpu, minGpu/recGpu, needsNvme) and the
// CPU tier -> core mapping in src/data/hardware-db.js (CPUS), so it cannot drift from
// the numbers the checker itself uses. All copy lives in TRANSLATIONS[lang].reqSection.
//
// Used in two places:
//   1. scripts/build-locales.cjs injects the HTML into every built page (visible without JS).
//   2. src/main.js re-renders it when the language is switched in the browser.

const TUTORING_BASE = 'https://sivochka.com';

export function tutoringUrl(lang) {
  return `${TUTORING_BASE}${lang === 'en' ? '' : `/${lang}`}/unity/`;
}

function esc(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function fill(str, vars) {
  return String(str).replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? vars[k] : `{${k}}`));
}

export function renderRequirementsHtml(lang, dict) {
  const r = dict.reqSection;
  const rows = WORKFLOWS.map((wf) => {
    const name = dict.wfNames[wf.id] || wf.id;
    return `<tr><td><strong>${esc(name)}</strong></td><td>${wf.minRam} / ${wf.recRam} GB</td><td>${wf.minVram} / ${wf.recVram} GB</td><td>${wf.minCpu} / ${wf.recCpu}</td><td>${wf.minGpu} / ${wf.recGpu}</td><td>${esc(wf.needsNvme ? r.ssdYes : r.ssdNo)}</td></tr>`;
  }).join('');

  const cpuTiers = CPUS.map((c) => `${c.tier}: ${c.cores}`).join(', ');
  const edu = WORKFLOWS.find((w) => w.id === 'wf-edu');
  const learnVars = { ram: edu.minRam, vram: edu.minVram, gpu: edu.minGpu };

  const notes = r.notes.map((n) => `<li>${esc(fill(n, { cpuTiers }))}</li>`).join('');
  const how = r.howBody.map((p) => `<p>${esc(p)}</p>`).join('');
  const learn = r.learnBody.map((p) => `<p>${esc(fill(p, learnVars))}</p>`).join('');

  return `<div class="seo-guide" data-static-requirements="${lang}">
      <div class="bento-card">
        <div class="section-head">
          <h2 id="req-heading">${esc(r.title)}</h2>
          <p>${esc(r.intro)}</p>
        </div>
        <p class="req-caption">${esc(r.caption)}</p>
        <div class="table-wrap">
          <table>
            <thead><tr>${r.cols.map((c) => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <ul class="req-notes">${notes}</ul>
      </div>
      <div class="bento-card">
        <div class="section-head"><h2 id="how-heading">${esc(r.howTitle)}</h2></div>
        <div class="req-text">${how}</div>
      </div>
      <div class="bento-card">
        <div class="section-head"><h2 id="learn-heading">${esc(r.learnTitle)}</h2></div>
        <div class="req-text">${learn}</div>
        <div class="seo-eco-links"><a href="${tutoringUrl(lang)}" data-goatcounter-click="canirun-hub">${esc(r.learnLink)}</a></div>
      </div>
    </div>`;
}
