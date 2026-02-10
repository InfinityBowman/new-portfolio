import { ConstellationConfig } from './types';
import {
  nodeVertexShader, nodeFragmentShader,
  lineVertexShader, lineFragmentShader,
} from './shaders';
import { ConnectionResult } from './simulation';
import type { ConstellationNode } from './types';

// ---- Minimal matrix math ----
type Mat4 = Float32Array;

function createMat4(): Mat4 {
  return new Float32Array(16);
}

function perspective(fov: number, aspect: number, near: number, far: number): Mat4 {
  const out = createMat4();
  const f = 1.0 / Math.tan(fov / 2);
  const nf = 1 / (near - far);
  out[0] = f / aspect;
  out[5] = f;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[14] = 2 * far * near * nf;
  return out;
}

function lookAt(eye: number[], center: number[], up: number[]): Mat4 {
  const out = createMat4();
  let fx = center[0] - eye[0], fy = center[1] - eye[1], fz = center[2] - eye[2];
  let len = 1 / Math.sqrt(fx * fx + fy * fy + fz * fz);
  fx *= len; fy *= len; fz *= len;

  let sx = fy * up[2] - fz * up[1], sy = fz * up[0] - fx * up[2], sz = fx * up[1] - fy * up[0];
  len = 1 / Math.sqrt(sx * sx + sy * sy + sz * sz);
  sx *= len; sy *= len; sz *= len;

  const ux = sy * fz - sz * fy, uy = sz * fx - sx * fz, uz = sx * fy - sy * fx;

  out[0] = sx; out[1] = ux; out[2] = -fx; out[3] = 0;
  out[4] = sy; out[5] = uy; out[6] = -fy; out[7] = 0;
  out[8] = sz; out[9] = uz; out[10] = -fz; out[11] = 0;
  out[12] = -(sx * eye[0] + sy * eye[1] + sz * eye[2]);
  out[13] = -(ux * eye[0] + uy * eye[1] + uz * eye[2]);
  out[14] = -(-fx * eye[0] + -fy * eye[1] + -fz * eye[2]);
  out[15] = 1;
  return out;
}

// ---- Shader compilation ----
function compileShader(gl: WebGLRenderingContext, src: string, type: number): WebGLShader {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error('Shader compile error: ' + info);
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vsSrc: string, fsSrc: string): WebGLProgram {
  const vs = compileShader(gl, vsSrc, gl.VERTEX_SHADER);
  const fs = compileShader(gl, fsSrc, gl.FRAGMENT_SHADER);
  const program = gl.createProgram()!;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error('Program link error: ' + info);
  }
  return program;
}

// ---- Renderer state ----
export interface RendererState {
  gl: WebGLRenderingContext;
  nodeProgram: WebGLProgram;
  lineProgram: WebGLProgram;
  nodeBuffers: {
    position: WebGLBuffer;
    color: WebGLBuffer;
    size: WebGLBuffer;
    phase: WebGLBuffer;
  };
  lineBuffers: {
    position: WebGLBuffer;
    alpha: WebGLBuffer;
  };
  projectionMatrix: Mat4;
  config: ConstellationConfig;
}

export function initRenderer(canvas: HTMLCanvasElement, config: ConstellationConfig): RendererState | null {
  const gl = canvas.getContext('webgl', {
    alpha: false,
    antialias: true,
    premultipliedAlpha: false,
  });
  if (!gl) return null;

  // Additive blending for luminous glow
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

  const nodeProgram = createProgram(gl, nodeVertexShader, nodeFragmentShader);
  const lineProgram = createProgram(gl, lineVertexShader, lineFragmentShader);

  const nodeBuffers = {
    position: gl.createBuffer()!,
    color: gl.createBuffer()!,
    size: gl.createBuffer()!,
    phase: gl.createBuffer()!,
  };

  const lineBuffers = {
    position: gl.createBuffer()!,
    alpha: gl.createBuffer()!,
  };

  const aspect = canvas.width / canvas.height;
  const projectionMatrix = perspective(
    (config.cameraFov * Math.PI) / 180,
    aspect,
    0.1,
    100,
  );

  gl.clearColor(config.bgColor[0], config.bgColor[1], config.bgColor[2], 1.0);

  return {
    gl,
    nodeProgram,
    lineProgram,
    nodeBuffers,
    lineBuffers,
    projectionMatrix,
    config,
  };
}

export function resizeRenderer(state: RendererState, width: number, height: number): void {
  state.gl.viewport(0, 0, width, height);
  const aspect = width / height;
  state.projectionMatrix = perspective(
    (state.config.cameraFov * Math.PI) / 180,
    aspect,
    0.1,
    100,
  );
}

export function renderFrame(
  state: RendererState,
  nodes: ConstellationNode[],
  connections: ConnectionResult,
  time: number,
): void {
  const { gl, nodeProgram, lineProgram, nodeBuffers, lineBuffers, projectionMatrix, config } = state;

  gl.clear(gl.COLOR_BUFFER_BIT);

  // Camera orbits slowly
  const angle = time * config.rotationSpeed;
  const camX = Math.sin(angle) * config.cameraDistance;
  const camZ = Math.cos(angle) * config.cameraDistance;
  const modelView = lookAt([camX, 0, camZ], [0, 0, 0], [0, 1, 0]);

  // ---- Draw lines ----
  if (connections.lineCount > 0) {
    gl.useProgram(lineProgram);

    gl.uniformMatrix4fv(gl.getUniformLocation(lineProgram, 'uProjection'), false, projectionMatrix);
    gl.uniformMatrix4fv(gl.getUniformLocation(lineProgram, 'uModelView'), false, modelView);
    gl.uniform3f(gl.getUniformLocation(lineProgram, 'uLineColor'), config.lineColor[0], config.lineColor[1], config.lineColor[2]);
    gl.uniform1f(gl.getUniformLocation(lineProgram, 'uFocalDistance'), config.focalDistance);
    gl.uniform1f(gl.getUniformLocation(lineProgram, 'uDofStrength'), config.dofStrength);

    const lPosAttr = gl.getAttribLocation(lineProgram, 'aPosition');
    const lAlphaAttr = gl.getAttribLocation(lineProgram, 'aAlpha');

    gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffers.position);
    gl.bufferData(gl.ARRAY_BUFFER, connections.linePositions, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(lPosAttr);
    gl.vertexAttribPointer(lPosAttr, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffers.alpha);
    gl.bufferData(gl.ARRAY_BUFFER, connections.lineAlphas, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(lAlphaAttr);
    gl.vertexAttribPointer(lAlphaAttr, 1, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.LINES, 0, connections.lineCount * 2);

    gl.disableVertexAttribArray(lPosAttr);
    gl.disableVertexAttribArray(lAlphaAttr);
  }

  // ---- Draw nodes ----
  gl.useProgram(nodeProgram);

  gl.uniformMatrix4fv(gl.getUniformLocation(nodeProgram, 'uProjection'), false, projectionMatrix);
  gl.uniformMatrix4fv(gl.getUniformLocation(nodeProgram, 'uModelView'), false, modelView);
  gl.uniform1f(gl.getUniformLocation(nodeProgram, 'uTime'), time);
  gl.uniform1f(gl.getUniformLocation(nodeProgram, 'uPulseMin'), config.pulseMin);
  gl.uniform1f(gl.getUniformLocation(nodeProgram, 'uPulseMax'), config.pulseMax);
  gl.uniform2f(gl.getUniformLocation(nodeProgram, 'uResolution'), gl.canvas.width, gl.canvas.height);
  gl.uniform1f(gl.getUniformLocation(nodeProgram, 'uFocalDistance'), config.focalDistance);
  gl.uniform1f(gl.getUniformLocation(nodeProgram, 'uDofStrength'), config.dofStrength);

  const count = nodes.length;
  const posData = new Float32Array(count * 3);
  const colData = new Float32Array(count * 3);
  const sizeData = new Float32Array(count);
  const phaseData = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const n = nodes[i];
    posData[i * 3]     = n.x;
    posData[i * 3 + 1] = n.y;
    posData[i * 3 + 2] = n.z;
    colData[i * 3]     = n.colorR;
    colData[i * 3 + 1] = n.colorG;
    colData[i * 3 + 2] = n.colorB;
    sizeData[i] = n.size;
    phaseData[i] = n.phase;
  }

  const nPosAttr = gl.getAttribLocation(nodeProgram, 'aPosition');
  const nColAttr = gl.getAttribLocation(nodeProgram, 'aColor');
  const nSizeAttr = gl.getAttribLocation(nodeProgram, 'aSize');
  const nPhaseAttr = gl.getAttribLocation(nodeProgram, 'aPhase');

  gl.bindBuffer(gl.ARRAY_BUFFER, nodeBuffers.position);
  gl.bufferData(gl.ARRAY_BUFFER, posData, gl.DYNAMIC_DRAW);
  gl.enableVertexAttribArray(nPosAttr);
  gl.vertexAttribPointer(nPosAttr, 3, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, nodeBuffers.color);
  gl.bufferData(gl.ARRAY_BUFFER, colData, gl.DYNAMIC_DRAW);
  gl.enableVertexAttribArray(nColAttr);
  gl.vertexAttribPointer(nColAttr, 3, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, nodeBuffers.size);
  gl.bufferData(gl.ARRAY_BUFFER, sizeData, gl.DYNAMIC_DRAW);
  gl.enableVertexAttribArray(nSizeAttr);
  gl.vertexAttribPointer(nSizeAttr, 1, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, nodeBuffers.phase);
  gl.bufferData(gl.ARRAY_BUFFER, phaseData, gl.DYNAMIC_DRAW);
  gl.enableVertexAttribArray(nPhaseAttr);
  gl.vertexAttribPointer(nPhaseAttr, 1, gl.FLOAT, false, 0, 0);

  gl.drawArrays(gl.POINTS, 0, count);

  gl.disableVertexAttribArray(nPosAttr);
  gl.disableVertexAttribArray(nColAttr);
  gl.disableVertexAttribArray(nSizeAttr);
  gl.disableVertexAttribArray(nPhaseAttr);
}

export function cleanupRenderer(state: RendererState): void {
  const { gl, nodeProgram, lineProgram, nodeBuffers, lineBuffers } = state;
  gl.deleteBuffer(nodeBuffers.position);
  gl.deleteBuffer(nodeBuffers.color);
  gl.deleteBuffer(nodeBuffers.size);
  gl.deleteBuffer(nodeBuffers.phase);
  gl.deleteBuffer(lineBuffers.position);
  gl.deleteBuffer(lineBuffers.alpha);
  gl.deleteProgram(nodeProgram);
  gl.deleteProgram(lineProgram);
}
