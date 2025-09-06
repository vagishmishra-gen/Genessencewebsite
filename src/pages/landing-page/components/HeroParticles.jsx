import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../../contexts/ThemeContext';

// HeroParticles
// Props:
// - intensity: number (0.5-2) scales movement force and velocity
// - particleCount: number (overrides responsive defaults)
// Notes: Subtle, professional particle field behind hero content.

const supportsWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
};

const useReducedMotion = () => {
  const mq = useMemo(
    () => (typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null),
    []
  );
  const [reduced, setReduced] = useState(mq ? mq.matches : false);
  useEffect(() => {
    if (!mq) return;
    const listener = () => setReduced(mq.matches);
    mq.addEventListener?.('change', listener);
    return () => mq.removeEventListener?.('change', listener);
  }, [mq]);
  return reduced;
};

const pickResponsiveCount = (explicitCount) => {
  if (typeof explicitCount === 'number') return explicitCount;
  const w = typeof window !== 'undefined' ? window.innerWidth : 1920;
  if (w < 360) return 0; // disable on very small screens
  if (w < 640) return 300; // sm
  if (w < 768) return 500; // md
  if (w < 1024) return 800; // lg-ish tablets
  return 1500; // desktop
};

const HeroParticles = ({ intensity = 1, particleCount }) => {
  const containerRef = useRef(null);
  const rafRef = useRef(0);
  const sceneRef = useRef();
  const rendererRef = useRef();
  const cameraRef = useRef();
  const geometryRef = useRef();
  const materialRef = useRef();
  const haloRef = useRef();
  const positionsRef = useRef();
  const velocitiesRef = useRef();
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const [count, setCount] = useState(() => pickResponsiveCount(particleCount));

  // FPS monitor for auto-throttle
  const lastTimesRef = useRef([]);
  const fpsThrottleRef = useRef(false);

  const setupThree = useCallback(() => {
    if (!containerRef.current) return false;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x0a0f1c, 0.0032);

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 2500);
    camera.position.set(0, 0, 380);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Geometry buffers
    const particleTotal = count;
    const positions = new Float32Array(particleTotal * 3);
    const velocities = new Float32Array(particleTotal * 3);
    const colors = new Float32Array(particleTotal * 3);
    positionsRef.current = positions;
    velocitiesRef.current = velocities;

    // Theme-aware color palette for cube animation
    const isDark = theme === 'dark';
    const colorA = new THREE.Color(isDark ? '#00d1ff' : '#004aad'); // bright cyan (dark) / deep blue (light)
    const colorB = new THREE.Color(isDark ? '#5de0e6' : '#00d1ff'); // light aqua (dark) / bright cyan (light)
    const colorC = new THREE.Color(isDark ? '#004aad' : '#5de0e6'); // deep blue (dark) / light aqua (light)
    const colorW = new THREE.Color('#ffffff');

    for (let i = 0; i < particleTotal; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * 1000;
      positions[i3 + 1] = (Math.random() - 0.5) * 500;
      positions[i3 + 2] = (Math.random() - 0.5) * 1000;

      const velScale = 0.25 * intensity; // Increased base velocity
      velocities[i3 + 0] = (Math.random() - 0.5) * velScale;
      velocities[i3 + 1] = (Math.random() - 0.5) * velScale;
      velocities[i3 + 2] = (Math.random() - 0.5) * velScale;

      const t = Math.random();
      const c = colorA
        .clone()
        .lerp(colorB, t)
        .lerp(colorC, 0.2 * Math.random())
        .lerp(colorW, 0.12); // slight white tint for pop
      colors[i3 + 0] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometryRef.current = geometry;

    // Shader-based soft points (no post-processing)
    const vertexShader = `
      attribute vec3 color;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = 4.5 * (300.0 / -mvPosition.z); // larger for better visibility
        gl_Position = projectionMatrix * mvPosition;
      }
    `;
    const fragmentShader = `
      precision mediump float;
      varying vec3 vColor;
      void main() {
        vec2 uv = gl_PointCoord - vec2(0.5);
        float d = length(uv);
        float alpha = smoothstep(0.5, 0.0, d); // soft edge
        vec3 col = vColor;
        gl_FragColor = vec4(col, alpha * 1.0); // Full opacity for better visibility
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    materialRef.current = material;

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Halo layer for bloom-like feel with theme-aware glow
    const haloMaterial = new THREE.PointsMaterial({
      size: 10, // Increased halo size
      color: new THREE.Color(isDark ? '#5de0e6' : '#00d1ff'), // Theme-aware glow color
      transparent: true,
      opacity: 0.2, // Increased opacity for better glow
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const halo = new THREE.Points(geometry, haloMaterial);
    haloRef.current = haloMaterial;
    scene.add(halo);

    // Fade-in
    renderer.domElement.style.opacity = '0';
    renderer.domElement.style.transition = 'opacity 2000ms ease-out';
    requestAnimationFrame(() => (renderer.domElement.style.opacity = '1'));

    return true;
  }, [count, intensity, theme]);

  const cleanupThree = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const renderer = rendererRef.current;
    const geometry = geometryRef.current;
    const material = materialRef.current;
    const halo = haloRef.current;
    if (renderer) {
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    }
    geometry && geometry.dispose();
    material && material.dispose();
    halo && halo.dispose();
    sceneRef.current = undefined;
    rendererRef.current = undefined;
    cameraRef.current = undefined;
    geometryRef.current = undefined;
    materialRef.current = undefined;
    haloRef.current = undefined;
  }, []);

  const animate = useCallback(() => {
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const geometry = geometryRef.current;
    const positions = positionsRef.current;
    const velocities = velocitiesRef.current;
    if (!renderer || !scene || !camera || !geometry || !positions || !velocities) return;

    // FPS monitor
    const now = performance.now();
    const history = lastTimesRef.current;
    history.push(now);
    while (history.length > 30) history.shift();
    if (history.length >= 2) {
      const fps = (history.length * 1000) / (history[history.length - 1] - history[0]);
      if (fps < 45 && !fpsThrottleRef.current && count > 200) {
        fpsThrottleRef.current = true;
        console.warn('[HeroParticles] Low FPS detected (~' + fps.toFixed(0) + '). Reducing particle count.');
        setCount((c) => Math.max(200, Math.floor(c * 0.75)));
        return; // Re-init on next effect
      }
    }

    const pos = geometry.attributes.position.array;
    const t = performance.now() * 0.00025 * intensity;

    // Pointer target in world-ish space
    const mx = mouseRef.current.x * 320;
    const my = mouseRef.current.y * 160;
    const radius = 150;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Organic drift
      pos[i3 + 0] += Math.sin(t + i) * 0.04 + velocities[i3 + 0];
      pos[i3 + 1] += Math.cos(t * 1.3 + i * 0.37) * 0.04 + velocities[i3 + 1];
      pos[i3 + 2] += Math.sin(t * 0.9 + i * 0.21) * 0.04 + velocities[i3 + 2];

      // Attraction/repulsion around mouse
      const dx = pos[i3 + 0] - mx;
      const dy = pos[i3 + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius) {
        const force = (radius - dist) / radius;
        pos[i3 + 0] += (dx / (dist + 0.0001)) * force * 2.2; // Increased attraction force
        pos[i3 + 1] += (dy / (dist + 0.0001)) * force * 2.2; // Increased attraction force
      }
      // Removed center pull logic to allow free flow of particles

      // Bounds clamp to keep in view volume
      pos[i3 + 0] = THREE.MathUtils.clamp(pos[i3 + 0], -1100, 1100);
      pos[i3 + 1] = THREE.MathUtils.clamp(pos[i3 + 1], -600, 600);
      pos[i3 + 2] = THREE.MathUtils.clamp(pos[i3 + 2], -1100, 1100);
    }
    geometry.attributes.position.needsUpdate = true;

    // Parallax camera follow
    camera.position.x += (mouseRef.current.x * 26 - camera.position.x) * 0.025;
    camera.position.y += (mouseRef.current.y * 13 - camera.position.y) * 0.025;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
    rafRef.current = requestAnimationFrame(animate);
  }, [count, intensity]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const onPointerMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }, []);

  const onResize = useCallback(() => {
    const renderer = rendererRef.current;
    const camera = cameraRef.current;
    if (!containerRef.current || !renderer || !camera) return;
    const w = containerRef.current.clientWidth;
    const h = containerRef.current.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }, []);

  useEffect(() => {
    // Fallback or respect reduced motion
    if (reducedMotion || !supportsWebGL()) {
      const el = containerRef.current;
      if (el) {
        const isDark = theme === 'dark';
        el.style.background = isDark 
          ? 'radial-gradient(900px 400px at 50% 35%, rgba(0,209,255,0.15), transparent), radial-gradient(700px 320px at 70% 60%, rgba(93,224,230,0.10), transparent)'
          : 'radial-gradient(900px 400px at 50% 35%, rgba(0,74,173,0.15), transparent), radial-gradient(700px 320px at 70% 60%, rgba(0,209,255,0.10), transparent)';
        el.style.opacity = '0';
        el.style.transition = 'opacity 1200ms ease-out';
        requestAnimationFrame(() => (el.style.opacity = '1'));
      }
      return;
    }

    if (!setupThree()) return;

    // Events
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', onResize);

    // Pause when tab hidden
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        cancelAnimationFrame(rafRef.current);
      } else {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    // Start loop
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      cleanupThree();
    };
  }, [animate, cleanupThree, onPointerMove, onResize, reducedMotion, setupThree, theme]);

  // Re-evaluate particle count on resize breakpoint changes
  useEffect(() => {
    const onWindowResize = () => {
      if (typeof particleCount === 'number') return;
      const next = pickResponsiveCount();
      if (next !== count) setCount(next);
    };
    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, [count, particleCount]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full absolute top-0 left-0 z-0"
      aria-hidden="true"
    />
  );
};

export default HeroParticles;


