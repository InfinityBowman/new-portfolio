export interface ConstellationConfig {
  nodeCount: number;
  sphereRadius: number;
  connectionDistance: number;
  maxConnectionsPerNode: number;
  cameraFov: number;
  cameraDistance: number;
  rotationSpeed: number;
  noiseScale: number;
  noiseSpeed: number;
  colors: NodeColor[];
  focalDistance: number;
  dofStrength: number;
  pulseMin: number;
  pulseMax: number;
  bgColor: [number, number, number];
  lineColor: [number, number, number];
}

export interface NodeColor {
  r: number;
  g: number;
  b: number;
  weight: number;
}

export interface ConstellationNode {
  baseX: number;
  baseY: number;
  baseZ: number;
  x: number;
  y: number;
  z: number;
  colorR: number;
  colorG: number;
  colorB: number;
  phase: number;
  size: number;
}

function hexToColor(hex: string, weight: number): NodeColor {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return { r, g, b, weight };
}

export const DEFAULT_CONFIG: ConstellationConfig = {
  nodeCount: 200,
  sphereRadius: 8,
  connectionDistance: 4.0,
  maxConnectionsPerNode: 8,
  cameraFov: 45,
  cameraDistance: 12,
  rotationSpeed: 0.03,
  noiseScale: 0.3,
  noiseSpeed: 0.15,
  colors: [
    hexToColor('#a78bfa', 0.30),  // light purple
    hexToColor('#8b5cf6', 0.25),  // purple
    hexToColor('#6366f1', 0.20),  // indigo
    hexToColor('#c084fc', 0.10),  // lavender/pink
    hexToColor('#f0abfc', 0.08),  // magenta/pink
    hexToColor('#60a5fa', 0.07),  // blue
  ],
  focalDistance: 12.0,
  dofStrength: 3.5,
  pulseMin: 0.85,
  pulseMax: 1.0,
  bgColor: [0.05, 0.02, 0.12],       // dark purple
  lineColor: [0.65, 0.55, 0.85],      // light lavender
};
