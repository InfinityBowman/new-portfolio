// Node vertex shader: depth-of-field bokeh — sharp at focal plane, large/soft near+far
export const nodeVertexShader = `
  attribute vec3 aPosition;
  attribute vec3 aColor;
  attribute float aSize;
  attribute float aPhase;

  uniform mat4 uProjection;
  uniform mat4 uModelView;
  uniform float uTime;
  uniform float uPulseMin;
  uniform float uPulseMax;
  uniform vec2 uResolution;
  uniform float uFocalDistance;
  uniform float uDofStrength;

  varying vec3 vColor;
  varying float vBlur;
  varying float vPulse;
  varying float vDepthFade;

  void main() {
    vec4 mvPosition = uModelView * vec4(aPosition, 1.0);
    gl_Position = uProjection * mvPosition;

    // Distance from camera
    float dist = -mvPosition.z;

    // Circle of confusion: 0 at focal plane, grows with distance from it
    float coc = abs(dist - uFocalDistance) / uFocalDistance * uDofStrength;
    coc = clamp(coc, 0.0, 1.0);
    vBlur = coc;

    // Depth fade: far nodes dimmer, near nodes brighter
    vDepthFade = clamp(1.0 - (dist - 3.0) / 35.0, 0.2, 1.0);

    // Point size: in-focus nodes are small bright dots, out-of-focus are large bokeh
    float focusedSize = aSize * uResolution.y * 0.0035;
    float bokehSize = aSize * uResolution.y * 0.08;
    float pointSize = mix(focusedSize, bokehSize, coc);

    // Perspective scaling
    float perspective = 8.0 / max(dist, 0.1);
    gl_PointSize = clamp(pointSize * perspective, 1.5, 220.0);

    // Per-node pulse (slower, subtler)
    float pulse = uPulseMin + (uPulseMax - uPulseMin) * (0.5 + 0.5 * sin(uTime * 1.0 + aPhase));
    vPulse = pulse;

    vColor = aColor;
  }
`;

// Node fragment shader: sharp core for in-focus, soft bokeh disc for out-of-focus
export const nodeFragmentShader = `
  precision mediump float;

  varying vec3 vColor;
  varying float vBlur;
  varying float vPulse;
  varying float vDepthFade;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);

    // Circular mask — hard cutoff at point boundary
    if (dist > 0.5) discard;

    // In-focus: tight bright core. Out-of-focus: wide soft glow
    float sharpSigma = 0.07;
    float softSigma = 0.32;
    float sigma = mix(sharpSigma, softSigma, vBlur);

    float alpha = exp(-dist * dist / (2.0 * sigma * sigma));

    // Bright core for in-focus nodes
    float coreSigma = 0.025;
    float core = exp(-dist * dist / (2.0 * coreSigma * coreSigma));
    float coreStrength = (1.0 - vBlur) * 0.7;

    // Subtle bokeh ring on out-of-focus particles
    float ringDist = abs(dist - 0.35);
    float ring = exp(-ringDist * ringDist / (2.0 * 0.06 * 0.06)) * 0.15 * vBlur;

    // Out-of-focus nodes: dimmer but larger
    float brightness = mix(1.0, 0.35, vBlur);

    vec3 color = vColor * vPulse * brightness * vDepthFade;
    float finalAlpha = (alpha + core * coreStrength + ring) * vDepthFade * vPulse * brightness;

    // Boost in-focus node brightness
    color += vColor * core * coreStrength * 0.5;

    // Smooth circular edge fade
    float edgeFade = 1.0 - smoothstep(0.38, 0.5, dist);
    finalAlpha *= edgeFade;

    if (finalAlpha < 0.003) discard;

    gl_FragColor = vec4(color, finalAlpha);
  }
`;

// Line vertex shader
export const lineVertexShader = `
  attribute vec3 aPosition;
  attribute float aAlpha;

  uniform mat4 uProjection;
  uniform mat4 uModelView;
  uniform vec3 uLineColor;
  uniform float uFocalDistance;
  uniform float uDofStrength;

  varying vec4 vColor;

  void main() {
    vec4 mvPosition = uModelView * vec4(aPosition, 1.0);
    gl_Position = uProjection * mvPosition;

    float dist = -mvPosition.z;

    // Lines also blur/fade with depth-of-field
    float coc = abs(dist - uFocalDistance) / uFocalDistance * uDofStrength;
    coc = clamp(coc, 0.0, 1.0);

    float depthFade = clamp(1.0 - (dist - 4.0) / 30.0, 0.15, 1.0);
    float focusFade = mix(1.0, 0.1, coc);

    float alpha = aAlpha * depthFade * focusFade;

    vColor = vec4(uLineColor * depthFade, alpha);
  }
`;

// Line fragment shader
export const lineFragmentShader = `
  precision mediump float;

  varying vec4 vColor;

  void main() {
    if (vColor.a < 0.003) discard;
    gl_FragColor = vColor;
  }
`;
