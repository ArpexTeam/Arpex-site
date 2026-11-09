import * as THREE from "three";

/**
 * Ciclo de vida comum das cenas WebGL do site:
 * - DPR limitado e adaptado pela medição real do tempo de quadro; se mesmo na
 *   resolução mínima a cena seguir pesada, onTooSlow devolve a vez ao HTML;
 * - render só com o canvas visível e a aba ativa;
 * - perda/restauração de contexto;
 * - resize por ResizeObserver (inclui mudança de orientação);
 * - descarte completo de geometrias, materiais, texturas e eventos.
 */

export type SceneHandle = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  /** chamado a cada quadro renderizado; devolve false quando a cena está parada */
  update: (dt: number, elapsed: number) => boolean | void;
  resize: (width: number, height: number) => void;
  dispose: () => void;
};

export type StageOptions = {
  maxDpr?: number;
  minDpr?: number;
  /** quadros acima disso (ms, média) reduzem a resolução */
  frameBudgetMs?: number;
  onContextLost?: () => void;
  onFirstFrame?: () => void;
  /** chamado uma vez se a medição derrubar a resolução */
  onLowQuality?: () => void;
  /** chamado uma vez se, já na resolução mínima, os quadros seguirem lentos */
  onTooSlow?: () => void;
};

export type Stage = {
  renderer: THREE.WebGLRenderer;
  /** força pelo menos um quadro (ex.: após mudança de progresso) */
  invalidate: () => void;
  dispose: () => void;
  quality: () => "high" | "low";
};

export function disposeObject(root: THREE.Object3D) {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
    if (!mat) return;
    const mats = Array.isArray(mat) ? mat : [mat];
    for (const m of mats) {
      for (const value of Object.values(m)) {
        if (value instanceof THREE.Texture) value.dispose();
      }
      if ((m as THREE.ShaderMaterial).uniforms) {
        for (const u of Object.values((m as THREE.ShaderMaterial).uniforms)) {
          if (u.value instanceof THREE.Texture) u.value.dispose();
        }
      }
      m.dispose();
    }
  });
}

export function createStage(
  container: HTMLElement,
  build: (renderer: THREE.WebGLRenderer) => SceneHandle,
  options: StageOptions = {}
): Stage {
  const maxDpr = Math.min(options.maxDpr ?? 1.75, window.devicePixelRatio || 1);
  const minDpr = Math.min(options.minDpr ?? 1, maxDpr);
  const budget = options.frameBudgetMs ?? 21;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.setClearColor(0x000000, 0);
  let dpr = maxDpr;
  renderer.setPixelRatio(dpr);

  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.display = "block";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  container.appendChild(canvas);

  let handle = build(renderer);
  const clock = new THREE.Clock();
  let raf = 0;
  let visible = false;
  let tabVisible = document.visibilityState === "visible";
  let dirty = true;
  let firstFrame = false;
  let lost = false;
  let disposed = false;

  // Medição de tempo de quadro para adaptar a resolução. Só quadros em
  // sequência contam: o primeiro depois de uma pausa traz o tempo parado.
  let sampleSum = 0;
  let sampleCount = 0;
  let lowQuality = false;
  let slowChecked = false;
  let chained = false;
  const SAMPLES = 90;

  function size() {
    const w = Math.max(1, container.clientWidth);
    const h = Math.max(1, container.clientHeight);
    renderer.setSize(w, h, false);
    handle.resize(w, h);
    dirty = true;
  }

  function frame() {
    raf = 0;
    if (disposed || lost || !visible || !tabVisible) return;
    const dt = Math.min(clock.getDelta(), 1 / 20);
    const t0 = performance.now();
    const keepGoing = handle.update(dt, clock.elapsedTime);
    renderer.render(handle.scene, handle.camera);
    const cost = performance.now() - t0;

    if (!firstFrame) {
      firstFrame = true;
      options.onFirstFrame?.();
    } else if (chained && !slowChecked) {
      sampleSum += dt * 1000;
      sampleCount++;
      if (sampleCount === SAMPLES) {
        const avg = sampleSum / sampleCount;
        sampleSum = 0;
        sampleCount = 0;
        if ((avg > budget || cost > budget) && dpr > minDpr) {
          dpr = minDpr;
          lowQuality = true;
          renderer.setPixelRatio(dpr);
          size();
          options.onLowQuality?.();
        } else {
          // segunda medição (ou a primeira já na resolução mínima): abaixo de ~24 qps, desiste
          slowChecked = true;
          if (avg > budget * 2) options.onTooSlow?.();
        }
      }
    }

    const wasDirty = dirty;
    dirty = false;
    if (keepGoing !== false || wasDirty) {
      raf = requestAnimationFrame(frame);
      chained = true;
    } else {
      chained = false;
    }
  }

  function schedule() {
    if (!raf && !disposed) {
      chained = false;
      raf = requestAnimationFrame(frame);
    }
  }

  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        clock.getDelta();
        schedule();
      }
    },
    { rootMargin: "120px 0px" }
  );
  io.observe(container);

  const onVisibility = () => {
    tabVisible = document.visibilityState === "visible";
    if (tabVisible) {
      clock.getDelta();
      schedule();
    }
  };
  document.addEventListener("visibilitychange", onVisibility);

  const ro = new ResizeObserver(() => {
    size();
    schedule();
  });
  ro.observe(container);

  const onLost = (e: Event) => {
    e.preventDefault();
    lost = true;
    cancelAnimationFrame(raf);
    raf = 0;
    options.onContextLost?.();
  };
  const onRestored = () => {
    lost = false;
    handle.dispose();
    handle = build(renderer);
    size();
    schedule();
  };
  canvas.addEventListener("webglcontextlost", onLost);
  canvas.addEventListener("webglcontextrestored", onRestored);

  size();
  schedule();

  return {
    renderer,
    invalidate() {
      dirty = true;
      schedule();
    },
    quality: () => (lowQuality ? "low" : "high"),
    dispose() {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      handle.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    },
  };
}

/** Altura visível (unidades do mundo) a uma distância da câmera. */
export function visibleHeightAt(camera: THREE.PerspectiveCamera, distance: number) {
  return 2 * distance * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
}

export function roundedRectShape(width: number, height: number, radius: number) {
  const x = -width / 2;
  const y = -height / 2;
  const r = Math.min(radius, width / 2, height / 2);
  const shape = new THREE.Shape();
  shape.moveTo(x + r, y);
  shape.lineTo(x + width - r, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + r);
  shape.lineTo(x + width, y + height - r);
  shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  shape.lineTo(x + r, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  return shape;
}

/** Carrega texturas em paralelo; rejeita se qualquer uma falhar. */
export function loadTextures(urls: string[], renderer: THREE.WebGLRenderer) {
  const loader = new THREE.TextureLoader();
  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  return Promise.all(
    urls.map(
      (url) =>
        new Promise<THREE.Texture>((resolve, reject) => {
          loader.load(
            url,
            (tex) => {
              tex.colorSpace = THREE.SRGBColorSpace;
              tex.anisotropy = Math.min(8, maxAniso);
              tex.generateMipmaps = true;
              tex.minFilter = THREE.LinearMipmapLinearFilter;
              resolve(tex);
            },
            undefined,
            () => reject(new Error(`Falha ao carregar ${url}`))
          );
        })
    )
  );
}
