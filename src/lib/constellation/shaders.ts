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

    // Depth fade: far nodes slightly dimmer
    vDepthFade = clamp(1.0 - (dist - 4.0) / 30.0, 0.3, 1.0);

    // Point size: in-focus nodes are small bright dots, out-of-focus are large bokeh
    float focusedSize = aSize * uResolution.y * 0.004;
    float bokehSize = aSize * uResolution.y * 0.06;
    float pointSize = mix(focusedSize, bokehSize, coc);

    // Perspective scaling
    float perspective = 8.0 / max(dist, 0.1);
    gl_PointSize = clamp(pointSize * perspective, 2.0, 128.0);

    // Per-node pulse
    float pulse = uPulseMin + (uPulseMax - uPulseMin) * (0.5 + 0.5 * sin(uTime * 1.5 + aPhase));
    vPulse = pulse;

    vColor = aColor;
  }
`;

// Node fragment shader: sharp core for in-focus, soft gaussian for bokeh
export const nodeFragmentShader = `
  precision mediump float;

  varying vec3 vColor;
  varying float vBlur;
  varying float vPulse;
  varying float vDepthFade;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);

    // In-focus: tight bright core. Out-of-focus: wide soft glow
    float sharpSigma = 0.08;
    float softSigma = 0.28;
    float sigma = mix(sharpSigma, softSigma, vBlur);

    float alpha = exp(-dist * dist / (2.0 * sigma * sigma));

    // Bright core for in-focus nodes
    float coreSigma = 0.03;
    float core = exp(-dist * dist / (2.0 * coreSigma * coreSigma));
    float coreStrength = (1.0 - vBlur) * 0.6;

    // Out-of-focus nodes: dimmer but larger
    float brightness = mix(1.0, 0.4, vBlur);

    vec3 color = vColor * vPulse * brightness * vDepthFade;
    float finalAlpha = (alpha + core * coreStrength) * vDepthFade * vPulse * brightness;

    // Boost in-focus node brightness
    color += vColor * core * coreStrength * 0.5;

    if (finalAlpha < 0.005) discard;

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

    float depthFade = clamp(1.0 - (dist - 4.0) / 30.0, 0.1, 1.0);
    float focusFade = mix(1.0, 0.15, coc);

    float alpha = aAlpha * depthFade * focusFade;

    vColor = vec4(uLineColor * depthFade, alpha);
  }
`;

// Line fragment shader
export const lineFragmentShader = `
  precision mediump float;

  varying vec4 vColor;

  void main() {
    if (vColor.a < 0.005) discard;
    gl_FragColor = vColor;
  }
`;
