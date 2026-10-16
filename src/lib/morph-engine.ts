// Motor WebGL do MorphSlider: carrega as imagens como texturas e anima a
// transição entre elas com um shader (melt, ripple, shear ou swirl).
import { Renderer, Triangle, Program, Mesh, Texture } from 'ogl';

const TRANSITIONS = { melt: 0, ripple: 1, shear: 2, swirl: 3 } as const;

export interface MorphOptions {
  transition: keyof typeof TRANSITIONS;
  duration: number;
  intensity: number;
  scale: number;
  aberration: number;
  drift: number;
  loop: boolean;
  overlayColor: string;
}

interface EngineConfig {
  images: string[];
  options: MorphOptions;
  reducedMotion: boolean;
  onIndexChange: (index: number) => void;
  startIndex?: number;
  dprCap?: number;
}

const vertex = /* glsl */ `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = /* glsl */ `
precision highp float;

uniform sampler2D tCurrent;
uniform sampler2D tNext;
uniform vec2 uResolution;
uniform vec2 uCurrentSize;
uniform vec2 uNextSize;
uniform float uProgress;
uniform float uDir;
uniform int uMode;
uniform float uIntensity;
uniform float uScale;
uniform float uAberration;
uniform float uDrift;
uniform float uTime;
uniform float uReduce;
uniform vec2 uPointer;
uniform vec3 uOverlay;

varying vec2 vUv;

const float PI = 3.14159265359;

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

mat2 rot(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

vec2 coverUV(vec2 uv, vec2 res, vec2 img) {
  float rA = res.x / max(res.y, 1.0);
  float iA = img.x / max(img.y, 1.0);
  vec2 s = vec2(1.0);
  float ratio = rA / max(iA, 0.0001);
  if (ratio > 1.0) {
    s.y = 1.0 / ratio;
  } else {
    s.x = ratio;
  }
  return (uv - 0.5) * s + 0.5;
}

void main() {
  float p = clamp(uProgress, 0.0, 1.0);
  float env = sin(p * PI);

  vec2 uv = vUv;

  uv += vec2(sin(uTime * 0.25 + uv.y * 4.0), cos(uTime * 0.22 + uv.x * 4.0)) * uDrift * 0.008;
  uv = (uv - 0.5) * (1.0 - uDrift * 0.02 * sin(uTime * 0.4)) + 0.5;

  vec2 uvC = uv;
  vec2 uvN = uv;
  float m = smoothstep(0.0, 1.0, p);

  if (uReduce < 0.5) {
    if (uMode == 3) {
      vec2 c = uv - 0.5;
      float r = length(c);
      float ang = env * uIntensity * 3.5 * (1.0 - r);
      uvC = rot(ang) * c + 0.5;
      uvN = rot(-ang) * c + 0.5;
      m = smoothstep(0.0, 1.0, p);
    } else if (uMode == 1) {
      float d = distance(uv, uPointer);
      float ring = p * 1.6;
      float wave = sin((d - ring) * 30.0) * env;
      vec2 dir = normalize(uv - uPointer + 1e-4);
      vec2 disp = dir * wave * uIntensity * 0.25;
      uvC = uv + disp;
      uvN = uv + disp * 0.6;
      m = 1.0 - smoothstep(ring - 0.03, ring + 0.03, d);
    } else if (uMode == 2) {
      float slices = 14.0;
      float row = floor(uv.y * slices);
      float rnd = hash11(row);
      vec2 disp = vec2((rnd - 0.5) * env * uIntensity * 0.6, 0.0);
      uvC = uv + disp;
      uvN = uv + disp;
      float localX = uDir > 0.0 ? uv.x : 1.0 - uv.x;
      float th = p * 1.5 - 0.25 + (rnd - 0.5) * 0.25;
      m = 1.0 - smoothstep(th - 0.06, th + 0.06, localX);
    } else {
      float nn = fbm(uv * uScale + uTime * 0.03);
      float warp = fbm(uv * uScale * 1.7 - uTime * 0.02);
      vec2 g = vec2(nn, warp) - 0.5;
      uvC = uv + g * uIntensity * 0.5 * p;
      uvN = uv - g * uIntensity * 0.5 * (1.0 - p);
      m = smoothstep(nn - 0.15, nn + 0.15, p);
    }
  }

  vec2 sC = coverUV(uvC, uResolution, uCurrentSize);
  vec2 sN = coverUV(uvN, uResolution, uNextSize);

  float ca = uReduce < 0.5 ? uAberration * env * 0.03 : 0.0;

  vec3 colC = vec3(
    texture2D(tCurrent, sC + vec2(ca, 0.0)).r,
    texture2D(tCurrent, sC).g,
    texture2D(tCurrent, sC - vec2(ca, 0.0)).b
  );
  vec3 colN = vec3(
    texture2D(tNext, sN + vec2(ca, 0.0)).r,
    texture2D(tNext, sN).g,
    texture2D(tNext, sN - vec2(ca, 0.0)).b
  );

  vec3 col = mix(colC, colN, m);

  float vig = smoothstep(1.25, 0.25, length(uv - 0.5));
  col = mix(col, uOverlay, (1.0 - vig) * 0.28);

  gl_FragColor = vec4(col, 1.0);
}
`;

const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);

/** Anima obj.value de `from` até `to`. Retorna uma função que cancela a animação. */
function tween(
  obj: { value: number },
  from: number,
  to: number,
  duration: number,
  ease: (t: number) => number,
  onComplete: () => void,
): () => void {
  const start = performance.now();
  let raf = 0;
  const step = (now: number) => {
    const t = Math.min((now - start) / (duration * 1000), 1);
    obj.value = from + (to - from) * ease(t);
    if (t < 1) raf = requestAnimationFrame(step);
    else onComplete();
  };
  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}

function hexToRgb(hex: string): [number, number, number] {
  let h = (hex || '#000000').replace('#', '');
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  const n = parseInt(h, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export class MorphEngine {
  private container: HTMLElement;
  private images: string[];
  private options: MorphOptions;
  private reducedMotion: boolean;
  private onIndexChange: (index: number) => void;

  private renderer: Renderer;
  private gl: Renderer['gl'];
  private program: Program;
  private mesh: Mesh;
  private textures: Texture[];
  private sizes: [number, number][];
  private resizeObserver: ResizeObserver;
  private raf = 0;
  private cancelTween: (() => void) | null = null;

  private current: number;
  private shownIndex: number;
  private animating = false;
  private dragging = false;
  private dragDir = 0;

  constructor(container: HTMLElement, config: EngineConfig) {
    this.container = container;
    this.images = config.images;
    this.options = config.options;
    this.reducedMotion = config.reducedMotion;
    this.onIndexChange = config.onIndexChange;
    this.current = this.shownIndex = config.startIndex ?? 0;

    this.renderer = new Renderer({
      alpha: false,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, config.dprCap ?? 2),
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0.05, 0.05, 0.06, 1);

    const canvas = this.gl.canvas as HTMLCanvasElement;
    canvas.className = 'morph-slider-canvas';
    container.appendChild(canvas);
    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      cancelAnimationFrame(this.raf);
    });

    this.textures = this.images.map(() => this.fallbackTexture());
    this.sizes = this.images.map(() => [1, 1]);

    const opts = this.options;
    this.program = new Program(this.gl, {
      vertex,
      fragment,
      uniforms: {
        tCurrent: { value: this.textures[this.current] },
        tNext: { value: this.textures[this.current] },
        uResolution: { value: [1, 1] },
        uCurrentSize: { value: this.sizes[this.current] },
        uNextSize: { value: this.sizes[this.current] },
        uProgress: { value: 0 },
        uDir: { value: 1 },
        uMode: { value: TRANSITIONS[opts.transition] ?? 0 },
        uIntensity: { value: opts.intensity },
        uScale: { value: opts.scale },
        uAberration: { value: opts.aberration },
        uDrift: { value: opts.drift },
        uTime: { value: 0 },
        uReduce: { value: this.reducedMotion ? 1 : 0 },
        uPointer: { value: [0.5, 0.5] },
        uOverlay: { value: hexToRgb(opts.overlayColor) },
      },
    });
    this.mesh = new Mesh(this.gl, { geometry: new Triangle(this.gl), program: this.program });

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    this.resize();
    this.loadTextures();

    const loop = (t: number) => {
      this.program.uniforms.uTime.value = t * 0.001;
      this.renderer.render({ scene: this.mesh });
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  private get u() {
    return this.program.uniforms;
  }

  private fallbackTexture() {
    const size = 4;
    const data = new Uint8Array(size * size * 4);
    for (let i = 0; i < size * size; i++) data.set([24, 24, 28, 255], i * 4);
    return new Texture(this.gl, { image: data, width: size, height: size, generateMipmaps: false });
  }

  private loadTextures() {
    this.images.forEach((src, index) => {
      const img = new Image();
      if (/^https?:\/\//.test(src) && !src.startsWith(location.origin)) img.crossOrigin = 'anonymous';
      img.onload = () => {
        const texture = new Texture(this.gl, { image: img, generateMipmaps: false });
        this.textures[index] = texture;
        this.sizes[index] = [img.naturalWidth || 1200, img.naturalHeight || 800];
        if (index === this.current && !this.animating && !this.dragging) {
          this.u.tCurrent.value = texture;
          this.u.uCurrentSize.value = this.sizes[index];
          this.u.tNext.value = texture;
          this.u.uNextSize.value = this.sizes[index];
        }
      };
      img.onerror = () => console.warn('MorphSlider: falha ao carregar imagem', src);
      img.src = src;
    });
  }

  private resize() {
    const rect = this.container.getBoundingClientRect();
    this.renderer.setSize(Math.max(rect.width, 100), Math.max(rect.height, 100));
    this.u.uResolution.value = [this.gl.canvas.width, this.gl.canvas.height];
  }

  private wrap(i: number) {
    const n = this.images.length;
    return ((i % n) + n) % n;
  }

  private canMove(dir: number) {
    if (this.options.loop) return true;
    const raw = this.current + dir;
    return raw >= 0 && raw <= this.images.length - 1;
  }

  private prepareNext(dir: number) {
    const target = this.wrap(this.current + dir);
    this.u.tCurrent.value = this.textures[this.current];
    this.u.uCurrentSize.value = this.sizes[this.current];
    this.u.tNext.value = this.textures[target];
    this.u.uNextSize.value = this.sizes[target];
    this.u.uDir.value = dir;
    return target;
  }

  private announce(index: number) {
    if (index === this.shownIndex) return;
    this.shownIndex = index;
    this.onIndexChange(index);
  }

  private commit(target: number) {
    this.current = target;
    this.u.tCurrent.value = this.textures[target];
    this.u.uCurrentSize.value = this.sizes[target];
    this.u.uProgress.value = 0;
    this.animating = false;
    this.cancelTween = null;
    this.announce(target);
  }

  goTo(dir: number) {
    if (this.animating || this.dragging || this.images.length < 2 || !this.canMove(dir)) return;
    const target = this.prepareNext(dir);
    this.animating = true;
    this.announce(target);
    const duration = this.reducedMotion ? Math.min(this.options.duration, 0.4) : this.options.duration;
    this.cancelTween = tween(this.u.uProgress, 0, 1, duration, easeInOutQuad, () => this.commit(target));
  }

  next() {
    this.goTo(1);
  }

  prev() {
    this.goTo(-1);
  }

  setPointer(x: number, y: number) {
    this.u.uPointer.value = [x, y];
  }

  beginDrag() {
    if (this.animating || this.images.length < 2) return false;
    this.dragging = true;
    this.dragDir = 0;
    return true;
  }

  drag(ndx: number) {
    if (!this.dragging) return;
    const dir = ndx < 0 ? 1 : -1;
    if (!this.canMove(dir)) {
      this.u.uProgress.value = 0;
      return;
    }
    if (dir !== this.dragDir) {
      this.dragDir = dir;
      this.prepareNext(dir);
    }
    const progress = Math.min(Math.abs(ndx), 1);
    this.u.uProgress.value = progress;
    this.announce(progress > 0.5 ? this.wrap(this.current + dir) : this.current);
  }

  endDrag() {
    if (!this.dragging) return;
    this.dragging = false;
    if (this.dragDir === 0) return;
    const p = this.u.uProgress.value as number;
    const target = this.wrap(this.current + this.dragDir);
    const duration = this.reducedMotion ? 0.3 : 0.5;
    this.animating = true;
    if (p > 0.4) {
      this.announce(target);
      this.cancelTween = tween(this.u.uProgress, p, 1, duration, easeOutQuad, () => this.commit(target));
    } else {
      this.announce(this.current);
      this.cancelTween = tween(this.u.uProgress, p, 0, duration, easeOutQuad, () => {
        this.animating = false;
        this.cancelTween = null;
      });
    }
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    this.cancelTween?.();
    this.resizeObserver.disconnect();
    this.gl.getExtension('WEBGL_lose_context')?.loseContext();
    this.gl.canvas.remove();
  }
}
