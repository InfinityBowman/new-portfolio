import { ConstellationConfig, ConstellationNode } from './types';

// ---- 3D Simplex Noise (public domain, Stefan Gustavson) ----
const grad3 = [
  [1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
  [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
  [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1],
];

const perm = new Uint8Array(512);
const permMod12 = new Uint8Array(512);

(function initPerm() {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  // Fisher-Yates with seeded pseudo-random
  let seed = 42;
  for (let i = 255; i > 0; i--) {
    seed = (seed * 16807 + 0) % 2147483647;
    const j = seed % (i + 1);
    const tmp = p[i]; p[i] = p[j]; p[j] = tmp;
  }
  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255];
    permMod12[i] = perm[i] % 12;
  }
})();

const F3 = 1.0 / 3.0;
const G3 = 1.0 / 6.0;

function simplex3(x: number, y: number, z: number): number {
  const s = (x + y + z) * F3;
  const i = Math.floor(x + s);
  const j = Math.floor(y + s);
  const k = Math.floor(z + s);
  const t = (i + j + k) * G3;
  const X0 = i - t, Y0 = j - t, Z0 = k - t;
  const x0 = x - X0, y0 = y - Y0, z0 = z - Z0;

  let i1: number, j1: number, k1: number;
  let i2: number, j2: number, k2: number;

  if (x0 >= y0) {
    if (y0 >= z0)      { i1=1;j1=0;k1=0;i2=1;j2=1;k2=0; }
    else if (x0 >= z0) { i1=1;j1=0;k1=0;i2=1;j2=0;k2=1; }
    else               { i1=0;j1=0;k1=1;i2=1;j2=0;k2=1; }
  } else {
    if (y0 < z0)       { i1=0;j1=0;k1=1;i2=0;j2=1;k2=1; }
    else if (x0 < z0)  { i1=0;j1=1;k1=0;i2=0;j2=1;k2=1; }
    else               { i1=0;j1=1;k1=0;i2=1;j2=1;k2=0; }
  }

  const x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3;
  const x2 = x0 - i2 + 2*G3, y2 = y0 - j2 + 2*G3, z2 = z0 - k2 + 2*G3;
  const x3 = x0 - 1 + 3*G3, y3 = y0 - 1 + 3*G3, z3 = z0 - 1 + 3*G3;

  const ii = i & 255, jj = j & 255, kk = k & 255;

  let n0 = 0, n1 = 0, n2 = 0, n3 = 0;

  let t0 = 0.6 - x0*x0 - y0*y0 - z0*z0;
  if (t0 > 0) { t0 *= t0; const gi = permMod12[ii+perm[jj+perm[kk]]]; n0 = t0*t0*(grad3[gi][0]*x0+grad3[gi][1]*y0+grad3[gi][2]*z0); }

  let t1 = 0.6 - x1*x1 - y1*y1 - z1*z1;
  if (t1 > 0) { t1 *= t1; const gi = permMod12[ii+i1+perm[jj+j1+perm[kk+k1]]]; n1 = t1*t1*(grad3[gi][0]*x1+grad3[gi][1]*y1+grad3[gi][2]*z1); }

  let t2 = 0.6 - x2*x2 - y2*y2 - z2*z2;
  if (t2 > 0) { t2 *= t2; const gi = permMod12[ii+i2+perm[jj+j2+perm[kk+k2]]]; n2 = t2*t2*(grad3[gi][0]*x2+grad3[gi][1]*y2+grad3[gi][2]*z2); }

  let t3 = 0.6 - x3*x3 - y3*y3 - z3*z3;
  if (t3 > 0) { t3 *= t3; const gi = permMod12[ii+1+perm[jj+1+perm[kk+1]]]; n3 = t3*t3*(grad3[gi][0]*x3+grad3[gi][1]*y3+grad3[gi][2]*z3); }

  return 32.0 * (n0 + n1 + n2 + n3);
}

// ---- Node creation and simulation ----

function pickColor(config: ConstellationConfig): { r: number; g: number; b: number } {
  const rand = Math.random();
  let cumulative = 0;
  for (const color of config.colors) {
    cumulative += color.weight;
    if (rand <= cumulative) {
      return { r: color.r, g: color.g, b: color.b };
    }
  }
  const last = config.colors[config.colors.length - 1];
  return { r: last.r, g: last.g, b: last.b };
}

export function createNodes(config: ConstellationConfig): ConstellationNode[] {
  const nodes: ConstellationNode[] = [];
  for (let i = 0; i < config.nodeCount; i++) {
    // Distribute in spherical volume (uniform distribution)
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = config.sphereRadius * Math.cbrt(Math.random());

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    const color = pickColor(config);

    nodes.push({
      baseX: x,
      baseY: y,
      baseZ: z,
      x, y, z,
      colorR: color.r,
      colorG: color.g,
      colorB: color.b,
      phase: Math.random() * Math.PI * 2,
      size: 0.5 + Math.random() * 1.0,
    });
  }
  return nodes;
}

export function updateNodes(nodes: ConstellationNode[], time: number, config: ConstellationConfig): void {
  const scale = config.noiseScale;
  const speed = config.noiseSpeed;
  const t = time * speed;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const nx = node.baseX * scale;
    const ny = node.baseY * scale;
    const nz = node.baseZ * scale;

    node.x = node.baseX + simplex3(nx + t, ny, nz) * 0.6;
    node.y = node.baseY + simplex3(nx, ny + t, nz) * 0.6;
    node.z = node.baseZ + simplex3(nx, ny, nz + t) * 0.6;
  }
}

export interface ConnectionResult {
  linePositions: Float32Array;
  lineAlphas: Float32Array;
  lineCount: number;
}

export function computeConnections(nodes: ConstellationNode[], config: ConstellationConfig): ConnectionResult {
  const maxDist = config.connectionDistance;
  const maxDistSq = maxDist * maxDist;
  const maxConns = config.maxConnectionsPerNode;

  // Count connections per node
  const connCount = new Uint8Array(nodes.length);

  // Pre-allocate for worst case
  const maxLines = (nodes.length * maxConns) / 2;
  const positions = new Float32Array(maxLines * 6); // 2 vertices * 3 components
  const alphas = new Float32Array(maxLines * 2);    // 2 vertices * 1 alpha
  let lineIdx = 0;

  for (let i = 0; i < nodes.length; i++) {
    if (connCount[i] >= maxConns) continue;
    const a = nodes[i];

    for (let j = i + 1; j < nodes.length; j++) {
      if (connCount[j] >= maxConns) continue;

      const dx = a.x - nodes[j].x;
      const dy = a.y - nodes[j].y;
      const dz = a.z - nodes[j].z;
      const distSq = dx * dx + dy * dy + dz * dz;

      if (distSq < maxDistSq) {
        const dist = Math.sqrt(distSq);
        const alpha = (1.0 - dist / maxDist) * 0.5;

        const b = nodes[j];
        const pi = lineIdx * 6;
        positions[pi]     = a.x;
        positions[pi + 1] = a.y;
        positions[pi + 2] = a.z;
        positions[pi + 3] = b.x;
        positions[pi + 4] = b.y;
        positions[pi + 5] = b.z;

        const ai = lineIdx * 2;
        alphas[ai]     = alpha;
        alphas[ai + 1] = alpha;

        lineIdx++;
        connCount[i]++;
        connCount[j]++;

        if (connCount[i] >= maxConns) break;
      }
    }
  }

  return {
    linePositions: positions.subarray(0, lineIdx * 6),
    lineAlphas: alphas.subarray(0, lineIdx * 2),
    lineCount: lineIdx,
  };
}
