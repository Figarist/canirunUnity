const assert = require('node:assert/strict');

async function run() {
  const { matchGpuFromString, inferRamFromGpu } = await import('../src/data/hardware-db.js');
  const { evaluateSpec } = await import('../src/engine/evaluator.js');
  const { cleanRendererName } = await import('../src/engine/detector.js');
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

  // 2. Smart RAM heuristic when browser caps deviceMemory at 8 GB
  const inferredPro = inferRamFromGpu(8, rtx4070s);
  assert.equal(inferredPro.ramGb, 32);
  assert.equal(inferredPro.inferred, true);

  const inferredExact = inferRamFromGpu(4, uhd);
  assert.equal(inferredExact.ramGb, 4);
  assert.equal(inferredExact.inferred, false);

  // 3. School Laptop (8 GB, Intel UHD, SATA SSD)
  const school = evaluateSpec({
    os: 'windows',
    cpuId: 'cpu-4c',
    gpuId: 'intel-uhd',
    vramGb: 1,
    ramGb: 8,
    diskId: 'sata',
    ideId: 'vscode'
  });
  assert.ok(['C', 'D'].includes(school.grade), `Expected C or D for school laptop, got ${school.grade}`);
  const hdrpSchool = school.matrix.find((m) => m.id === 'rp-hdrp');
  assert.equal(hdrpSchool.status, 'cannot-run');
  const llm14bSchool = school.matrix.find((m) => m.id === 'llm-14b');
  assert.equal(llm14bSchool.status, 'cannot-run');

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

  // 5. 4-Language dictionary key parity + 10 FAQ items
  const baseKeys = Object.keys(TRANSLATIONS.en).sort();
  assert.equal(TRANSLATIONS.en.faqItems.length, 10, 'Expected 10 FAQ items in EN');
  for (const lang of ['uk', 'ru', 'ko']) {
    const langKeys = Object.keys(TRANSLATIONS[lang]).sort();
    assert.deepEqual(langKeys, baseKeys, `Top-level i18n keys mismatch for ${lang}`);
    assert.equal(TRANSLATIONS[lang].faqItems.length, 10, `Expected 10 FAQ items in ${lang}`);
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
  }

  console.log('All regression tests passed (GPU parser, RAM heuristic, scoring, AI+Unity matrix, 4-lang parity, 10 FAQs).');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
