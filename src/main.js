import { CPUS, DISKS, GPUS, IDES, OS_LIST, PRESETS } from './data/hardware-db.js';
import { detectHardware, runStressBenchmark } from './engine/detector.js';
import { evaluateSpec, evaluateSpecCore } from './engine/evaluator.js';
import { TRANSLATIONS } from './i18n/translations.js';
import { renderRequirementsHtml } from './content/static-requirements.js';

const SUPPORTED_LANGS = ['en', 'uk', 'ru', 'ko'];

const SUN_SVG = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
const MOON_SVG = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';

const WF_ICONS = {
  smartphone: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2" width="10" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
  box: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',
  users: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  sparkles: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>',
  glasses: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-4l-2-3h-4l-2 3H4a2 2 0 0 1-2-2v-5Z"/></svg>',
  cpu: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2"/></svg>',
  graduation: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>'
};

const PRESET_SHORT = {
  school: { badge: 'S', labelKey: 'presetSchool' },
  'mac-m2': { badge: 'M2', labelKey: 'presetMac' },
  indie: { badge: '3060', labelKey: 'presetIndie' },
  pro: { badge: '4070', labelKey: 'presetPro' }
};

const PRESET_POSITIONS = PRESETS.map((p) => ({
  id: p.id,
  score: evaluateSpecCore(p).systemScore
}));

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
  theme: localStorage.getItem('canirun_theme') || 'dark',
  activePreset: null,
  displayedScore: 0,
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

function animateScore(target) {
  const el = $('score-num');
  if (!el) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const start = state.displayedScore;
  if (reduced || start === target) {
    state.displayedScore = target;
    el.textContent = String(target);
    return;
  }
  cancelAnimationFrame(animateScore._raf);
  const t0 = performance.now();
  const dur = 420;
  const step = (now) => {
    const p = Math.min(1, (now - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = Math.round(start + (target - start) * eased);
    el.textContent = String(val);
    if (p < 1) {
      animateScore._raf = requestAnimationFrame(step);
    } else {
      state.displayedScore = target;
    }
  };
  animateScore._raf = requestAnimationFrame(step);
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
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  const schemeMeta = document.querySelector('meta[name="color-scheme"]');
  if (schemeMeta) schemeMeta.content = state.theme;
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) themeMeta.content = state.theme === 'light' ? '#f2f0eb' : '#0b0d14';
  $('btn-theme').innerHTML = state.theme === 'dark' ? SUN_SVG : MOON_SVG;
  localStorage.setItem('canirun_theme', state.theme);
}

function closeLangMenu() {
  const menu = $('lang-menu');
  const btn = $('btn-lang-menu');
  if (!menu || !btn) return;
  menu.hidden = true;
  btn.setAttribute('aria-expanded', 'false');
}

function applyTranslations() {
  const dict = t();
  document.documentElement.lang = state.lang;
  document.title = dict.metaTitle;
  localStorage.setItem('preferred_lang', state.lang);

  const langCurrent = $('lang-current');
  if (langCurrent) langCurrent.textContent = state.lang.toUpperCase();

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

function formatTokens(list, map) {
  if (!list || list.length === 0) return [];
  return list.map((item) => {
    if (typeof item === 'string') return map[item] || item;
    return fmt(map[item.code] || item.code, item);
  });
}

function renderMilestoneTrack(res, dict) {
  const fill = $('milestone-fill');
  if (fill) fill.style.width = `${res.systemScore}%`;

  const ticksEl = $('milestone-ticks');
  if (ticksEl && dict.milestoneTicks) {
    const pcts = [0, 20, 40, 60, 80, 100];
    ticksEl.innerHTML = dict.milestoneTicks
      .map((lbl, idx) => {
        const reached = res.systemScore >= pcts[idx];
        return `<div class="milestone-tick${reached ? ' is-reached' : ''}">
          <span class="milestone-tick__pct">${pcts[idx]}%</span>
          <span class="milestone-tick__lbl">${lbl}</span>
        </div>`;
      })
      .join('');
  }

  const pinsEl = $('milestone-pins');
  if (!pinsEl) return;

  const sortedPins = [...PRESET_POSITIONS].sort((a, b) => a.score - b.score);
  const presetHtml = sortedPins
    .map((p, i) => {
      const meta = PRESET_SHORT[p.id];
      const clamped = Math.max(6, Math.min(93, p.score));
      const prev = i > 0 ? sortedPins[i - 1].score : -99;
      const stagger = Math.abs(p.score - prev) < 10;
      const isActive = state.activePreset === p.id;
      const label = dict[meta.labelKey] || p.id;
      return `<button type="button" class="rig-pin${isActive ? ' is-active' : ''}${stagger ? ' rig-pin--stagger' : ''}" data-preset="${p.id}" style="left:${clamped}%" title="${label} (${p.score}%)">
        <span class="rig-pin__tag">${label}</span>
        <span class="rig-pin__dot">${meta.badge}</span>
        <span class="rig-pin__stem" aria-hidden="true"></span>
      </button>`;
    })
    .join('');

  const youLeft = Math.max(5, Math.min(95, res.systemScore));
  const youHtml = `<div class="rig-pin rig-pin--you" style="left:${youLeft}%">
    <span class="rig-pin__tag">★ ${dict.pinYou} · ${res.systemScore}%</span>
    <span class="rig-pin__stem" aria-hidden="true"></span>
  </div>`;

  pinsEl.innerHTML = presetHtml + youHtml;
}

function renderHardwareWave(res, dict) {
  const svg = $('hw-wave-svg');
  const legend = $('hw-wave-legend');
  if (!svg || !res.pillarScores) return;

  const p = res.pillarScores;
  const pillars = [
    { lbl: dict.pillarCpu, val: p.cpu },
    { lbl: dict.pillarGpu, val: p.gpu },
    { lbl: dict.pillarVram, val: p.vram },
    { lbl: dict.pillarRam, val: p.ram },
    { lbl: dict.pillarDisk, val: p.disk }
  ];

  if (legend) {
    legend.innerHTML = pillars.map((item) => `<span>${item.lbl} <strong>${item.val}%</strong></span>`).join('');
  }

  const xs = [28, 164, 300, 436, 572];
  const pts = pillars.map((item, i) => ({
    x: xs[i],
    y: +(82 - (item.val / 100) * 64).toFixed(1)
  }));

  let linePath = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const cx = (pts[i].x + pts[i + 1].x) / 2;
    linePath += ` C ${cx} ${pts[i].y}, ${cx} ${pts[i + 1].y}, ${pts[i + 1].x} ${pts[i + 1].y}`;
  }
  const areaPath = `${linePath} L ${pts[pts.length - 1].x} 94 L ${pts[0].x} 94 Z`;

  const dots = pts
    .map(
      (pt) =>
        `<circle cx="${pt.x}" cy="${pt.y}" r="3.6" fill="#ff4d7d" stroke="#ffffff" stroke-width="1.5" />`
    )
    .join('');

  svg.innerHTML = `
    <defs>
      <linearGradient id="hwWaveStroke" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#7c6bff" />
        <stop offset="50%" stop-color="#ff4d7d" />
        <stop offset="100%" stop-color="#ff8a4c" />
      </linearGradient>
      <linearGradient id="hwWaveArea" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#d946ef" stop-opacity="0.30" />
        <stop offset="100%" stop-color="#7c6bff" stop-opacity="0.0" />
      </linearGradient>
    </defs>
    <line x1="16" y1="50" x2="584" y2="50" stroke="currentColor" stroke-opacity="0.08" stroke-dasharray="4 4" />
    <path d="${areaPath}" fill="url(#hwWaveArea)" />
    <path d="${linePath}" fill="none" stroke="url(#hwWaveStroke)" stroke-width="2.8" stroke-linecap="round" />
    ${dots}
  `;
}

function renderFindingsTicker(res, dict) {
  const el = $('findings-list');
  if (!el) return;

  const benchStr = state.microOpsPerMs || '—';
  const f1 = state.webgpu
    ? { dot: 'green', text: fmt(dict.findingWebgpuOk, { bench: benchStr }) }
    : state.webgl2
      ? { dot: 'amber', text: fmt(dict.findingWebgpuNo, { bench: benchStr }) }
      : { dot: 'red', text: fmt(dict.findingWebgpuNo, { bench: benchStr }) };

  const f2 = state.ramInferred
    ? { dot: 'amber', text: fmt(dict.findingRamCap, { ram: res.spec.ramGb }) }
    : res.spec.ramGb <= 8
      ? { dot: 'red', text: fmt(dict.findingRamLow, { ram: res.spec.ramGb }) }
      : { dot: 'green', text: fmt(dict.findingRamOk, { ram: res.spec.ramGb, free: res.memoryBudget.headroomGb, ide: res.ide.name.split(' ')[0] }) };

  const f3 =
    res.disk.id === 'hdd'
      ? { dot: 'red', text: dict.findingDiskHdd }
      : res.gpu.rt && res.gpu.fp16
        ? { dot: 'green', text: fmt(dict.findingGpuRt, { gpu: res.gpu.name }) }
        : { dot: 'amber', text: fmt(dict.findingGpuNoRt, { gpu: res.gpu.name, vram: res.spec.vramGb }) };

  el.innerHTML = [f1, f2, f3]
    .map(
      (f) => `<div class="finding-pill" title="${f.text}">
        <span class="finding-dot finding-dot--${f.dot}" aria-hidden="true"></span>
        <span>${f.text}</span>
      </div>`
    )
    .join('');
}

function renderEvaluation() {
  const dict = t();
  const res = evaluateSpec(state.spec);
  state.lastEval = res;

  animateScore(res.systemScore);

  const heroVerdict = $('hero-verdict');
  if (heroVerdict && dict.heroVerdicts) {
    heroVerdict.textContent = dict.heroVerdicts[res.grade] || '—';
  }

  const gradeEl = $('score-grade');
  gradeEl.textContent = res.grade;
  gradeEl.className = `grade-badge grade--${res.grade}`;

  $('val-cpu').textContent = `Tier ${res.cpu.tier}/10`;
  $('val-gpu').textContent = `Tier ${res.gpu.tier}/10`;
  $('val-vram').textContent = `${res.spec.vramGb} GB`;
  $('val-ram').textContent = `${res.spec.ramGb} GB`;

  const verdict = (dict.verdicts && dict.verdicts[res.grade]) || { title: '—', sub: '' };
  if ($('verdict-headline')) $('verdict-headline').textContent = verdict.title;
  if ($('verdict-sub')) $('verdict-sub').textContent = verdict.sub;

  $('best-wf-name').textContent = dict.wfNames[res.bestWorkflow.id] || res.bestWorkflow.id;
  $('best-wf-ver').textContent = res.bestWorkflow.recommendedVersion;

  // 4 KPI Tiles
  const kpis = res.summaryKpis;
  if (kpis) {
    $('kpi-milestone').textContent = (dict.milestoneLabels && dict.milestoneLabels[kpis.furthestMilestone]) || kpis.furthestMilestone;
    $('kpi-targets').textContent = fmt(dict.kpiTargetsFmt, { ok: kpis.compatibleCount, total: kpis.totalTargets });
    if (kpis.primaryBottleneck.key === 'none') {
      $('kpi-bottleneck').textContent = dict.kpiNone;
    } else {
      const bKey = kpis.primaryBottleneck.key;
      const bVal = kpis.primaryBottleneck.value;
      $('kpi-bottleneck').textContent = bKey === 'disk' ? bVal : `${bKey.toUpperCase()} (${bVal})`;
    }
    $('kpi-ai').textContent = (dict.aiCeilings && dict.aiCeilings[kpis.aiCeiling]) || kpis.aiCeiling;
  }

  renderMilestoneTrack(res, dict);
  renderHardwareWave(res, dict);
  renderFindingsTicker(res, dict);

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

  // PortWatch-Style Workflows (ranked best first)
  const sortedWorkflows = [...res.workflows].sort((a, b) => b.score - a.score);
  $('workflow-grid').innerHTML = sortedWorkflows
    .map((wf, idx) => {
      const st = statusMeta(wf.status);
      const isBest = wf.id === res.bestWorkflow.id;
      const pros = formatTokens(wf.strengths, dict.strengths);
      const cons = formatTokens(wf.bottlenecks, dict.bottlenecks);
      const sub = wf.subScores || { cpu: 50, gpu: 50, ram: 50, vram: 50 };

      const prosHtml = pros.length
        ? pros.map((p) => `<li><span class="wf-mark--ok" aria-hidden="true">✓</span><span>${p}</span></li>`).join('')
        : `<li><span class="wf-mark--no" aria-hidden="true">–</span><span>${dict.noStrengths}</span></li>`;
      const consHtml = cons.length
        ? cons.map((c) => `<li><span class="wf-mark--no" aria-hidden="true">–</span><span>${c}</span></li>`).join('')
        : `<li><span class="wf-mark--ok" aria-hidden="true">✓</span><span>${dict.noBlockers}</span></li>`;

      return `
      <article class="wf-card${isBest ? ' wf-card--best' : ''}">
        <div class="wf-card__head">
          <div class="wf-title-group">
            <span class="wf-rank">${idx + 1}</span>
            <span class="wf-icon" aria-hidden="true">${WF_ICONS[wf.icon] || WF_ICONS.box}</span>
            <div class="wf-title-meta">
              <h3>${dict.wfNames[wf.id] || wf.id}</h3>
              <div class="wf-chips">
                <span class="wf-chip">${wf.recommendedVersion}</span>
                <span class="wf-chip">${wf.pipeline}</span>
                ${isBest ? `<span class="wf-chip wf-chip--best">${dict.bestMatchTag}</span>` : ''}
              </div>
            </div>
          </div>
          <div class="wf-score-col">
            <div class="wf-score-big">${wf.score}<small>%</small></div>
            <span class="status-badge ${st.cls}">${st.label}</span>
          </div>
        </div>

        <div class="wf-bar" aria-hidden="true"><div class="wf-bar__fill" style="width:${wf.score}%"></div></div>

        <div class="wf-micro-grid">
          <div class="wf-micro">
            <div class="wf-micro__top"><span class="wf-micro__lbl">${dict.pillarCpu}</span><span class="wf-micro__val">Tier ${res.cpu.tier}/10</span></div>
            <div class="wf-micro__track"><div class="wf-micro__fill" style="width:${sub.cpu}%"></div></div>
          </div>
          <div class="wf-micro">
            <div class="wf-micro__top"><span class="wf-micro__lbl">${dict.pillarGpu}</span><span class="wf-micro__val">Tier ${res.gpu.tier}/10</span></div>
            <div class="wf-micro__track"><div class="wf-micro__fill" style="width:${sub.gpu}%"></div></div>
          </div>
          <div class="wf-micro">
            <div class="wf-micro__top"><span class="wf-micro__lbl">${dict.pillarRam}</span><span class="wf-micro__val">${res.spec.ramGb} GB</span></div>
            <div class="wf-micro__track"><div class="wf-micro__fill" style="width:${sub.ram}%"></div></div>
          </div>
          <div class="wf-micro">
            <div class="wf-micro__top"><span class="wf-micro__lbl">${dict.pillarVram}</span><span class="wf-micro__val">${res.spec.vramGb} GB</span></div>
            <div class="wf-micro__track"><div class="wf-micro__fill" style="width:${sub.vram}%"></div></div>
          </div>
        </div>

        <details class="wf-details"${isBest ? ' open' : ''}>
          <summary class="wf-summary">
            <span class="wf-summary__metrics">
              <span>${dict.metricScene}: <strong>${wf.estFps}</strong></span>
              <span>${dict.metricReload}: <strong>${wf.compileTime}</strong></span>
              <span>${dict.metricGrade}: <strong>${wf.grade}</strong></span>
            </span>
            <span class="wf-toggle-pill">
              <span class="wf-toggle-open">${dict.showDetails}</span>
              <span class="wf-toggle-close">${dict.hideDetails}</span>
            </span>
          </summary>
          <div class="wf-split">
            <div>
              <h4 class="wf-col-title">${dict.whatWorks}</h4>
              <ul class="wf-bullets">${prosHtml}</ul>
            </div>
            <div>
              <h4 class="wf-col-title">${dict.whatsBlocking}</h4>
              <ul class="wf-bullets">${consHtml}</ul>
            </div>
          </div>
        </details>
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
      const notes = formatTokens(item.bottlenecks, dict.bottlenecks).join(' · ') || '—';
      return `
      <tr>
        <td><strong>${item.name}</strong><span class="target-badge">${item.badge}</span></td>
        <td>
          <div class="mini-score">
            <span class="grade-pill grade--${item.grade}">${item.grade}</span>
            <span class="mini-score__bar" aria-hidden="true"><span class="mini-score__fill" style="width:${item.score}%"></span></span>
          </div>
        </td>
        <td><span class="status-badge ${st.cls}">${st.label}</span></td>
        <td style="font-family:var(--font-mono);font-size:0.78rem;">${item.estFps} · ${item.compileTime}</td>
        <td style="font-size:0.82rem;color:var(--text-secondary);">${notes}</td>
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

  // Event delegation for clickable preset pins on the Milestone Bar
  const pinsContainer = $('milestone-pins');
  if (pinsContainer) {
    pinsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-preset]');
      if (!btn) return;
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
  }

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

  // Compact Language Dropdown
  const langTrigger = $('btn-lang-menu');
  const langMenu = $('lang-menu');
  if (langTrigger && langMenu) {
    langTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = langMenu.hidden;
      langMenu.hidden = !willOpen;
      langTrigger.setAttribute('aria-expanded', String(willOpen));
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.lang-dropdown')) closeLangMenu();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLangMenu();
    });
  }

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.lang = btn.dataset.lang;
      closeLangMenu();
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
    const verdict = (dict.verdicts && dict.verdicts[r.grade]) || { title: '' };
    const text = fmt(dict.reportTemplate, {
      score: r.systemScore,
      grade: r.grade,
      verdict: verdict.title,
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
