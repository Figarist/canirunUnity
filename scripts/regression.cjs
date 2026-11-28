const assert = require('node:assert/strict');

async function run() {
  const { matchGpuFromString, inferRamFromGpu } = await import('../src/data/hardware-db.js');
  const { evaluateSpec } = await import('../src/engine/evaluator.js');
  const { cleanRendererName, mapCpuId } = await import('../src/engine/detector.js');
  const { TRANSLATIONS } = await import('../src/i18n/translations.js');

  // 1. GPU WebGL string parsing
  const rtx4070s = matchGpuFromString(cleanRendererName('ANGLE (NVIDIA, NVIDIA GeForce RTX 4070 SUPER Direct3D11 vs_5_0 ps_5_0)'));
  assert.equal(rtx4070s.id, 'rtx-4070-super');
  assert.equal(rtx4070s.vram, 12);

  const m2 = matchGpuFromString('Apple M2');
  assert.equal(m2.id, 'apple-m2');
  assert.equal(m2.unified, true);

  const uhd = matchGpuFromString('ANGLE (Intel, Intel(R) UHD Graphics 620 Direct3D11 vs_5_0 ps_5_0)');
  assert.equal(uhd.id, 'intel-uhd');

  // 1b. Laptop & fallback GPU parsing
  const rtx3060Lap = matchGpuFromString(cleanRendererName('ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 Laptop GPU Direct3D11 vs_5_0 ps_5_0)'));
  assert.equal(rtx3060Lap.id, 'rtx-3060-laptop');
  assert.equal(rtx3060Lap.vram, 6);
  assert.equal(rtx3060Lap.laptop, true);

  const rtx3060Ti = matchGpuFromString('NVIDIA GeForce RTX 3060 Ti');
  assert.equal(rtx3060Ti.id, 'rtx-3060-ti');
  assert.equal(rtx3060Ti.vram, 8);

  const rtx2050 = matchGpuFromString('NVIDIA GeForce RTX 2050');
  assert.equal(rtx2050.id, 'rtx-2050-laptop');
  assert.equal(rtx2050.vram, 4);
  assert.equal(rtx2050.tier, 4);

  const gtx970 = matchGpuFromString('NVIDIA GeForce GTX 970');
  assert.equal(gtx970.id, 'generic-dedicated');
  assert.equal(gtx970.tier, 3);

  // 2. Smart RAM heuristic & Apple Silicon CPU mapping
  const inferredPro = inferRamFromGpu(8, rtx4070s);
  assert.equal(inferredPro.ramGb, 32);
  assert.equal(inferredPro.inferred, true);

  const inferredLaptop = inferRamFromGpu(8, uhd, 20);
  assert.equal(inferredLaptop.ramGb, 16);
  assert.equal(inferredLaptop.inferred, true);

  const inferredExact = inferRamFromGpu(4, uhd);
  assert.equal(inferredExact.ramGb, 4);
  assert.equal(inferredExact.inferred, false);

  assert.equal(mapCpuId(8, 1200, 'macos_arm'), 'cpu-8c');

  // 3. School / Optimus-fallback Laptop (8 GB, Intel UHD 1 GB, 20T CPU, SATA SSD)
  const school = evaluateSpec({
    os: 'windows',
    cpuId: 'cpu-12c',
    gpuId: 'intel-uhd',
    vramGb: 1,
    ramGb: 8,
    diskId: 'sata',
    ideId: 'vscode'
  });
  assert.ok(['C', 'D'].includes(school.grade), `Expected C or D for school laptop, got ${school.grade}`);
  assert.notEqual(school.bestWorkflow.id, 'wf-hdrp', 'Weak laptop must never recommend HDRP');
  assert.ok(['wf-edu', 'wf-2d-mobile'].includes(school.bestWorkflow.id), `Expected 2D/Edu bestWorkflow, got ${school.bestWorkflow.id}`);
  assert.notEqual(school.summaryKpis.furthestMilestone, 'urp', 'Intel UHD 1GB must not claim 3D milestone');
  const hdrpSchool = school.matrix.find((m) => m.id === 'rp-hdrp');
  assert.equal(hdrpSchool.status, 'cannot-run');
  const llm14bSchool = school.matrix.find((m) => m.id === 'llm-14b');
  assert.equal(llm14bSchool.status, 'cannot-run');

  // 3b. Bottleneck caps: 4 GB RAM + RTX 4090 must not get Grade B
  const lowRamRig = evaluateSpec({
    os: 'windows',
    cpuId: 'cpu-12c',
    gpuId: 'rtx-4090',
    vramGb: 24,
    ramGb: 4,
    diskId: 'nvme',
    ideId: 'vscode'
  });
  assert.ok(lowRamRig.systemScore <= 38, `Expected <= 38 for 4 GB RAM rig, got ${lowRamRig.systemScore}`);
  assert.ok(['D', 'F'].includes(lowRamRig.grade), `Expected D or F for 4 GB RAM rig, got ${lowRamRig.grade}`);

  // 3c. Upgrade Simulator for Apple Silicon & Laptop GPU
  const macEval = evaluateSpec({
    os: 'macos_arm',
    cpuId: 'cpu-8c',
    gpuId: 'apple-m2',
    vramGb: 6,
    ramGb: 8,
    diskId: 'nvme',
    ideId: 'vscode'
  });
  assert.ok(macEval.upgrades.some((u) => u.noteKey === 'upgradeMacNote'), 'Expected upgradeMacNote for macOS ARM');
  assert.ok(!macEval.upgrades.some((u) => u.type === 'gpu'), 'macOS ARM must not suggest desktop GPU upgrade');

  const laptopEval = evaluateSpec({
    os: 'windows',
    cpuId: 'cpu-6c',
    gpuId: 'rtx-3060-laptop',
    vramGb: 6,
    ramGb: 16,
    diskId: 'nvme',
    ideId: 'vscode'
  });
  assert.ok(laptopEval.upgrades.some((u) => u.noteKey === 'upgradeLaptopGpuNote'), 'Expected upgradeLaptopGpuNote for laptop GPU');
  assert.ok(!laptopEval.upgrades.some((u) => u.type === 'gpu'), 'Laptop GPU must not suggest desktop GPU upgrade');

  // 4. Pro Rig (32 GB, RTX 4070 Super 12 GB, NVMe)
  const pro = evaluateSpec({
    os: 'windows',
    cpuId: 'cpu-8c',
    gpuId: 'rtx-4070-super',
    vramGb: 12,
    ramGb: 32,
    diskId: 'nvme',
    ideId: 'rider'
  });
  assert.ok(['S', 'A'].includes(pro.grade), `Expected S or A for pro rig, got ${pro.grade}`);
  assert.ok(pro.systemScore >= 85, `Expected >= 85 score, got ${pro.systemScore}`);
  const sentisPro = pro.matrix.find((m) => m.id === 'ai-sentis');
  assert.equal(sentisPro.status, 'can-run');
  const llm7bPro = pro.matrix.find((m) => m.id === 'llm-7b');
  assert.equal(llm7bPro.status, 'can-run');
  assert.equal(llm7bPro.subScores.vram, 100, 'LLM 7B on 12 GB VRAM should score 100 VRAM without double-counting');

  // 5. 5-Language dictionary key parity + 12 FAQ items
  const baseKeys = Object.keys(TRANSLATIONS.en).sort();
  assert.equal(TRANSLATIONS.en.faqItems.length, 12, 'Expected 12 FAQ items in EN');
  for (const lang of ['uk', 'ru', 'ko', 'pl']) {
    const langKeys = Object.keys(TRANSLATIONS[lang]).sort();
    assert.deepEqual(langKeys, baseKeys, `Top-level i18n keys mismatch for ${lang}`);
    assert.equal(TRANSLATIONS[lang].faqItems.length, 12, `Expected 12 FAQ items in ${lang}`);
    assert.equal(TRANSLATIONS[lang].seoCards.length, 3, `Expected 3 SEO cards in ${lang}`);
    assert.equal(TRANSLATIONS[lang].seoTableRows.length, 4, `Expected 4 SEO table rows in ${lang}`);
    assert.deepEqual(
      Object.keys(TRANSLATIONS[lang].wfNames).sort(),
      Object.keys(TRANSLATIONS.en.wfNames).sort(),
      `wfNames mismatch for ${lang}`
    );
    assert.deepEqual(
      Object.keys(TRANSLATIONS[lang].bottlenecks).sort(),
      Object.keys(TRANSLATIONS.en.bottlenecks).sort(),
      `bottlenecks mismatch for ${lang}`
    );
    assert.deepEqual(
      Object.keys(TRANSLATIONS[lang].doctorTipsMap).sort(),
      Object.keys(TRANSLATIONS.en.doctorTipsMap).sort(),
      `doctorTipsMap mismatch for ${lang}`
    );
    assert.deepEqual(
      Object.keys(TRANSLATIONS[lang].verdicts).sort(),
      ['A', 'B', 'C', 'D', 'F', 'S'],
      `verdicts mismatch for ${lang}`
    );
  }

  // 6. Static requirements section: i18n parity + table is generated from unity-targets data
  const fs = require('node:fs');
  const path = require('node:path');
  const { WORKFLOWS, MATRIX_TARGETS } = await import('../src/data/unity-targets.js');
  const { renderRequirementsHtml } = await import('../src/content/static-requirements.js');
  const reqKeys = Object.keys(TRANSLATIONS.en.reqSection).sort();
  for (const lang of ['en', 'uk', 'ru', 'ko', 'pl']) {
    const rs = TRANSLATIONS[lang].reqSection;
    assert.deepEqual(Object.keys(rs).sort(), reqKeys, `reqSection keys mismatch for ${lang}`);
    assert.equal(rs.cols.length, 6, `reqSection.cols length for ${lang}`);
    assert.equal(rs.notes.length, TRANSLATIONS.en.reqSection.notes.length, `reqSection.notes length for ${lang}`);
    const html = renderRequirementsHtml(lang, TRANSLATIONS[lang]);
    assert.ok(!/\{\w+\}/.test(html), `Unfilled placeholder in static requirements (${lang})`);
    assert.equal((html.match(/<tr><td>/g) || []).length, WORKFLOWS.length, `Requirements table rows (${lang})`);
    const t = TRANSLATIONS[lang];
    assert.ok([...t.metaTitle].length <= 60, `metaTitle > 60 chars for ${lang}`);
    assert.ok(t.metaTitle.startsWith('Can I Run Unity?'), `metaTitle must start with brand for ${lang}`);
    const dl = [...t.metaDesc].length;
    assert.ok(dl >= 120 && dl <= 155, `metaDesc length ${dl} out of 120-155 for ${lang}`);
  }

  // New FAQ numbers must match the tool's own Unity 6.0 LTS target
  const u6 = MATRIX_TARGETS.find((m) => m.id === 'unity-6-lts');
  const faqU6 = TRANSLATIONS.en.faqItems.find((f) => f.q.includes('minimum system requirements for Unity 6')).a;
  for (const frag of [`${u6.minRam} GB RAM`, `${u6.minVram} GB VRAM`, `tier ${u6.minGpu} of 10`, `${u6.recRam} GB RAM`, `${u6.recVram} GB VRAM`, `tier ${u6.recGpu}`]) {
    assert.ok(faqU6.includes(frag), `Unity 6 FAQ out of sync with unity-targets.js: missing "${frag}"`);
  }

  // EN meta tags hard-coded in index.html must match the EN dictionary; og/twitter descriptions identical
  const indexHtml = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf8');
  const decode = (v) => v.replace(/&amp;/g, '&').replace(/&quot;/g, '"');
  const metaVal = (re) => decode((indexHtml.match(re) || [])[1] || '');
  assert.equal(decode((indexHtml.match(/<title>([^<]*)<\/title>/) || [])[1] || ''), TRANSLATIONS.en.metaTitle, 'index.html <title> out of sync');
  assert.equal(metaVal(/<meta name="description" content="([^"]*)"/), TRANSLATIONS.en.metaDesc, 'index.html description out of sync');
  assert.equal(metaVal(/<meta property="og:title" content="([^"]*)"/), TRANSLATIONS.en.metaTitle, 'og:title out of sync');
  assert.equal(metaVal(/<meta name="twitter:title" content="([^"]*)"/), TRANSLATIONS.en.metaTitle, 'twitter:title out of sync');
  assert.equal(metaVal(/<meta property="og:description" content="([^"]*)"/), TRANSLATIONS.en.metaDesc, 'og:description out of sync');
  assert.equal(metaVal(/<meta name="twitter:description" content="([^"]*)"/), TRANSLATIONS.en.metaDesc, 'twitter:description out of sync');
  assert.ok(indexHtml.includes('<!--STATIC_REQUIREMENTS-->'), 'index.html missing STATIC_REQUIREMENTS marker');
  assert.ok(indexHtml.includes('<option value="20">20 GB</option>'), 'index.html missing 20 GB VRAM option');

  console.log('All regression tests passed (GPU parser, RAM heuristic, scoring, AI+Unity matrix, 5-lang parity, 12 FAQs, static requirements section, meta lengths).');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
