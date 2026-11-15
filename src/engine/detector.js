import { CPUS, matchGpuFromString, inferRamFromGpu } from '../data/hardware-db.js';

function detectOs() {
  const ua = (navigator.userAgent || '').toLowerCase();
  const platform = (navigator.userAgentData?.platform || navigator.platform || '').toLowerCase();

  if (/android|iphone|ipad|ipod|cros/.test(ua)) return 'mobile';
  if (platform.includes('mac') || ua.includes('mac os')) {
    // Check WebGL renderer later to refine Apple Silicon vs Intel
    return 'macos_arm';
  }
  if (platform.includes('linux') || ua.includes('linux')) return 'linux';
  return 'windows';
}

function getWebGLInfo() {
  const result = {
    renderer: '',
    vendor: '',
    maxTextureSize: 0,
    webgl2: false
  };
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return result;
    result.webgl2 = typeof WebGL2RenderingContext !== 'undefined' && gl instanceof WebGL2RenderingContext;
    result.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 0;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    if (ext) {
      result.renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || '';
      result.vendor = gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) || '';
    } else {
      result.renderer = gl.getParameter(gl.RENDERER) || '';
      result.vendor = gl.getParameter(gl.VENDOR) || '';
    }
  } catch {
    // Ignore blocked WebGL
  }
  return result;
}

async function getWebGPUInfo() {
  try {
    if (!navigator.gpu) return { supported: false, description: '' };
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) return { supported: false, description: '' };
    const info = adapter.info || (adapter.requestAdapterInfo ? await adapter.requestAdapterInfo() : {});
    return {
      supported: true,
      description: [info.vendor, info.architecture, info.device, info.description].filter(Boolean).join(' ')
    };
  } catch {
    return { supported: false, description: '' };
  }
}

export function cleanRendererName(raw = '') {
  return raw
    .replace(/^ANGLE\s*\(/i, '')
    .replace(/\)$/g, '')
    .replace(/Direct3D11\s+vs_\d+_\d+\s+ps_\d+_\d+/gi, '')
    .replace(/OpenGL\s+Engine/gi, '')
    .replace(/\b(NVIDIA|AMD|Intel)\s*,\s*/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function runQuickCpuMicroBench(durationMs = 80) {
  const start = performance.now();
  let acc = 0;
  let ops = 0;
  while (performance.now() - start < durationMs) {
    for (let i = 1; i <= 4000; i++) {
      acc += Math.sqrt(i) * Math.sin(i * 0.001) + Math.cos(i * 0.002);
    }
    ops += 4000;
  }
  const elapsed = Math.max(1, performance.now() - start);
  return { opsPerMs: Math.round(ops / elapsed), checksum: Math.round(acc) };
}

function mapCpuId(cores, opsPerMs) {
  if (cores >= 20 || (cores >= 16 && opsPerMs > 1800)) return 'cpu-12c';
  if (cores >= 14) return 'cpu-8c';
  if (cores >= 10) return 'cpu-6c';
  if (cores >= 6) return 'cpu-4c';
  return 'cpu-2c';
}

export async function detectHardware() {
  const webgl = getWebGLInfo();
  const webgpu = await getWebGPUInfo();
  const rawRenderer = webgl.renderer || webgpu.description || '';
  const cleanedRenderer = cleanRendererName(rawRenderer);
  const gpu = matchGpuFromString(cleanedRenderer || rawRenderer);

  let os = detectOs();
  if (os === 'macos_arm' && /Intel/i.test(rawRenderer)) {
    os = 'macos_intel';
  }

  const cores = navigator.hardwareConcurrency || 4;
  const micro = runQuickCpuMicroBench(60);
  const cpuId = mapCpuId(cores, micro.opsPerMs);

  const browserDeviceMemory = navigator.deviceMemory || null;
  const ramInfo = inferRamFromGpu(browserDeviceMemory, gpu);

  // Unified memory Macs report unified pool; adjust default VRAM proportionally
  let vramGb = gpu.vram;
  if (gpu.unified && gpu.vendor === 'Apple') {
    vramGb = Math.max(4, Math.round(ramInfo.ramGb * 0.65));
  }

  return {
    os,
    cpuId,
    cores,
    gpuId: gpu.id,
    vramGb,
    ramGb: ramInfo.ramGb,
    ramInferred: ramInfo.inferred,
    browserDeviceMemory,
    diskId: gpu.tier >= 5 || os === 'macos_arm' ? 'nvme' : 'sata',
    ideId: ramInfo.ramGb >= 16 ? 'rider' : 'vscode',
    rawRenderer: cleanedRenderer || rawRenderer || 'WebGL Generic',
    webgl2: webgl.webgl2,
    webgpu: webgpu.supported,
    maxTextureSize: webgl.maxTextureSize,
    microOpsPerMs: micro.opsPerMs
  };
}

export async function runStressBenchmark(onProgress) {
  const report = {
    gpuFps: 0,
    cpuScore: 0,
    suggestedGpuTierBoost: 0,
    suggestedCpuTierBoost: 0
  };

  // Phase 1: 1.5s WebGL2 fragment shader stress
  onProgress?.('gpu', 15);
  await new Promise((r) => setTimeout(r, 30));

  try {
    const canvas = document.createElement('canvas');
    canvas.width = 720;
    canvas.height = 480;
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (gl) {
      const vsSrc = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.0,1.0); }`;
      const fsSrc = `
        precision mediump float;
        uniform float u_t;
        void main(){
          vec2 uv = gl_FragCoord.xy / vec2(720.0, 480.0);
          float v = 0.0;
          for(int i = 0; i < 24; i++){
            float fi = float(i);
            v += sin(uv.x * 12.0 + u_t + fi) * cos(uv.y * 12.0 - u_t * 0.7 + fi);
          }
          gl_FragColor = vec4(0.5 + 0.5 * sin(v), 0.5 + 0.5 * cos(v), 0.7, 1.0);
        }`;
      const compile = (type, src) => {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return s;
      };
      const prog = gl.createProgram();
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, vsSrc));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fsSrc));
      gl.linkProgram(prog);
      gl.useProgram(prog);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, 'p');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      const uT = gl.getUniformLocation(prog, 'u_t');

      let frames = 0;
      const t0 = performance.now();
      while (performance.now() - t0 < 1200) {
        gl.uniform1f(uT, frames * 0.05);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        gl.finish();
        frames++;
        if (frames % 20 === 0) {
          onProgress?.('gpu', Math.min(50, 15 + Math.round(((performance.now() - t0) / 1200) * 35)));
          await new Promise((r) => setTimeout(r, 0));
        }
      }
      const elapsedSec = Math.max(0.1, (performance.now() - t0) / 1000);
      report.gpuFps = Math.round(frames / elapsedSec);
    }
  } catch {
    report.gpuFps = 60;
  }

  // Phase 2: 1.5s C#-style AST & Matrix CPU stress
  onProgress?.('cpu', 60);
  const cpuStart = performance.now();
  let iterations = 0;
  let sink = 0;
  while (performance.now() - cpuStart < 1200) {
    for (let i = 0; i < 20000; i++) {
      const a = (i * 1.6180339) % 97;
      sink += Math.sqrt(a * a + 13.37) * Math.tanh(a * 0.05);
    }
    iterations++;
    if (iterations % 10 === 0) {
      onProgress?.('cpu', Math.min(98, 60 + Math.round(((performance.now() - cpuStart) / 1200) * 38)));
      await new Promise((r) => setTimeout(r, 0));
    }
  }
  const cpuElapsed = Math.max(0.1, (performance.now() - cpuStart) / 1000);
  report.cpuScore = Math.round((iterations * 20) / cpuElapsed) + (sink > 0 ? 0 : 0);

  if (report.gpuFps >= 180) report.suggestedGpuTierBoost = 1;
  if (report.cpuScore >= 2200) report.suggestedCpuTierBoost = 1;

  onProgress?.('done', 100);
  return report;
}

export function getCpuMeta(cpuId) {
  return CPUS.find((c) => c.id === cpuId) || CPUS[1];
}
