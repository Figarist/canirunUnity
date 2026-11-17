import { CPUS, DISKS, GPUS, IDES, OS_LIST, PRESETS } from './data/hardware-db.js';
import { detectHardware, runStressBenchmark } from './engine/detector.js';
import { evaluateSpec } from './engine/evaluator.js';
import { TRANSLATIONS } from './i18n/translations.js';
import { renderRequirementsHtml } from './content/static-requirements.js';

const SUPPORTED_LANGS = ['en', 'uk', 'ru', 'ko'];
const RING_CIRCUMFERENCE = 207.35;

const SUN_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
const MOON_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';

const WF_ICONS = {
  smartphone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2" width="10" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
  box: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',
  users: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  sparkles: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>',
  glasses: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-4l-2-3h-4l-2 3H4a2 2 0 0 1-2-2v-5Z"/></svg>',
  cpu: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2"/></svg>',
  graduation: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>'
};

function detectInitialLang() {
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  for (const part of pathParts) {
    if (SUPPORTED_LANGS.includes(part)) return part;
  }
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  if (urlLang && SUPPORTED_LANGS.includes(urlLang)) return urlLang;
  const stored = localStorage.getItem('preferred_lang');
  if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
  const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return SUPPORTED_LANGS.includes(nav) ? nav : 'en';
}

const state = {
  lang: detectInitialLang(),
  theme: localStorage.getItem('canirun_theme') || 'light',
  activePreset: null,
  spec: {
    os: 'windows',
    cpuId: 'cpu-6c',
    gpuId: 'rtx-3060-12',
    vramGb: 12,
    ramGb: 16,
    diskId: 'nvme',
    ideId: 'rider'
  },
  rawRenderer: '—',
  ramInferred: false,
  webgl2: false,
  webgpu: false,
  maxTextureSize: 0,
  microOpsPerMs: 0,
  category: 'all',
  search: '',
  statusFilter: 'all',
  lastEval: null
};

const $ = (id) => document.getElementById(id);

function t() {
  return TRANSLATIONS[state.lang] || TRANSLATIONS.en;
}

function fmt(str, vars = {}) {
  return String(str).replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? vars[k] : `{${k}}`));
}

function setHeaderProgress(pct) {
  const bar = $('header-progress-fill');
  if (!bar) return;
  if (pct <= 0 || pct >= 100) {
    bar.style.width = `${pct}%`;
    setTimeout(() => { bar.style.opacity = '0'; bar.style.width = '0%'; }, 320);
  } else {
    bar.style.opacity = '1';
    bar.style.width = `${pct}%`;
  }
}

function showToast(msg) {
  const el = $('toast');
  el.textContent = msg;
  el.classList.add('is-visible');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => el.classList.remove('is-visible'), 2200);
}

function populateSelects() {
  $('sel-os').innerHTML = OS_LIST.map((o) => `<option value="${o.id}">${o.name}</option>`).join('');
  $('sel-cpu').innerHTML = CPUS.map((c) => `<option value="${c.id}">${c.label}</option>`).join('');
  $('sel-gpu').innerHTML = GPUS.map((g) => `<option value="${g.id}">${g.name} (${g.vram} GB)</option>`).join('');
  $('sel-disk').innerHTML = DISKS.map((d) => `<option value="${d.id}">${d.label}</option>`).join('');
  $('sel-ide').innerHTML = IDES.map((i) => `<option value="${i.id}">${i.name}</option>`).join('');
}

function syncControlsFromState() {
  $('sel-os').value = state.spec.os;
  $('sel-cpu').value = state.spec.cpuId;
  $('sel-gpu').value = state.spec.gpuId;
  $('sel-vram').value = String(state.spec.vramGb);
  $('sel-ram').value = String(state.spec.ramGb);
  $('sel-disk').value = state.spec.diskId;
  $('sel-ide').value = state.spec.ideId;

  document.querySelectorAll('[data-ram]').forEach((btn) => {
    btn.classList.toggle('is-active', Number(btn.dataset.ram) === state.spec.ramGb);
  });
  document.querySelectorAll('[data-vram]').forEach((btn) => {
    btn.classList.toggle('is-active', Number(btn.dataset.vram) === state.spec.vramGb);
  });
  document.querySelectorAll('[data-preset]').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.preset === state.activePreset);
  });
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  $('btn-theme').innerHTML = state.theme === 'dark' ? SUN_SVG : MOON_SVG;
  localStorage.setItem('canirun_theme', state.theme);
}

function applyTranslations() {
  const dict = t();
  document.documentElement.lang = state.lang;
  document.title = dict.metaTitle;
  localStorage.setItem('preferred_lang', state.lang);

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.setAttribute('placeholder', dict[key]);
  });
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.lang === state.lang);
  });

  // SEO Bento Cards & Reference Table
  $('seo-bento-grid').innerHTML = dict.seoCards
    .map((c) => `<article class="seo-card"><h3>${c.title}</h3><p>${c.body}</p></article>`)
    .join('');

  $('seo-table-title').textContent = dict.seoTableTitle;
  $('seo-table-head').innerHTML = `<tr>${dict.seoTableCols.map((c) => `<th scope="col">${c}</th>`).join('')}</tr>`;
  $('seo-table-body').innerHTML = dict.seoTableRows
    .map((row) => `<tr>${row.map((cell, i) => (i === 0 ? `<td><strong>${cell}</strong></td>` : `<td>${cell}</td>`)).join('')}</tr>`)
    .join('');

  // 12-Item FAQ
  $('faq-list').innerHTML = dict.faqItems
    .map(
      (item, idx) => `
      <details class="faq-item"${idx === 0 ? ' open' : ''}>
        <summary>${item.q}</summary>
        <p>${item.a}</p>
      </details>`
    )
    .join('');

  // Static requirements / how-it-works / learners block (same markup that is pre-rendered at build time)
  const reqRoot = $('requirements');
  if (reqRoot) reqRoot.innerHTML = renderRequirementsHtml(state.lang, dict);
}

function statusMeta(status) {
  const dict = t();
  if (status === 'can-run') return { label: dict.statusCanRun, cls: 'status--can-run' };
  if (status === 'can-run-slow') return { label: dict.statusSlow, cls: 'status--can-run-slow' };
  if (status === 'tight') return { label: dict.statusTight, cls: 'status--tight' };
  return { label: dict.statusCannot, cls: 'status--cannot-run' };
}

function formatBottlenecks(list) {
  const dict = t();
  if (!list || list.length === 0) return '—';
  return list
    .map((b) => {
      if (typeof b === 'string') return dict.bottlenecks[b] || b;
      return fmt(dict.bottlenecks[b.code] || b.code, b);
    })
    .join(' · ');
}

function renderEvaluation() {
  const dict = t();
  const res = evaluateSpec(state.spec);
  state.lastEval = res;

  $('score-num').textContent = res.systemScore;
  const ring = $('score-ring-circle');
  if (ring) {
    ring.style.strokeDashoffset = String(RING_CIRCUMFERENCE * (1 - res.systemScore / 100));
    ring.style.stroke = res.systemScore >= 75 ? '#b5e853' : res.systemScore >= 50 ? '#4ecdc4' : '#e8603c';
  }

  const gradeEl = $('score-grade');
  gradeEl.textContent = res.grade;
  gradeEl.className = `grade-badge grade--${res.grade}`;

  $('val-cpu').textContent = `Tier ${res.cpu.tier}/10`;
  $('val-gpu').textContent = `Tier ${res.gpu.tier}/10`;
  $('val-vram').textContent = `${res.spec.vramGb} GB`;
  $('val-ram').textContent = `${res.spec.ramGb} GB`;

  $('best-wf-name').textContent = dict.wfNames[res.bestWorkflow.id] || res.bestWorkflow.id;
  $('best-wf-ver').textContent = `${res.bestWorkflow.recommendedVersion} · ${res.bestWorkflow.pipeline}`;

  // Dual RAM & VRAM budget bars
  const mb = res.memoryBudget;
  const pct = (v) => `${Math.min(100, Math.round((v / mb.total) * 100))}%`;
  $('ram-seg-os').style.width = pct(mb.osGb);
  $('ram-seg-unity').style.width = pct(mb.unityGb);
  $('ram-seg-ide').style.width = pct(mb.ideGb);
  $('ram-used-label').textContent = fmt(dict.ramUsedLabel, { os: mb.osGb, unity: mb.unityGb, ide: mb.ideGb });
  $('ram-free-label').textContent = fmt(dict.ramFreeLabel, { free: mb.headroomGb });

  const vramTotal = Math.max(1, res.spec.vramGb);
  const vramUsed = Math.min(vramTotal, 2.5);
  const vramFree = +Math.max(0, vramTotal - 2.5).toFixed(1);
  $('vram-seg-unity').style.width = `${Math.round((vramUsed / vramTotal) * 100)}%`;
  $('vram-free-label').textContent = fmt(dict.vramFreeLabel, { free: vramFree });

  const capBanner = $('ram-cap-banner');
  if (state.ramInferred) {
    capBanner.hidden = false;
    $('ram-cap-text').textContent = fmt(dict.ramCapNote, { ram: state.spec.ramGb });
  } else {
    capBanner.hidden = true;
  }

  $('raw-gpu-text').textContent = state.rawRenderer;
  $('api-caps-text').textContent = `WebGL2: ${state.webgl2 ? 'OK' : 'NO'} · WebGPU: ${state.webgpu ? 'OK' : 'NO'} · MaxTex: ${state.maxTextureSize || '—'} · Bench: ${state.microOpsPerMs || '—'} op/ms`;

  // Workflows
  $('workflow-grid').innerHTML = res.workflows
    .map((wf) => {
      const st = statusMeta(wf.status);
      const notes = formatBottlenecks(wf.bottlenecks);
      const isBest = wf.id === res.bestWorkflow.id;
      return `
      <article class="wf-card${isBest ? ' wf-card--best' : ''}">
        <div class="wf-card__top">
          <div class="wf-title-group">
            <span class="wf-icon" aria-hidden="true">${WF_ICONS[wf.icon] || WF_ICONS.box}</span>
            <div>
              <h3>${dict.wfNames[wf.id] || wf.id}</h3>
              <span class="wf-card__ver">${wf.recommendedVersion}</span>
            </div>
          </div>
          <span class="grade-pill grade--${wf.grade}">${wf.grade}</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
          <span class="status-badge ${st.cls}">${st.label}</span>
          ${isBest ? `<span class="wf-best-pill">${dict.bestMatchTag}</span>` : ''}
        </div>
        <div class="wf-bar" aria-hidden="true"><div class="wf-bar__fill" style="width:${wf.score}%"></div></div>
        <div class="wf-card__metrics">
          <span>Scene: ${wf.estFps}</span>
          <span>Reload: ${wf.compileTime}</span>
          <span>Score: ${wf.score}/100</span>
        </div>
        ${notes !== '—' ? `<p class="wf-card__notes">${notes}</p>` : ''}
      </article>`;
    })
    .join('');

  // Matrix
  const q = state.search.trim().toLowerCase();
  const filtered = res.matrix.filter((item) => {
    if (state.category !== 'all' && item.category !== state.category) return false;
    if (state.statusFilter !== 'all' && item.status !== state.statusFilter) return false;
    if (q && !item.name.toLowerCase().includes(q) && !item.badge.toLowerCase().includes(q)) return false;
    return true;
  });

  $('matrix-tbody').innerHTML = filtered
    .map((item) => {
      const st = statusMeta(item.status);
      return `
      <tr>
        <td><strong>${item.name}</strong><span class="target-badge">${item.badge}</span></td>
        <td><span class="grade-pill grade--${item.grade}">${item.grade}</span></td>
        <td><span class="status-badge ${st.cls}">${st.label}</span></td>
        <td style="font-family:var(--font-mono);font-size:0.78rem;">${item.estFps} · ${item.compileTime}</td>
        <td style="font-size:0.82rem;color:var(--text-secondary);">${formatBottlenecks(item.bottlenecks)}</td>
      </tr>`;
    })
    .join('');

  // Upgrades
  $('upgrade-list').innerHTML = res.upgrades.length
    ? res.upgrades
        .map(
          (u) => `
        <li class="upgrade-item">
          <div>
            <strong>${u.targetValue}</strong>
            <div style="font-size:0.79rem;color:var(--text-muted);">${fmt(dict.upgradeFromTo, {
              from: res.systemScore,
              to: u.newScore,
              grade: u.newGrade
            })}</div>
          </div>
          <span class="upgrade-delta">+${u.delta} pts</span>
        </li>`
        )
        .join('')
    : `<li class="upgrade-item"><strong>${dict.doctorTipsMap.doc_pro_optimal}</strong></li>`;

  // Doctor Mode
  $('doctor-list').innerHTML = res.doctorTips
    .map((key) => `<li class="doctor-item">${dict.doctorTipsMap[key] || key}</li>`)
    .join('');
}

function readSpecFromUrl() {
  const params = new URLSearchParams(window.location.search);
  if (!params.has('gpu') && !params.has('ram')) return false;
  if (params.get('os')) state.spec.os = params.get('os');
  if (params.get('cpu')) state.spec.cpuId = params.get('cpu');
  if (params.get('gpu')) state.spec.gpuId = params.get('gpu');
  if (params.get('vram')) state.spec.vramGb = Number(params.get('vram')) || 8;
  if (params.get('ram')) state.spec.ramGb = Number(params.get('ram')) || 16;
  if (params.get('disk')) state.spec.diskId = params.get('disk');
  if (params.get('ide')) state.spec.ideId = params.get('ide');
  return true;
}

async function runAutoDetect() {
  setHeaderProgress(45);
  const detected = await detectHardware();
  state.activePreset = null;
  state.spec = {
    os: detected.os,
    cpuId: detected.cpuId,
    gpuId: detected.gpuId,
    vramGb: detected.vramGb,
    ramGb: detected.ramGb,
    diskId: detected.diskId,
    ideId: detected.ideId
  };
  state.rawRenderer = detected.rawRenderer;
  state.ramInferred = detected.ramInferred;
  state.webgl2 = detected.webgl2;
  state.webgpu = detected.webgpu;
  state.maxTextureSize = detected.maxTextureSize;
  state.microOpsPerMs = detected.microOpsPerMs;
  syncControlsFromState();
  renderEvaluation();
  setHeaderProgress(100);
}

function bindEvents() {
  ['sel-os', 'sel-cpu', 'sel-gpu', 'sel-vram', 'sel-ram', 'sel-disk', 'sel-ide'].forEach((id) => {
    $(id).addEventListener('change', () => {
      state.activePreset = null;
      state.spec.os = $('sel-os').value;
      state.spec.cpuId = $('sel-cpu').value;
      const newGpuId = $('sel-gpu').value;
      if (id === 'sel-gpu' && newGpuId !== state.spec.gpuId) {
        const gObj = GPUS.find((g) => g.id === newGpuId);
        if (gObj) $('sel-vram').value = String(gObj.vram);
      }
      state.spec.gpuId = newGpuId;
      state.spec.vramGb = Number($('sel-vram').value);
      state.spec.ramGb = Number($('sel-ram').value);
      if (id === 'sel-ram') state.ramInferred = false;
      state.spec.diskId = $('sel-disk').value;
      state.spec.ideId = $('sel-ide').value;
      syncControlsFromState();
      renderEvaluation();
    });
  });

  document.querySelectorAll('[data-preset]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const p = PRESETS.find((x) => x.id === btn.dataset.preset);
      if (!p) return;
      state.activePreset = p.id;
      state.spec = {
        os: p.os,
        cpuId: p.cpuId,
        gpuId: p.gpuId,
        vramGb: p.vramGb,
        ramGb: p.ramGb,
        diskId: p.diskId,
        ideId: p.ideId
      };
      state.ramInferred = false;
      syncControlsFromState();
      renderEvaluation();
    });
  });

  document.querySelectorAll('[data-ram]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.activePreset = null;
      state.spec.ramGb = Number(btn.dataset.ram);
      state.ramInferred = false;
      syncControlsFromState();
      renderEvaluation();
    });
  });

  document.querySelectorAll('[data-vram]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.activePreset = null;
      state.spec.vramGb = Number(btn.dataset.vram);
      syncControlsFromState();
      renderEvaluation();
    });
  });

  $('btn-detect').addEventListener('click', runAutoDetect);

  $('btn-bench').addEventListener('click', async () => {
    const btn = $('btn-bench');
    btn.disabled = true;
    $('bench-status').textContent = t().benchRunning;
    setHeaderProgress(10);
    const res = await runStressBenchmark((phase, pct) => {
      setHeaderProgress(pct);
      $('bench-status').textContent = `${t().benchRunning} (${phase.toUpperCase()} ${pct}%)`;
    });
    $('bench-status').textContent = fmt(t().benchResult, { fps: res.gpuFps, cpu: res.cpuScore });
    setHeaderProgress(100);
    btn.disabled = false;
  });

  $('btn-theme').addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme();
  });

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.lang = btn.dataset.lang;
      applyTranslations();
      renderEvaluation();
    });
  });

  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.category = btn.dataset.cat;
      document.querySelectorAll('.tab-btn').forEach((b) => b.classList.toggle('is-active', b === btn));
      renderEvaluation();
    });
  });

  $('matrix-search').addEventListener('input', (e) => {
    state.search = e.target.value;
    renderEvaluation();
  });

  $('matrix-status-filter').addEventListener('change', (e) => {
    state.statusFilter = e.target.value;
    renderEvaluation();
  });

  $('btn-copy-link').addEventListener('click', async () => {
    const s = state.spec;
    const url = new URL(window.location.href);
    url.searchParams.set('os', s.os);
    url.searchParams.set('cpu', s.cpuId);
    url.searchParams.set('gpu', s.gpuId);
    url.searchParams.set('vram', s.vramGb);
    url.searchParams.set('ram', s.ramGb);
    url.searchParams.set('disk', s.diskId);
    url.searchParams.set('ide', s.ideId);
    await navigator.clipboard.writeText(url.toString());
    showToast(t().copiedToast);
  });

  $('btn-copy-report').addEventListener('click', async () => {
    const r = state.lastEval;
    if (!r) return;
    const dict = t();
    const text = fmt(dict.reportTemplate, {
      score: r.systemScore,
      grade: r.grade,
      os: r.osObj.name,
      cpu: r.cpu.label,
      gpu: r.gpu.name,
      vram: r.spec.vramGb,
      ram: r.spec.ramGb,
      disk: r.disk.label,
      ide: r.ide.name,
      bestWf: dict.wfNames[r.bestWorkflow.id] || r.bestWorkflow.id,
      bestVer: r.bestWorkflow.recommendedVersion
    });
    await navigator.clipboard.writeText(text);
    showToast(t().copiedToast);
  });
}

async function init() {
  populateSelects();
  applyTheme();
  applyTranslations();
  bindEvents();

  if (readSpecFromUrl()) {
    syncControlsFromState();
    renderEvaluation();
  } else {
    await runAutoDetect();
  }

  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    navigator.serviceWorker.register('/canirunUnity/sw.js').catch(() => {});
  }
}

init();
