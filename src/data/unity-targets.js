export const WORKFLOWS = [
  {
    id: 'wf-2d-mobile',
    icon: 'smartphone',
    recommendedVersion: 'Unity 6000.0 LTS / 2022.3 LTS',
    pipeline: 'URP 2D / Built-in',
    minRam: 8,
    recRam: 16,
    minVram: 1,
    recVram: 2,
    minCpu: 2,
    recCpu: 4,
    minGpu: 2,
    recGpu: 4,
    needsNvme: false
  },
  {
    id: 'wf-3d-indie',
    icon: 'box',
    recommendedVersion: 'Unity 6000.3 (Unity 6)',
    pipeline: 'URP 3D + Shader Graph',
    minRam: 12,
    recRam: 16,
    minVram: 4,
    recVram: 6,
    minCpu: 4,
    recCpu: 6,
    minGpu: 4,
    recGpu: 6,
    needsNvme: true
  },
  {
    id: 'wf-multiplayer',
    icon: 'users',
    recommendedVersion: 'Unity 6000.3 + PurrNet / Netcode',
    pipeline: 'URP 3D + 2x Play Mode',
    minRam: 16,
    recRam: 32,
    minVram: 4,
    recVram: 8,
    minCpu: 6,
    recCpu: 8,
    minGpu: 5,
    recGpu: 7,
    needsNvme: true
  },
  {
    id: 'wf-hdrp',
    icon: 'sparkles',
    recommendedVersion: 'Unity 6000.3 (HDRP 17.x)',
    pipeline: 'HDRP + Volumetric Fog + RT',
    minRam: 16,
    recRam: 32,
    minVram: 8,
    recVram: 12,
    minCpu: 6,
    recCpu: 8,
    minGpu: 7,
    recGpu: 9,
    needsNvme: true
  },
  {
    id: 'wf-xr',
    icon: 'glasses',
    recommendedVersion: 'Unity 6000.0 LTS + OpenXR / PICO',
    pipeline: 'URP Single-Pass Stereo',
    minRam: 16,
    recRam: 32,
    minVram: 6,
    recVram: 8,
    minCpu: 6,
    recCpu: 8,
    minGpu: 6,
    recGpu: 8,
    needsNvme: true
  },
  {
    id: 'wf-ai',
    icon: 'cpu',
    recommendedVersion: 'Unity 6 + Sentis 2.6 / ML-Agents',
    pipeline: 'GPU Compute + Local LLM',
    minRam: 16,
    recRam: 32,
    minVram: 6,
    recVram: 12,
    minCpu: 6,
    recCpu: 8,
    minGpu: 6,
    recGpu: 8,
    needsNvme: true
  },
  {
    id: 'wf-edu',
    icon: 'graduation',
    recommendedVersion: 'Unity 2022.3 LTS + VS Code',
    pipeline: 'Built-in / URP 2D Starter',
    minRam: 8,
    recRam: 16,
    minVram: 1,
    recVram: 2,
    minCpu: 2,
    recCpu: 4,
    minGpu: 2,
    recGpu: 3,
    needsNvme: false
  }
];

export const MATRIX_TARGETS = [
  // ── VERSIONS ──────────────────────────────────────────────
  {
    id: 'unity-6-latest',
    category: 'versions',
    name: 'Unity 6.3 / 6.6 (6000.x)',
    badge: 'Latest',
    minRam: 8, recRam: 16, minVram: 2, recVram: 6, minCpu: 3, recCpu: 6, minGpu: 3, recGpu: 6, needsNvme: true
  },
  {
    id: 'unity-6-lts',
    category: 'versions',
    name: 'Unity 6.0 LTS (6000.0)',
    badge: 'LTS',
    minRam: 8, recRam: 16, minVram: 2, recVram: 4, minCpu: 3, recCpu: 6, minGpu: 2, recGpu: 5, needsNvme: false
  },
  {
    id: 'unity-2022-lts',
    category: 'versions',
    name: 'Unity 2022.3 LTS',
    badge: 'Stable',
    minRam: 8, recRam: 16, minVram: 1, recVram: 4, minCpu: 2, recCpu: 4, minGpu: 2, recGpu: 4, needsNvme: false
  },
  {
    id: 'unity-2021-lts',
    category: 'versions',
    name: 'Unity 2021.3 LTS',
    badge: 'Legacy',
    minRam: 6, recRam: 12, minVram: 1, recVram: 2, minCpu: 2, recCpu: 4, minGpu: 1, recGpu: 3, needsNvme: false
  },

  // ── PIPELINES & LIGHTING ──────────────────────────────────
  {
    id: 'rp-builtin',
    category: 'pipelines',
    name: 'Built-in Render Pipeline',
    badge: 'Classic',
    minRam: 6, recRam: 8, minVram: 1, recVram: 2, minCpu: 2, recCpu: 4, minGpu: 1, recGpu: 3, needsNvme: false
  },
  {
    id: 'rp-urp-2d',
    category: 'pipelines',
    name: 'URP 2D + 2D Lights',
    badge: '2D',
    minRam: 8, recRam: 16, minVram: 1, recVram: 3, minCpu: 2, recCpu: 4, minGpu: 2, recGpu: 4, needsNvme: false
  },
  {
    id: 'rp-urp-3d',
    category: 'pipelines',
    name: 'URP 3D + Volumetric Fog + PostFX',
    badge: 'Indie 3D',
    minRam: 12, recRam: 16, minVram: 4, recVram: 6, minCpu: 4, recCpu: 6, minGpu: 4, recGpu: 6, needsNvme: true
  },
  {
    id: 'rp-hdrp',
    category: 'pipelines',
    name: 'HDRP 17.x (High Definition)',
    badge: 'AAA',
    minRam: 16, recRam: 32, minVram: 8, recVram: 12, minCpu: 6, recCpu: 8, minGpu: 7, recGpu: 9, needsNvme: true
  },
  {
    id: 'rp-hdrp-rt',
    category: 'pipelines',
    name: 'HDRP + Hardware Raytracing (DX12)',
    badge: 'RT',
    minRam: 32, recRam: 32, minVram: 10, recVram: 16, minCpu: 6, recCpu: 8, minGpu: 8, recGpu: 9, needsNvme: true, requiresRt: true, requiresDx12: true
  },
  {
    id: 'bake-cpu',
    category: 'pipelines',
    name: 'Progressive CPU Lightmapper',
    badge: 'Bake',
    minRam: 8, recRam: 16, minVram: 2, recVram: 4, minCpu: 4, recCpu: 8, minGpu: 2, recGpu: 4, needsNvme: false
  },
  {
    id: 'bake-gpu',
    category: 'pipelines',
    name: 'Progressive GPU Lightmapper',
    badge: 'Fast Bake',
    minRam: 16, recRam: 32, minVram: 6, recVram: 10, minCpu: 4, recCpu: 6, minGpu: 6, recGpu: 8, needsNvme: true
  },

  // ── PACKAGES & TARGET PLATFORMS ───────────────────────────
  {
    id: 'pkg-dots',
    category: 'packages',
    name: 'DOTS / ECS + Burst Compiler',
    badge: 'Performance',
    minRam: 12, recRam: 16, minVram: 2, recVram: 4, minCpu: 4, recCpu: 8, minGpu: 3, recGpu: 5, needsNvme: true
  },
  {
    id: 'pkg-multiplayer',
    category: 'packages',
    name: 'PurrNet / Multiplayer Play Mode (2–4x)',
    badge: 'Netcode',
    minRam: 16, recRam: 32, minVram: 4, recVram: 8, minCpu: 6, recCpu: 8, minGpu: 5, recGpu: 7, needsNvme: true
  },
  {
    id: 'pkg-shader-vfx',
    category: 'packages',
    name: 'Shader Graph & VFX Graph (GPU Particles)',
    badge: 'VFX',
    minRam: 12, recRam: 16, minVram: 4, recVram: 8, minCpu: 4, recCpu: 6, minGpu: 5, recGpu: 7, needsNvme: false
  },
  {
    id: 'pkg-terrain',
    category: 'packages',
    name: 'Terrain Tools + SpeedTree / Detail Scatter',
    badge: 'Open World',
    minRam: 16, recRam: 32, minVram: 6, recVram: 10, minCpu: 6, recCpu: 8, minGpu: 6, recGpu: 8, needsNvme: true
  },
  {
    id: 'sdk-android-wear',
    category: 'packages',
    name: 'Android + Wear OS IL2CPP Build',
    badge: 'Mobile',
    minRam: 8, recRam: 16, minVram: 2, recVram: 4, minCpu: 4, recCpu: 6, minGpu: 2, recGpu: 4, needsNvme: true
  },
  {
    id: 'sdk-xr',
    category: 'packages',
    name: 'OpenXR / PICO SDK / Meta Quest Link',
    badge: 'VR / XR',
    minRam: 16, recRam: 32, minVram: 6, recVram: 8, minCpu: 6, recCpu: 8, minGpu: 6, recGpu: 8, needsNvme: true
  },
  {
    id: 'sdk-webgl',
    category: 'packages',
    name: 'WebGL Build (Emscripten Wasm + Brotli)',
    badge: 'Web',
    minRam: 8, recRam: 16, minVram: 2, recVram: 4, minCpu: 4, recCpu: 6, minGpu: 2, recGpu: 4, needsNvme: true
  },

  // ── AI & LOCAL LLM ALONGSIDE UNITY ────────────────────────
  {
    id: 'ai-sentis',
    category: 'ai',
    name: 'Unity Sentis 2.6 (In-Game ONNX AI)',
    badge: 'Unity AI',
    minRam: 12, recRam: 16, minVram: 4, recVram: 8, minCpu: 4, recCpu: 6, minGpu: 4, recGpu: 7, needsNvme: false, requiresFp16: true
  },
  {
    id: 'ai-mlagents',
    category: 'ai',
    name: 'Unity ML-Agents (PyTorch RL Training)',
    badge: 'RL / Python',
    minRam: 16, recRam: 32, minVram: 6, recVram: 10, minCpu: 6, recCpu: 8, minGpu: 5, recGpu: 8, needsNvme: true
  },
  {
    id: 'ai-muse',
    category: 'ai',
    name: 'Unity Muse / Cloud AI Assistants',
    badge: 'Cloud AI',
    minRam: 8, recRam: 16, minVram: 2, recVram: 4, minCpu: 2, recCpu: 4, minGpu: 2, recGpu: 4, needsNvme: false
  },
  {
    id: 'llm-3b',
    category: 'ai',
    name: 'Unity Editor + Local Qwen-Coder 3B (Q4_K_M)',
    badge: '~2.5 GB VRAM',
    minRam: 12, recRam: 16, minVram: 4, recVram: 6, minCpu: 4, recCpu: 6, minGpu: 4, recGpu: 6, needsNvme: true, extraVram: 2.5, extraRam: 3
  },
  {
    id: 'llm-7b',
    category: 'ai',
    name: 'Unity Editor + Local Qwen-Coder / Llama 7B–8B',
    badge: '~5.5 GB VRAM',
    minRam: 16, recRam: 32, minVram: 8, recVram: 12, minCpu: 6, recCpu: 8, minGpu: 6, recGpu: 8, needsNvme: true, extraVram: 5.5, extraRam: 6
  },
  {
    id: 'llm-14b',
    category: 'ai',
    name: 'Unity Editor + Local Qwen-Coder 14B (Q4_K_M)',
    badge: '~9.5 GB VRAM',
    minRam: 32, recRam: 32, minVram: 12, recVram: 16, minCpu: 6, recCpu: 8, minGpu: 8, recGpu: 9, needsNvme: true, extraVram: 9.5, extraRam: 10
  },
  {
    id: 'llm-32b',
    category: 'ai',
    name: 'Unity Editor + Local Qwen-Coder 32B (Q4_K_M)',
    badge: '~20 GB VRAM',
    minRam: 32, recRam: 64, minVram: 24, recVram: 24, minCpu: 8, recCpu: 10, minGpu: 9, recGpu: 10, needsNvme: true, extraVram: 20, extraRam: 22
  },

  // ── IDEs & COMPANION TOOLS ────────────────────────────────
  {
    id: 'tool-vscode',
    category: 'tools',
    name: 'VS Code / Antigravity / Cursor + Unity',
    badge: 'Lightweight',
    minRam: 8, recRam: 16, minVram: 1, recVram: 2, minCpu: 2, recCpu: 4, minGpu: 1, recGpu: 3, needsNvme: false
  },
  {
    id: 'tool-vs2022',
    category: 'tools',
    name: 'Visual Studio 2022 + Unity Editor',
    badge: 'Standard',
    minRam: 12, recRam: 16, minVram: 2, recVram: 4, minCpu: 4, recCpu: 6, minGpu: 2, recGpu: 4, needsNvme: true
  },
  {
    id: 'tool-rider',
    category: 'tools',
    name: 'JetBrains Rider + Unity Editor',
    badge: 'Pro IDE',
    minRam: 16, recRam: 32, minVram: 2, recVram: 4, minCpu: 4, recCpu: 8, minGpu: 2, recGpu: 4, needsNvme: true
  },
  {
    id: 'tool-blender',
    category: 'tools',
    name: 'Blender 4.x + Unity Editor (Live FBX)',
    badge: '3D Art',
    minRam: 16, recRam: 32, minVram: 4, recVram: 8, minCpu: 6, recCpu: 8, minGpu: 4, recGpu: 7, needsNvme: true
  },
  {
    id: 'tool-avd',
    category: 'tools',
    name: 'Android / Wear OS Emulator + Unity',
    badge: 'Emulator',
    minRam: 16, recRam: 32, minVram: 4, recVram: 6, minCpu: 6, recCpu: 8, minGpu: 4, recGpu: 6, needsNvme: true
  }
];
