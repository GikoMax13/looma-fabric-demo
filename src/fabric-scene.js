import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const clamp01 = (value) => Math.max(0, Math.min(1, value));
const smoothstep = (value) => {
  const x = clamp01(value);
  return x * x * (3 - 2 * x);
};

function makeWeaveTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const image = ctx.createImageData(size, size);
  let seed = 7141;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const thread = ((x % 4 === 0 ? 8 : 0) + (y % 4 === 0 ? 7 : 0));
      const grain = Math.round((random() - 0.5) * 12);
      const value = Math.max(0, Math.min(255, 128 + thread + grain));
      const offset = (y * size + x) * 4;
      image.data[offset] = value;
      image.data[offset + 1] = value;
      image.data[offset + 2] = value;
      image.data[offset + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2.3, 1.7);
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

function makeShadowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(128, 128, 12, 128, 128, 126);
  gradient.addColorStop(0, 'rgba(54, 39, 27, .30)');
  gradient.addColorStop(0.45, 'rgba(68, 49, 35, .15)');
  gradient.addColorStop(1, 'rgba(70, 53, 41, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(canvas);
}

function createFallback(container) {
  container.innerHTML = `<svg viewBox="0 0 720 650" role="img" aria-label="Flowing champagne silk fabric" style="display:block;width:100%;height:100%;min-height:420px">
    <defs>
      <linearGradient id="looma-silk" x1="0" x2="1" y1="0" y2=".8"><stop stop-color="#f0d4a4"/><stop offset=".22" stop-color="#b77a3d"/><stop offset=".39" stop-color="#f6dcae"/><stop offset=".57" stop-color="#9d6232"/><stop offset=".72" stop-color="#e8bd7d"/><stop offset=".9" stop-color="#a96e39"/><stop offset="1" stop-color="#f4d39c"/></linearGradient>
      <linearGradient id="looma-fold" x1="0" x2="1"><stop stop-color="#714727" stop-opacity=".1"/><stop offset=".44" stop-color="#fff0ca" stop-opacity=".72"/><stop offset=".57" stop-color="#704323" stop-opacity=".42"/><stop offset="1" stop-color="#fff1ce" stop-opacity=".45"/></linearGradient>
      <filter id="looma-soft"><feGaussianBlur stdDeviation="17"/></filter>
      <filter id="looma-grain"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values=".65 0 0 0 .18 .65 0 0 0 .12 .65 0 0 0 .06 0 0 0 .1 0"/><feBlend in="SourceGraphic" mode="soft-light"/></filter>
    </defs>
    <ellipse cx="367" cy="591" rx="190" ry="23" fill="#71543b" opacity=".16" filter="url(#looma-soft)"/>
    <path d="M204 42 C330 19 424 60 481 148 C533 229 468 277 384 322 C289 372 248 423 283 493 C317 562 422 557 526 590 C413 620 301 584 246 520 C177 441 222 371 315 312 C408 254 459 223 415 154 C376 93 296 65 204 42Z" fill="url(#looma-silk)" filter="url(#looma-grain)"/>
    <path d="M220 47 C348 69 396 122 424 185 C448 239 383 284 313 326 C242 369 212 425 258 482 C291 523 376 558 493 584" fill="none" stroke="url(#looma-fold)" stroke-width="34" opacity=".62"/>
    <path d="M238 49 C355 87 383 129 402 188 C421 246 355 278 292 323 C225 371 207 423 252 480 C286 523 363 548 452 579" fill="none" stroke="#fff0ce" stroke-width="2" opacity=".7"/>
    <path d="M286 43 C386 91 411 129 433 185 C459 250 400 292 331 333 C257 377 238 431 281 484 C320 531 407 559 503 587" fill="none" stroke="#684325" stroke-width="3" opacity=".32"/>
  </svg>`;
  return () => { container.replaceChildren(); };
}

function createFabricGeometry(widthSegments, lengthSegments) {
  const columns = widthSegments + 1;
  const rows = lengthSegments + 1;
  const positions = new Float32Array(columns * rows * 3);
  const uValues = new Float32Array(columns * rows);
  const vValues = new Float32Array(columns * rows);
  const indices = new Uint32Array(widthSegments * lengthSegments * 6);
  let vertex = 0;
  for (let row = 0; row <= lengthSegments; row += 1) {
    const v = row / lengthSegments;
    for (let column = 0; column <= widthSegments; column += 1) {
      const u = column / widthSegments * 2 - 1;
      uValues[vertex] = u;
      vValues[vertex] = v;
      vertex += 1;
    }
  }
  let index = 0;
  for (let row = 0; row < lengthSegments; row += 1) {
    for (let column = 0; column < widthSegments; column += 1) {
      const a = row * columns + column;
      const b = a + columns;
      indices[index++] = a;
      indices[index++] = b;
      indices[index++] = a + 1;
      indices[index++] = b;
      indices[index++] = b + 1;
      indices[index++] = a + 1;
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
  geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(columns * rows * 2), 2));
  const uvs = geometry.attributes.uv.array;
  for (let i = 0; i < uValues.length; i += 1) {
    uvs[i * 2] = (uValues[i] + 1) * 0.5;
    uvs[i * 2 + 1] = 1 - vValues[i];
  }
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.userData.uValues = uValues;
  geometry.userData.vValues = vValues;
  return geometry;
}

function deformFabric(geometry, time, opening, mobile) {
  const positions = geometry.attributes.position.array;
  const us = geometry.userData.uValues;
  const vs = geometry.userData.vValues;
  const idle = mobile ? 0.62 : 1;
  const breath = Math.sin(time * 0.7) * 0.035 * idle;
  const wind = Math.sin(time * 0.42) * 0.08 * idle;
  for (let i = 0; i < us.length; i += 1) {
    const u = us[i];
    const v = vs[i];
    const phase = v * 5.5 + 0.48 * Math.sin(v * 5.1 + 0.7) + time * 0.12;
    const width = (1.9 + 0.16 * Math.sin(v * Math.PI)) * (1 - 0.13 * v);
    const centerX = -0.12 + 0.62 * Math.sin(v * Math.PI * 2 - 0.48) + 0.19 * Math.sin(v * Math.PI * 3 + 0.7);
    const centerZ = 0.18 + 0.48 * Math.cos(v * Math.PI * 2 - 0.25);
    const warpedU = u * Math.PI * (3.7 + 0.62 * Math.sin(v * 4.3 + 0.6)) + 0.66 * Math.sin(v * 6.2 + u * 2.4) + 0.2 * Math.sin(u * 5.1 - v * 3.8);
    const pleat = Math.cos(warpedU + phase) * (0.17 + 0.075 * Math.sin(v * Math.PI));
    const broadFold = 0.115 * Math.sin(u * 5.4 + v * 4.8 + 0.72 * Math.sin(v * 3.7));
    const fineFold = 0.025 * Math.sin(u * 23 + v * 11.3 + 0.8 * Math.sin(v * 5.8));
    const edge = Math.pow(Math.abs(u), 2.2);
    const edgeLift = edge * (0.14 + 0.075 * Math.sin(v * 7.1 + u * 3.2)) + 0.055 * edge * Math.sin(v * 12 + u * 4.5);
    const foldedEdge = smoothstep((u - 0.38) / 0.42) * (0.44 + 0.56 * Math.sin(v * Math.PI * 1.2 - 0.35));
    const x = centerX + u * width - foldedEdge * 0.44 + wind * Math.sin(v * Math.PI) * (0.3 + Math.abs(u) * 0.7);
    const y = 2.72 - v * 5.22 + edgeLift + foldedEdge * (0.075 * Math.sin(v * 7.4)) + Math.sin(u * 4.8 + phase) * 0.06 * Math.sin(v * Math.PI) + breath * Math.sin(v * Math.PI * 2);
    const z = centerZ + pleat + broadFold + fineFold - foldedEdge * 0.52 + (0.34 * u * Math.sin(v * Math.PI * 2 + 0.5)) + 0.06 * Math.sin(phase) + 0.04 * wind * Math.cos(u * 2.7);
    const foldOpen = 0.34 + opening * 0.66;
    positions[i * 3] = x * foldOpen;
    positions[i * 3 + 1] = (y - 0.12) * foldOpen;
    positions[i * 3 + 2] = z * foldOpen;
  }
  geometry.attributes.position.needsUpdate = true;
  geometry.computeVertexNormals();
}

export function mountFabricScene(container, options = {}) {
  if (!container) return () => {};
  const isIntro = options.variant === 'intro';
  const duration = Math.max(800, Number(options.duration) || (isIntro ? 4800 : 2150));
  let renderer;
  let geometry;
  let material;
  let scene;
  let animationFrame = 0;
  let resizeObserver;
  let intersectionObserver;
  let disposed = false;
  let fallbackCleanup;
  let introOverlay;
  let hadIntroWebglClass = false;
  let visible = true;
  let contextLost = false;
  const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const reducedMotion = Boolean(media?.matches);
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let startTime = performance.now();
  const isMobile = window.matchMedia?.('(max-width: 720px)').matches ?? window.innerWidth < 720;

  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.35 : 1.8));
    renderer.setSize(Math.max(1, container.clientWidth), Math.max(1, container.clientHeight), false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.16;
    renderer.setClearColor(0xf5f2ec, 0);
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;min-height:420px;outline:none;';
    renderer.domElement.setAttribute('aria-label', 'A sculptural length of champagne silk');
    container.replaceChildren(renderer.domElement);

    scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(isIntro ? 34 : 40, 1, 0.1, 60);
    camera.position.set(isIntro ? 1.65 : 4.35, isIntro ? 0.9 : 1.55, isIntro ? 4.1 : 6.9);
    camera.lookAt(0, 0, 0);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    room.dispose();
    pmrem.dispose();

    scene.add(new THREE.HemisphereLight(0xffefd6, 0x524238, isIntro ? 0.48 : 1.5));
    const keyLight = new THREE.DirectionalLight(0xffd38d, isIntro ? 0.04 : 4.8);
    keyLight.position.set(-3.8, 5.2, 5.4);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xfff2d7, isIntro ? 0.025 : 2.35);
    fillLight.position.set(4.5, 1.2, 4.8);
    scene.add(fillLight);
    const rimLight = new THREE.DirectionalLight(0xffb847, isIntro ? 0.05 : 3.8);
    rimLight.position.set(0.4, 3.2, -4.2);
    scene.add(rimLight);

    geometry = createFabricGeometry(isMobile ? 112 : 200, isMobile ? 68 : 120);
    const weave = makeWeaveTexture();
    material = new THREE.MeshPhysicalMaterial({
      color: isIntro ? 0xd9a04f : 0xc89053,
      metalness: isIntro ? 0.2 : 0.13,
      roughness: isIntro ? 0.29 : 0.32,
      roughnessMap: weave,
      bumpMap: weave,
      bumpScale: 0.009,
      side: THREE.DoubleSide,
      clearcoat: isIntro ? 0.5 : 0.38,
      clearcoatRoughness: 0.34,
      sheen: 1,
      sheenColor: new THREE.Color(isIntro ? 0xffc861 : 0xffd99d),
      sheenRoughness: 0.42,
      envMapIntensity: isIntro ? 1.6 : 1.1,
    });
    const fabric = new THREE.Mesh(geometry, material);
    fabric.frustumCulled = false;
    scene.add(fabric);

    const shadowMaterial = new THREE.MeshBasicMaterial({ map: makeShadowTexture(), transparent: true, depthWrite: false, opacity: isIntro ? 0.22 : 0.8, toneMapped: false });
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(4.7, 1.9), shadowMaterial);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.set(0, -2.83, 0.28);
    scene.add(shadow);

    const onLost = (event) => { event.preventDefault(); contextLost = true; cancelAnimationFrame(animationFrame); };
    const onRestored = () => { contextLost = false; schedule(); };
    renderer.domElement.addEventListener('webglcontextlost', onLost, false);
    renderer.domElement.addEventListener('webglcontextrestored', onRestored, false);

    const onPointerMove = (event) => {
      const rect = container.getBoundingClientRect();
      pointer.targetX = ((event.clientX - rect.left) / Math.max(1, rect.width) - 0.5) * 2;
      pointer.targetY = ((event.clientY - rect.top) / Math.max(1, rect.height) - 0.5) * 2;
    };
    const onPointerLeave = () => { pointer.targetX = pointer.targetY = 0; };
    const onScroll = () => schedule();
    container.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('pointerleave', onPointerLeave, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    const resize = () => {
      if (disposed || !renderer) return;
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (!isIntro || reducedMotion) renderStatic();
    };
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible) schedule();
      else cancelAnimationFrame(animationFrame);
    }, { rootMargin: '100px' });
    intersectionObserver.observe(container);

    const renderStatic = () => {
      if (disposed || contextLost || !renderer) return;
      const scrollProgress = Math.min(1, Math.max(0, window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)));
      deformFabric(geometry, 0, 1, isMobile);
      fabric.scale.setScalar(1);
      fabric.position.set(0, 0, 0);
      fabric.rotation.set(0.025 + scrollProgress * 0.08, -0.06 + scrollProgress * 0.2, 0.015);
      if (isIntro) {
        camera.position.set(4.35, 1.55, 6.9);
        camera.lookAt(0, 0, 0);
        keyLight.intensity = 5.1;
        fillLight.intensity = 2.5;
        rimLight.intensity = 4.4;
        material.envMapIntensity = 1.6;
        renderer.toneMappingExposure = 1.15;
      }
      renderer.render(scene, camera);
    };

    const animate = (now) => {
      animationFrame = 0;
      if (disposed || contextLost || !renderer || !visible) return;
      if (reducedMotion) {
        renderStatic();
        return;
      }
      const elapsed = (now - startTime) / 1000;
      const scrollProgress = isIntro ? 0 : Math.min(1, Math.max(0, window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)));
      if (isIntro) {
        const total = duration / 1000;
        const t = Math.min(1, elapsed / total);
        const unfold = smoothstep((t - 0.1) / 0.38);
        const orbit = smoothstep((t - 0.48) / 0.28);
        const passage = smoothstep((t - 0.75) / 0.25);
        // The opening is a macro silk detail; a fast pullback reveals the whole sculpture,
        // then the final lens move carries the camera through the illuminated folds.
        deformFabric(geometry, elapsed * 1.35, unfold, isMobile);
        const revealScale = 0.98 + 0.08 * unfold;
        fabric.scale.setScalar(revealScale * (1 + passage * 1.42));
        fabric.rotation.set(
          0.56 * (1 - unfold) + 0.05 * Math.sin(t * Math.PI * 2),
          -0.92 * (1 - unfold) + 0.68 * orbit - 0.22 * passage,
          -0.28 * (1 - unfold) + 0.12 * Math.sin(t * Math.PI * 2),
        );
        fabric.position.set(0.14 * (1 - unfold) - passage * 0.35, -0.06 + 0.12 * Math.sin(t * Math.PI * 2), 0);

        const macroDistance = 3.35 + unfold * 4.9 - passage * 5.5;
        const azimuth = 0.38 + orbit * 0.72 - passage * 0.25;
        camera.position.set(Math.sin(azimuth) * macroDistance, 0.75 + 0.48 * orbit - 0.28 * passage, Math.cos(azimuth) * macroDistance);
        camera.lookAt(-0.04 * unfold, -0.04 - 0.2 * passage, 0);
        keyLight.intensity = 0.04 + 5.1 * smoothstep((t - 0.035) / 0.16);
        fillLight.intensity = 0.025 + 2.5 * smoothstep((t - 0.16) / 0.34);
        rimLight.intensity = 0.05 + 4.4 * smoothstep((t - 0.39) / 0.3);
        material.envMapIntensity = 0.08 + 1.52 * smoothstep((t - 0.08) / 0.32);
        renderer.toneMappingExposure = 0.8 + 0.35 * smoothstep((t - 0.1) / 0.3);
        renderer.render(scene, camera);
        if (elapsed < total) animationFrame = requestAnimationFrame(animate);
        return;
      }
      const opening = smoothstep(elapsed / (duration / 1000));
      pointer.x += (pointer.targetX - pointer.x) * 0.035;
      pointer.y += (pointer.targetY - pointer.y) * 0.035;
      deformFabric(geometry, elapsed, opening, isMobile);
      fabric.scale.setScalar(1);
      fabric.rotation.set(0.14 * (1 - opening) + pointer.y * 0.025, -0.38 * (1 - opening) + scrollProgress * 0.23 + pointer.x * 0.04, -0.08 * (1 - opening) + Math.sin(elapsed * 0.24) * 0.008);
      fabric.position.y = -0.03 * (1 - opening) + Math.sin(elapsed * 0.34) * 0.02;
      camera.position.x = 4.35 + scrollProgress * 0.28 + pointer.x * 0.08;
      camera.position.y = 1.55 - scrollProgress * 0.18 - pointer.y * 0.045;
      camera.position.z = 6.9;
      camera.lookAt(0, -0.04 - scrollProgress * 0.18, 0);
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };
    const schedule = () => {
      if (disposed || contextLost || !visible || animationFrame) return;
      if (reducedMotion) {
        renderStatic();
        return;
      }
      animationFrame = requestAnimationFrame(animate);
    };
    const onReplay = () => {
      if (!isIntro || reducedMotion) return;
      startTime = performance.now();
      schedule();
    };
    if (isIntro) {
      window.addEventListener('looma:replay-intro', onReplay);
      introOverlay = container.closest('.intro-overlay');
      hadIntroWebglClass = Boolean(introOverlay?.classList.contains('has-intro-webgl'));
      // This DOM ribbon is a CSS-only fallback; suppress it once the WebGL scene is ready.
      introOverlay?.classList.add('has-intro-webgl');
    }
    // The declarations are initialized before observer callbacks can run.
    resize();
    schedule();

    return () => {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (isIntro) {
        window.removeEventListener('looma:replay-intro', onReplay);
        if (!hadIntroWebglClass) introOverlay?.classList.remove('has-intro-webgl');
      }
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
      renderer.domElement.removeEventListener('webglcontextlost', onLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onRestored);
      geometry?.dispose();
      material?.map?.dispose();
      material?.roughnessMap?.dispose();
      material?.bumpMap?.dispose();
      material?.dispose();
      shadowMaterial.map?.dispose();
      shadowMaterial.dispose();
      shadow.geometry.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      scene.environment?.dispose?.();
      container.replaceChildren();
    };
  } catch (error) {
    console.warn('[LOOMA] WebGL silk scene unavailable; using the illustrated fallback.', error);
    try { renderer?.dispose(); } catch {}
    container.replaceChildren();
    fallbackCleanup = createFallback(container);
    return () => {
      if (disposed) return;
      disposed = true;
      fallbackCleanup?.();
    };
  }
}
