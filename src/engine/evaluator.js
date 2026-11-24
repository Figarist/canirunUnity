import { CPUS, DISKS, GPUS, IDES, OS_LIST } from '../data/hardware-db.js';
import { MATRIX_TARGETS, WORKFLOWS } from '../data/unity-targets.js';

export function scoreToGrade(score) {
  if (score >= 90) return 'S';
  if (score >= 75) return 'A';
  if (score >= 60) return 'B';
  if (score >= 45) return 'C';
  if (score >= 25) return 'D';
  return 'F';
}

function ratioScore(actual, min, rec) {
  if (actual >= rec) return 100;
  if (actual >= min) {
    const span = Math.max(0.1, rec - min);
    return 55 + ((actual - min) / span) * 45;
  }
  if (min <= 0) return 100;
  return Math.max(5, (actual / min) * 50);
}

function evaluateTarget(target, ctx) {
  const { osObj, cpu, gpu, vramGb, ramGb, disk, ide } = ctx;

  // Hard OS block for mobile/ChromeOS
  if (!osObj.desktop) {
    return {
      ...target,
      score: 10,
      grade: 'F',
      status: 'cannot-run',
      estFps: '—',
      compileTime: '—',
      bottlenecks: ['os_not_desktop']
    };
  }

  const effectiveRam = Math.max(2, ramGb - (target.extraRam || 0));
  const effectiveVram = Math.max(0.5, vramGb - (target.extraVram || 0));

  const ramPts = ratioScore(effectiveRam, target.minRam, target.recRam);
  const vramPts = ratioScore(effectiveVram, target.minVram, target.recVram);
  const cpuPts = ratioScore(cpu.tier, target.minCpu, target.recCpu);
  const gpuPts = ratioScore(gpu.tier, target.minGpu, target.recGpu);
  const diskPenalty = target.needsNvme && disk.id === 'hdd' ? 18 : target.needsNvme && disk.id === 'sata' ? 5 : 0;

  let rawScore = ramPts * 0.30 + vramPts * 0.25 + cpuPts * 0.22 + gpuPts * 0.23 - diskPenalty;

  const bottlenecks = [];
  if (ramGb < target.minRam) {
    bottlenecks.push({ code: 'ram_low', actual: ramGb, req: target.minRam });
    rawScore = Math.min(rawScore, 38);
  } else if (ramGb < target.recRam) {
    bottlenecks.push({ code: 'ram_tight', actual: ramGb, req: target.recRam });
  }

  if (vramGb < target.minVram) {
    bottlenecks.push({ code: 'vram_low', actual: vramGb, req: target.minVram });
    rawScore = Math.min(rawScore, 36);
  } else if (vramGb < target.recVram) {
    bottlenecks.push({ code: 'vram_tight', actual: vramGb, req: target.recVram });
  }

  if (cpu.tier < target.minCpu) {
    bottlenecks.push({ code: 'cpu_low', actual: cpu.cores, req: target.minCpu });
  }
  if (gpu.tier < target.minGpu) {
    bottlenecks.push({ code: 'gpu_low', actual: gpu.name, req: target.minGpu });
  }
  if (target.needsNvme && disk.id === 'hdd') {
    bottlenecks.push({ code: 'hdd_slow' });
  }
  if (target.requiresRt && !gpu.rt) {
    bottlenecks.push({ code: 'no_rt' });
    rawScore = Math.min(rawScore, 30);
  }
  if (target.requiresDx12 && !osObj.dx12) {
    bottlenecks.push({ code: 'no_dx12' });
    rawScore = Math.min(rawScore, 28);
  }
  if (target.requiresFp16 && !gpu.fp16) {
    bottlenecks.push({ code: 'no_fp16' });
  }
  if (ramGb <= 8 && ide.id === 'rider') {
    bottlenecks.push({ code: 'rider_8gb' });
  }

  const score = Math.max(0, Math.min(100, Math.round(rawScore)));
  const grade = scoreToGrade(score);

  let status = 'cannot-run';
  if (score >= 74) status = 'can-run';
  else if (score >= 54) status = 'can-run-slow';
  else if (score >= 38) status = 'tight';

  // Estimate Scene View FPS & C# Domain Reload
  const fpsBase = Math.round((gpu.tier * 13 + (vramGb >= target.recVram ? 15 : 0)) * (target.id.includes('hdrp') ? 0.55 : 1.0));
  const estFps = score < 30 ? '< 20 FPS' : fpsBase >= 110 ? '120+ FPS' : `${Math.max(22, fpsBase)} FPS`;

  const reloadSec = Math.max(0.8, (11 - cpu.tier) * 0.9 * (disk.id === 'hdd' ? 2.4 : disk.id === 'sata' ? 1.25 : 1.0) * (ramGb <= 8 ? 1.5 : 1.0));
  const compileTime = `~${reloadSec.toFixed(1)}s`;

  return {
    ...target,
    score,
    grade,
    status,
    estFps,
    compileTime,
    bottlenecks
  };
}

export function evaluateSpec(spec) {
  const osObj = OS_LIST.find((o) => o.id === spec.os) || OS_LIST[0];
  const cpu = CPUS.find((c) => c.id === spec.cpuId) || CPUS[1];
  const gpu = GPUS.find((g) => g.id === spec.gpuId) || GPUS[GPUS.length - 1];
  const disk = DISKS.find((d) => d.id === spec.diskId) || DISKS[1];
  const ide = IDES.find((i) => i.id === spec.ideId) || IDES[0];
  const ramGb = Number(spec.ramGb) || 8;
  const vramGb = Number(spec.vramGb) || gpu.vram;

  const ctx = { osObj, cpu, gpu, vramGb, ramGb, disk, ide };

  // Overall composite system score (weighted for Unity Editor reality)
  let systemScore = 0;
  if (!osObj.desktop) {
    systemScore = 12;
  } else {
    const ramComp = Math.min(100, (ramGb / 32) * 100);
    const gpuComp = Math.min(100, gpu.tier * 10);
    const cpuComp = Math.min(100, cpu.tier * 10);
    const vramComp = Math.min(100, (vramGb / 12) * 100);
    const diskComp = disk.factor * 100;
    systemScore = Math.round(ramComp * 0.30 + gpuComp * 0.25 + cpuComp * 0.22 + vramComp * 0.13 + diskComp * 0.10);
  }

  const grade = scoreToGrade(systemScore);

  // Memory budget breakdown (GB)
  const osGb = osObj.id.startsWith('macos') ? 3.2 : osObj.id === 'linux' ? 1.8 : 3.8;
  const unityGb = ramGb >= 16 ? 4.2 : 2.8;
  const ideGb = ide.ramGb;
  const usedGb = +(osGb + unityGb + ideGb).toFixed(1);
  const headroomGb = +Math.max(0, ramGb - usedGb).toFixed(1);

  const workflows = WORKFLOWS.map((wf) => evaluateTarget(wf, ctx));
  const matrix = MATRIX_TARGETS.map((t) => evaluateTarget(t, ctx));

  // Best workflow pick (highest score that isn't edu fallback unless score is low)
  const sortedWf = [...workflows].sort((a, b) => b.score - a.score);
  const bestWorkflow = sortedWf[0];

  // Upgrade Simulator
  const upgrades = [];
  if (ramGb < 32) {
    const nextRam = ramGb < 16 ? 16 : 32;
    const sim = evaluateSpecCore({ ...spec, ramGb: nextRam });
    upgrades.push({
      id: `upg-ram-${nextRam}`,
      type: 'ram',
      targetValue: `${nextRam} GB RAM`,
      delta: Math.max(0, sim.systemScore - systemScore),
      newScore: sim.systemScore,
      newGrade: scoreToGrade(sim.systemScore)
    });
  }
  if (disk.id !== 'nvme') {
    const sim = evaluateSpecCore({ ...spec, diskId: 'nvme' });
    upgrades.push({
      id: 'upg-nvme',
      type: 'disk',
      targetValue: 'NVMe M.2 SSD',
      delta: Math.max(0, sim.systemScore - systemScore),
      newScore: sim.systemScore,
      newGrade: scoreToGrade(sim.systemScore)
    });
  }
  if (gpu.tier < 8) {
    const targetGpu = gpu.tier < 6 ? 'rtx-3060-12' : 'rtx-4070-super';
    const targetGpuObj = GPUS.find((g) => g.id === targetGpu);
    const sim = evaluateSpecCore({ ...spec, gpuId: targetGpu, vramGb: targetGpuObj.vram });
    upgrades.push({
      id: `upg-${targetGpu}`,
      type: 'gpu',
      targetValue: targetGpuObj.name,
      delta: Math.max(0, sim.systemScore - systemScore),
      newScore: sim.systemScore,
      newGrade: scoreToGrade(sim.systemScore)
    });
  }

  // Doctor Mode tips
  const doctorTips = [];
  if (ramGb <= 8) {
    doctorTips.push('doc_low_ram_ide');
    doctorTips.push('doc_enter_play_mode');
  }
  if (disk.id === 'hdd') {
    doctorTips.push('doc_hdd_ssd');
  }
  if (vramGb <= 4) {
    doctorTips.push('doc_urp_low_vram');
  }
  if (cpu.tier <= 4) {
    doctorTips.push('doc_asmdef');
  }
  if (gpu.tier >= 7 && ramGb >= 16) {
    doctorTips.push('doc_gpu_lightmapper');
  }
  if (doctorTips.length === 0) {
    doctorTips.push('doc_pro_optimal');
  }

  return {
    systemScore,
    grade,
    spec: { ...spec, ramGb, vramGb },
    osObj,
    cpu,
    gpu,
    disk,
    ide,
    memoryBudget: { total: ramGb, osGb, unityGb, ideGb, usedGb, headroomGb },
    bestWorkflow,
    workflows,
    matrix,
    upgrades,
    doctorTips
  };
}

function evaluateSpecCore(spec) {
  const osObj = OS_LIST.find((o) => o.id === spec.os) || OS_LIST[0];
  const cpu = CPUS.find((c) => c.id === spec.cpuId) || CPUS[1];
  const gpu = GPUS.find((g) => g.id === spec.gpuId) || GPUS[GPUS.length - 1];
  const disk = DISKS.find((d) => d.id === spec.diskId) || DISKS[1];
  const ramGb = Number(spec.ramGb) || 8;
  const vramGb = Number(spec.vramGb) || gpu.vram;
  if (!osObj.desktop) return { systemScore: 12 };
  const ramComp = Math.min(100, (ramGb / 32) * 100);
  const gpuComp = Math.min(100, gpu.tier * 10);
  const cpuComp = Math.min(100, cpu.tier * 10);
  const vramComp = Math.min(100, (vramGb / 12) * 100);
  const diskComp = disk.factor * 100;
  return {
    systemScore: Math.round(ramComp * 0.30 + gpuComp * 0.25 + cpuComp * 0.22 + vramComp * 0.13 + diskComp * 0.10)
  };
}
