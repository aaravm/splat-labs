"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  r: number;
  g: number;
  b: number;
  drift: number;
  phase: number;
}

const VERTEX_SHADER = `
  attribute vec3 aPosition;
  attribute vec3 aColor;
  attribute float aSize;
  attribute float aOpacity;
  uniform mat4 uMatrix;
  varying vec3 vColor;
  varying float vOpacity;
  void main() {
    vColor = aColor;
    vOpacity = aOpacity;
    vec4 pos = uMatrix * vec4(aPosition, 1.0);
    gl_Position = pos;
    gl_PointSize = aSize * (1.0 / -pos.z);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  varying vec3 vColor;
  varying float vOpacity;
  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    float alpha = smoothstep(0.5, 0.0, d) * vOpacity;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

type SplatCanvasProps = {
  className?: string;
  density?: number;
};

export default function SplatCanvas({
  className,
  density = 1400,
}: SplatCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const gl =
      (canvas.getContext("webgl", {
        antialias: false,
        alpha: true,
        premultipliedAlpha: true,
      }) as WebGLRenderingContext | null) ||
      (canvas.getContext(
        "experimental-webgl"
      ) as WebGLRenderingContext | null);

    if (!gl) return;

    // --- Shader setup ---
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const aPosition = gl.getAttribLocation(program, "aPosition");
    const aColor = gl.getAttribLocation(program, "aColor");
    const aSize = gl.getAttribLocation(program, "aSize");
    const aOpacity = gl.getAttribLocation(program, "aOpacity");
    const uMatrix = gl.getUniformLocation(program, "uMatrix");

    // --- Geometry ---
    const CYAN: [number, number, number] = [0.13, 0.83, 0.93];
    const VIOLET: [number, number, number] = [0.55, 0.36, 0.96];
    const BLUE: [number, number, number] = [0.5, 0.55, 0.97];

    const mixColor = (seed: number): [number, number, number] => {
      if (seed < 0.45) return CYAN;
      if (seed < 0.8) return VIOLET;
      return BLUE;
    };

    const makeParticles = (): Particle[] => {
      const count = Math.min(
        Math.floor((canvas.width * canvas.height) / 900),
        density
      );
      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const [r, g, b] = mixColor(Math.random());
        particles.push({
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
          z: Math.random() * 2.4 + 0.2,
          size: (Math.random() * 60 + 20) * 2,
          opacity: 0.25 + Math.random() * 0.5,
          r,
          g,
          b,
          drift: 0.1 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2,
        });
      }
      return particles;
    };

    let particles = makeParticles();
    let positions = new Float32Array(particles.length * 3);
    let colors = new Float32Array(particles.length * 3);
    let sizes = new Float32Array(particles.length);
    let opacities = new Float32Array(particles.length);

    const posBuf = gl.createBuffer();
    const colBuf = gl.createBuffer();
    const sizeBuf = gl.createBuffer();
    const opBuf = gl.createBuffer();

    const rebuildBuffers = () => {
      positions = new Float32Array(particles.length * 3);
      colors = new Float32Array(particles.length * 3);
      sizes = new Float32Array(particles.length);
      opacities = new Float32Array(particles.length);
    };

    const upload = () => {
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        positions,
        gl.DYNAMIC_DRAW
      );
      gl.enableVertexAttribArray(aPosition);
      gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, colBuf);
      gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(aColor);
      gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuf);
      gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(aSize);
      gl.vertexAttribPointer(aSize, 1, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, opBuf);
      gl.bufferData(gl.ARRAY_BUFFER, opacities, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(aOpacity);
      gl.vertexAttribPointer(aOpacity, 1, gl.FLOAT, false, 0, 0);
    };

    const fillArrays = (time: number, mouseX: number, mouseY: number) => {
      const invZ = 1 / 3400;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const wobble =
          Math.sin(time * p.drift + p.phase) *
          (0.05 + 0.08 * Math.abs(p.z - 1));
        const wobble2 =
          Math.cos(time * p.drift * 0.7 + p.phase * 1.3) * 0.05;
        const px = p.x + wobble + mouseX * p.z * 0.08;
        const py = p.y + wobble2 - mouseY * p.z * 0.08;
        const pz = p.z + wobble * 0.5;
        const c = pz;
        positions[i * 3] = px * invZ * 2000;
        positions[i * 3 + 1] = py * invZ * 2000;
        positions[i * 3 + 2] = -pz * 5;
        colors[i * 3] = p.r;
        colors[i * 3 + 1] = p.g;
        colors[i * 3 + 2] = p.b;
        sizes[i] = p.size * (pz * 0.5);
        opacities[i] = p.opacity * c * 0.5;
      }
    };

    const render = (time: number, mouseX: number, mouseY: number) => {
      const w = canvas.width;
      const h = canvas.height;
      gl.viewport(0, 0, w, h);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.disable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      const aspect = w / h;
      gl.uniformMatrix4fv(uMatrix, false, [
        1 / aspect,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
      ]);

      fillArrays(time, mouseX, mouseY);
      upload();
      gl.drawArrays(gl.POINTS, 0, particles.length);
    };

    // --- Mouse tracking ---
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("mousemove", onMouseMove);

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      targetMouseX = (t.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = (t.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("touchmove", onTouchMove, { passive: true });

    // --- Resize ---
    let animationFrame: number;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      particles = makeParticles();
      rebuildBuffers();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // --- Animation loop ---
    const start = performance.now();

    const tick = (now: number) => {
      const time = prefersReducedMotion ? 0 : (now - start) / 1000;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      render(time, mouseX * 0.5, mouseY * 0.5);
      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      ro.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(posBuf);
      gl.deleteBuffer(colBuf);
      gl.deleteBuffer(sizeBuf);
      gl.deleteBuffer(opBuf);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}