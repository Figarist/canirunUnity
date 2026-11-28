export const GPUS = [
  // NVIDIA RTX 50-series
  { id: 'rtx-5090', name: 'NVIDIA GeForce RTX 5090', vendor: 'NVIDIA', tier: 10, vram: 32, rt: true, fp16: true, pattern: /RTX\s*5090/i },
  { id: 'rtx-5080-laptop', name: 'NVIDIA GeForce RTX 5080 Laptop', vendor: 'NVIDIA', tier: 9, vram: 16, rt: true, fp16: true, laptop: true, pattern: /RTX\s*5080.*(Laptop|Mobile|Max-Q)/i },
  { id: 'rtx-5080', name: 'NVIDIA GeForce RTX 5080', vendor: 'NVIDIA', tier: 10, vram: 16, rt: true, fp16: true, pattern: /RTX\s*5080/i },
  { id: 'rtx-5070-ti', name: 'NVIDIA GeForce RTX 5070 Ti', vendor: 'NVIDIA', tier: 9, vram: 16, rt: true, fp16: true, pattern: /RTX\s*5070\s*Ti/i },
  { id: 'rtx-5070-laptop', name: 'NVIDIA GeForce RTX 5070 Laptop', vendor: 'NVIDIA', tier: 8, vram: 8, rt: true, fp16: true, laptop: true, pattern: /RTX\s*5070.*(Laptop|Mobile|Max-Q)/i },
  { id: 'rtx-5070', name: 'NVIDIA GeForce RTX 5070', vendor: 'NVIDIA', tier: 9, vram: 12, rt: true, fp16: true, pattern: /RTX\s*5070/i },
  { id: 'rtx-5060-laptop', name: 'NVIDIA GeForce RTX 5060 Laptop', vendor: 'NVIDIA', tier: 7, vram: 8, rt: true, fp16: true, laptop: true, pattern: /RTX\s*5060.*(Laptop|Mobile|Max-Q)/i },

  // NVIDIA RTX 40-series
  { id: 'rtx-4090-laptop', name: 'NVIDIA GeForce RTX 4090 Laptop', vendor: 'NVIDIA', tier: 9, vram: 16, rt: true, fp16: true, laptop: true, pattern: /RTX\s*4090.*(Laptop|Mobile|Max-Q)/i },
  { id: 'rtx-4090', name: 'NVIDIA GeForce RTX 4090', vendor: 'NVIDIA', tier: 10, vram: 24, rt: true, fp16: true, pattern: /RTX\s*4090/i },
  { id: 'rtx-4080-laptop', name: 'NVIDIA GeForce RTX 4080 Laptop', vendor: 'NVIDIA', tier: 8, vram: 12, rt: true, fp16: true, laptop: true, pattern: /RTX\s*4080.*(Laptop|Mobile|Max-Q)/i },
  { id: 'rtx-4080', name: 'NVIDIA GeForce RTX 4080 / Super', vendor: 'NVIDIA', tier: 9, vram: 16, rt: true, fp16: true, pattern: /RTX\s*4080/i },
  { id: 'rtx-4070-ti', name: 'NVIDIA GeForce RTX 4070 Ti / Super', vendor: 'NVIDIA', tier: 9, vram: 16, rt: true, fp16: true, pattern: /RTX\s*4070\s*Ti/i },
  { id: 'rtx-4070-super', name: 'NVIDIA GeForce RTX 4070 Super', vendor: 'NVIDIA', tier: 9, vram: 12, rt: true, fp16: true, pattern: /RTX\s*4070\s*SUPER/i },
  { id: 'rtx-4070-laptop', name: 'NVIDIA GeForce RTX 4070 Laptop', vendor: 'NVIDIA', tier: 7, vram: 8, rt: true, fp16: true, laptop: true, pattern: /RTX\s*4070.*(Laptop|Mobile|Max-Q)/i },
  { id: 'rtx-4070', name: 'NVIDIA GeForce RTX 4070', vendor: 'NVIDIA', tier: 8, vram: 12, rt: true, fp16: true, pattern: /RTX\s*4070/i },
  { id: 'rtx-4060-ti', name: 'NVIDIA GeForce RTX 4060 Ti', vendor: 'NVIDIA', tier: 7, vram: 8, rt: true, fp16: true, pattern: /RTX\s*4060\s*Ti/i },
  { id: 'rtx-4060-laptop', name: 'NVIDIA GeForce RTX 4060 Laptop', vendor: 'NVIDIA', tier: 6, vram: 8, rt: true, fp16: true, laptop: true, pattern: /RTX\s*4060.*(Laptop|Mobile|Max-Q)/i },
  { id: 'rtx-4060', name: 'NVIDIA GeForce RTX 4060', vendor: 'NVIDIA', tier: 7, vram: 8, rt: true, fp16: true, pattern: /RTX\s*4060/i },
  { id: 'rtx-4050', name: 'NVIDIA GeForce RTX 4050 Laptop', vendor: 'NVIDIA', tier: 5, vram: 6, rt: true, fp16: true, laptop: true, pattern: /RTX\s*4050/i },

  // NVIDIA RTX 30-series
  { id: 'rtx-3090', name: 'NVIDIA GeForce RTX 3090', vendor: 'NVIDIA', tier: 9, vram: 24, rt: true, fp16: true, pattern: /RTX\s*3090/i },
  { id: 'rtx-3080-laptop', name: 'NVIDIA GeForce RTX 3080 / Ti Laptop', vendor: 'NVIDIA', tier: 7, vram: 8, rt: true, fp16: true, laptop: true, pattern: /RTX\s*3080.*(Laptop|Mobile|Max-Q)/i },
  { id: 'rtx-3080', name: 'NVIDIA GeForce RTX 3080', vendor: 'NVIDIA', tier: 8, vram: 10, rt: true, fp16: true, pattern: /RTX\s*3080/i },
  { id: 'rtx-3070-laptop', name: 'NVIDIA GeForce RTX 3070 / Ti Laptop', vendor: 'NVIDIA', tier: 7, vram: 8, rt: true, fp16: true, laptop: true, pattern: /RTX\s*3070.*(Laptop|Mobile|Max-Q)/i },
  { id: 'rtx-3070', name: 'NVIDIA GeForce RTX 3070 / Ti', vendor: 'NVIDIA', tier: 7, vram: 8, rt: true, fp16: true, pattern: /RTX\s*3070/i },
  { id: 'rtx-3060-laptop', name: 'NVIDIA GeForce RTX 3060 Laptop', vendor: 'NVIDIA', tier: 6, vram: 6, rt: true, fp16: true, laptop: true, pattern: /RTX\s*3060.*(Laptop|Mobile|Max-Q)/i },
  { id: 'rtx-3060-ti', name: 'NVIDIA GeForce RTX 3060 Ti', vendor: 'NVIDIA', tier: 7, vram: 8, rt: true, fp16: true, pattern: /RTX\s*3060\s*Ti/i },
  { id: 'rtx-3060-12', name: 'NVIDIA GeForce RTX 3060', vendor: 'NVIDIA', tier: 6, vram: 12, rt: true, fp16: true, pattern: /RTX\s*3060/i },
  { id: 'rtx-3050-laptop', name: 'NVIDIA GeForce RTX 3050 / Ti Laptop', vendor: 'NVIDIA', tier: 4, vram: 4, rt: true, fp16: true, laptop: true, pattern: /RTX\s*3050.*(Laptop|Mobile|Max-Q|Ti)/i },
  { id: 'rtx-3050', name: 'NVIDIA GeForce RTX 3050', vendor: 'NVIDIA', tier: 5, vram: 8, rt: true, fp16: true, pattern: /RTX\s*3050/i },

  // NVIDIA RTX 20 / GTX 16 / GTX 10 / Legacy
  { id: 'rtx-2060', name: 'NVIDIA GeForce RTX 2060 / 2070', vendor: 'NVIDIA', tier: 6, vram: 6, rt: true, fp16: true, pattern: /RTX\s*20[678]0/i },
  { id: 'rtx-2050-laptop', name: 'NVIDIA GeForce RTX 2050 Laptop', vendor: 'NVIDIA', tier: 4, vram: 4, rt: true, fp16: true, laptop: true, pattern: /RTX\s*2050/i },
  { id: 'gtx-1660-mobile', name: 'NVIDIA GeForce GTX 1660 Ti Mobile', vendor: 'NVIDIA', tier: 5, vram: 6, rt: false, fp16: true, laptop: true, pattern: /GTX\s*1660.*(Mobile|Max-Q|Laptop)/i },
  { id: 'gtx-1660', name: 'NVIDIA GeForce GTX 1660 / Super / Ti', vendor: 'NVIDIA', tier: 5, vram: 6, rt: false, fp16: true, pattern: /GTX\s*1660/i },
  { id: 'gtx-1650-mobile', name: 'NVIDIA GeForce GTX 1650 / Ti Mobile', vendor: 'NVIDIA', tier: 4, vram: 4, rt: false, fp16: true, laptop: true, pattern: /GTX\s*1650.*(Mobile|Max-Q|Laptop|Ti)/i },
  { id: 'gtx-1650', name: 'NVIDIA GeForce GTX 1650', vendor: 'NVIDIA', tier: 4, vram: 4, rt: false, fp16: true, pattern: /GTX\s*1650/i },
  { id: 'gtx-1060', name: 'NVIDIA GeForce GTX 1060', vendor: 'NVIDIA', tier: 4, vram: 6, rt: false, fp16: false, pattern: /GTX\s*10[678]0/i },
  { id: 'gtx-1050', name: 'NVIDIA GeForce GTX 1050 / Ti', vendor: 'NVIDIA', tier: 3, vram: 4, rt: false, fp16: false, pattern: /GTX\s*1050|GTX\s*9[56]0/i },
  { id: 'gt-1030', name: 'NVIDIA GeForce GT 1030 / MX350', vendor: 'NVIDIA', tier: 2, vram: 2, rt: false, fp16: false, pattern: /GT\s*1030|GT\s*7[13]0|MX[1-5][0-9]{2}/i },

  // AMD Radeon
  { id: 'rx-7900-xtx', name: 'AMD Radeon RX 7900 XT / XTX', vendor: 'AMD', tier: 9, vram: 20, rt: true, fp16: true, pattern: /RX\s*7900/i },
  { id: 'rx-7800-xt', name: 'AMD Radeon RX 7700 / 7800 XT', vendor: 'AMD', tier: 8, vram: 16, rt: true, fp16: true, pattern: /RX\s*7[78]00/i },
  { id: 'rx-7600s', name: 'AMD Radeon RX 7600S / 7700S Laptop', vendor: 'AMD', tier: 6, vram: 8, rt: true, fp16: true, laptop: true, pattern: /RX\s*7[67]00[SM]/i },
  { id: 'rx-7600', name: 'AMD Radeon RX 7600', vendor: 'AMD', tier: 6, vram: 8, rt: true, fp16: true, pattern: /RX\s*7600/i },
  { id: 'rx-6700-xt', name: 'AMD Radeon RX 6700 / 6800 XT', vendor: 'AMD', tier: 7, vram: 12, rt: true, fp16: true, pattern: /RX\s*6[789]00/i },
  { id: 'rx-6600m', name: 'AMD Radeon RX 6600M / 6700M Laptop', vendor: 'AMD', tier: 5, vram: 8, rt: true, fp16: true, laptop: true, pattern: /RX\s*6[567]00[MS]/i },
  { id: 'rx-6600', name: 'AMD Radeon RX 6600 / XT', vendor: 'AMD', tier: 6, vram: 8, rt: true, fp16: true, pattern: /RX\s*6600/i },
  { id: 'rx-580', name: 'AMD Radeon RX 570 / 580', vendor: 'AMD', tier: 4, vram: 8, rt: false, fp16: false, pattern: /RX\s*5[789]0|RX\s*4[78]0/i },
  { id: 'radeon-780m', name: 'AMD Radeon 780M / 680M (iGPU)', vendor: 'AMD', tier: 4, vram: 4, rt: false, fp16: true, unified: true, pattern: /Radeon\s*(780M|680M|890M)/i },
  { id: 'radeon-vega', name: 'AMD Radeon Vega 8 / Graphics (iGPU)', vendor: 'AMD', tier: 2, vram: 2, rt: false, fp16: false, unified: true, pattern: /Vega|Radeon\s*Graphics/i },

  // Intel
  { id: 'arc-b580', name: 'Intel Arc B580 / A770', vendor: 'Intel', tier: 7, vram: 12, rt: true, fp16: true, pattern: /Arc.*(B580|A770|A750)/i },
  { id: 'arc-a380', name: 'Intel Arc A380 / Arc iGPU', vendor: 'Intel', tier: 4, vram: 6, rt: true, fp16: true, pattern: /Intel.*Arc/i },
  { id: 'intel-iris-xe', name: 'Intel Iris Xe Graphics', vendor: 'Intel', tier: 3, vram: 2, rt: false, fp16: true, unified: true, pattern: /Iris\s*Xe/i },
  { id: 'intel-uhd', name: 'Intel UHD / HD Graphics (iGPU)', vendor: 'Intel', tier: 2, vram: 1, rt: false, fp16: false, unified: true, pattern: /Intel.*(UHD|HD)\s*Graphics|Intel.*Graphics/i },

  // Apple Silicon (Unified Memory)
  { id: 'apple-m4-max', name: 'Apple M3 / M4 Max (Unified)', vendor: 'Apple', tier: 9, vram: 24, rt: true, fp16: true, unified: true, pattern: /Apple\s*M[34]\s*(Max|Ultra)/i },
  { id: 'apple-m3-pro', name: 'Apple M2 / M3 / M4 Pro (Unified)', vendor: 'Apple', tier: 7, vram: 12, rt: true, fp16: true, unified: true, pattern: /Apple\s*M[234]\s*Pro/i },
  { id: 'apple-m2', name: 'Apple M1 / M2 / M3 / M4 (Unified)', vendor: 'Apple', tier: 5, vram: 6, rt: false, fp16: true, unified: true, pattern: /Apple\s*M[1234]|Apple\s*GPU/i },

  // Generic Fallbacks
  { id: 'generic-rtx', name: 'Dedicated GPU (RTX / RX 6000+ Unknown)', vendor: 'Generic', tier: 6, vram: 8, rt: true, fp16: true, pattern: /RTX\s*\d|Radeon\s*RX\s*[6789]\d{3}/i },
  { id: 'generic-dedicated', name: 'Dedicated GPU (Entry / Legacy)', vendor: 'Generic', tier: 3, vram: 4, rt: false, fp16: false, pattern: /NVIDIA|GeForce|Quadro|Radeon\s*RX/i },
  { id: 'mobile-gpu', name: 'Mobile / Embedded GPU (Adreno / Mali)', vendor: 'Mobile', tier: 2, vram: 2, rt: false, fp16: false, unified: true, pattern: /Adreno|Mali|PowerVR/i },
  { id: 'software-gpu', name: 'Basic Display / Software Renderer', vendor: 'Generic', tier: 1, vram: 1, rt: false, fp16: false, unified: true, pattern: /SwiftShader|llvmpipe|Microsoft\s*Basic/i }
];

export const CPUS = [
  { id: 'cpu-2c', tier: 1, cores: 2, label: '2–4 Threads (Celeron / Athlon / Dual-Core)' },
  { id: 'cpu-4c', tier: 3, cores: 4, label: '4–8 Threads (Core i3 / Ryzen 3 / Quad-Core)' },
  { id: 'cpu-6c', tier: 6, cores: 6, label: '12 Threads (Core i5 / Ryzen 5 6-Core)' },
  { id: 'cpu-8c', tier: 8, cores: 8, label: '16 Threads (Core i7 / Ryzen 7 / Apple M-Pro)' },
  { id: 'cpu-12c', tier: 10, cores: 12, label: '20–32 Threads (Core i9 / Ryzen 9 / M-Max)' }
];

export const IDES = [
  { id: 'vscode', name: 'VS Code / Antigravity / Cursor', ramGb: 1.0 },
  { id: 'vs2022', name: 'Visual Studio 2022 Community', ramGb: 2.8 },
  { id: 'rider', name: 'JetBrains Rider', ramGb: 3.6 }
];

export const DISKS = [
  { id: 'hdd', factor: 0.55, label: 'HDD (5400–7200 RPM)' },
  { id: 'sata', factor: 0.85, label: 'SATA SSD' },
  { id: 'nvme', factor: 1.0, label: 'NVMe M.2 SSD' }
];

export const OS_LIST = [
  { id: 'windows', name: 'Windows 10 / 11 (x64)', desktop: true, dx12: true },
  { id: 'macos_arm', name: 'macOS (Apple Silicon)', desktop: true, dx12: false },
  { id: 'macos_intel', name: 'macOS (Intel)', desktop: true, dx12: false },
  { id: 'linux', name: 'Linux (Ubuntu / Arch)', desktop: true, dx12: false },
  { id: 'mobile', name: 'Android / iOS / ChromeOS', desktop: false, dx12: false }
];

export const PRESETS = [
  {
    id: 'school',
    os: 'windows',
    cpuId: 'cpu-4c',
    gpuId: 'intel-uhd',
    vramGb: 1,
    ramGb: 8,
    diskId: 'sata',
    ideId: 'vscode'
  },
  {
    id: 'mac-m2',
    os: 'macos_arm',
    cpuId: 'cpu-8c',
    gpuId: 'apple-m2',
    vramGb: 6,
    ramGb: 8,
    diskId: 'nvme',
    ideId: 'vscode'
  },
  {
    id: 'indie',
    os: 'windows',
    cpuId: 'cpu-6c',
    gpuId: 'rtx-3060-12',
    vramGb: 12,
    ramGb: 16,
    diskId: 'nvme',
    ideId: 'rider'
  },
  {
    id: 'pro',
    os: 'windows',
    cpuId: 'cpu-8c',
    gpuId: 'rtx-4070-super',
    vramGb: 12,
    ramGb: 32,
    diskId: 'nvme',
    ideId: 'rider'
  }
];

export function matchGpuFromString(rendererStr = '') {
  if (!rendererStr) return GPUS.find((g) => g.id === 'intel-uhd');
  for (const gpu of GPUS) {
    if (gpu.pattern.test(rendererStr)) return gpu;
  }
  return GPUS.find((g) => g.id === 'intel-uhd');
}

export function inferRamFromGpu(browserDeviceMemory, gpu, cpuCores = 0) {
  if (!browserDeviceMemory) return { ramGb: gpu.tier >= 7 ? 16 : 8, inferred: true };
  if (browserDeviceMemory < 8) return { ramGb: browserDeviceMemory, inferred: false };
  // Browsers cap navigator.deviceMemory at 8 GB for privacy
  if (gpu.tier >= 8) return { ramGb: 32, inferred: true };
  if (gpu.tier >= 4 || cpuCores >= 12) return { ramGb: 16, inferred: true };
  return { ramGb: 8, inferred: true };
}
