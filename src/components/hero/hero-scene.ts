import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { createStage, disposeObject, loadTextures, roundedRectShape, visibleHeightAt } from "@/lib/three/stage";
import { heroPoses, heroFinalWidth, type HeroPose } from "./hero-layout";

/**
 * Abertura: três telas de projetos reais em uma superfície com moldura
 * biselada. O 3D faz enquadramento, luz e profundidade; o conteúdo das
 * telas são capturas reais usadas como textura. Todo o texto da abertura
 * continua em HTML.
 */

const ASPECT = 1.6;
const CAM_Z = 12;

const screenVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const screenFragment = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uAspect;
  uniform float uRadius;
  uniform float uOpacity;
  uniform float uDim;
  uniform float uSweep;
  varying vec2 vUv;

  float sdRoundRect(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  void main() {
    vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
    float d = sdRoundRect(p, vec2(uAspect * 0.5, 0.5), uRadius);
    float aa = fwidth(d);
    float mask = 1.0 - smoothstep(-aa, aa, d);

    vec3 col = texture2D(uMap, vUv).rgb * (1.0 - uDim);
    // brilho de vidro: faixa diagonal larga e muito suave
    float band = smoothstep(0.22, 0.0, abs((vUv.x + vUv.y * 0.6) - uSweep));
    col += band * 0.045;
    // luz de cima, sem alterar a leitura da captura
    col *= 0.94 + 0.06 * vUv.y;
    // aresta interna iluminada
    col += smoothstep(aa * 2.5, 0.0, abs(d)) * 0.12;

    gl_FragColor = vec4(col, mask * uOpacity);
    #include <colorspace_fragment>
  }
`;

type ScreenObj = {
  group: THREE.Group;
  screen: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  bezel: THREE.Mesh<THREE.ExtrudeGeometry, THREE.MeshStandardMaterial>;
};

export type HeroSceneApi = {
  setProgress: (p: number) => void;
  setPointer: (x: number, y: number) => void;
  dispose: () => void;
};

export async function mountHeroScene(
  container: HTMLElement,
  opts: { textures: string[]; onReady: () => void; onContextLost: () => void }
): Promise<HeroSceneApi> {
  // Texturas antes do renderer: se uma falhar, a abertura fica no poster.
  const probe = { capabilities: { getMaxAnisotropy: () => 8 } } as unknown as THREE.WebGLRenderer;
  const textures = await loadTextures(opts.textures, probe);

  let targetProgress = 0;
  let progress = 0;
  const pointer = new THREE.Vector2();
  const pointerTarget = new THREE.Vector2();
  let viewW = 1;
  let viewH = 1;

  const stage = createStage(
    container,
    (renderer) => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 60);
      camera.position.set(0, 0, CAM_Z);

      const pmrem = new THREE.PMREMGenerator(renderer);
      const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
      scene.environment = envRT.texture;
      pmrem.dispose();

      const key = new THREE.DirectionalLight(0xffffff, 1.4);
      key.position.set(-4, 6, 8);
      scene.add(key);

      const root = new THREE.Group();
      scene.add(root);

      // luz verde difusa atrás da tela principal
      const glowCanvas = document.createElement("canvas");
      glowCanvas.width = glowCanvas.height = 256;
      const g = glowCanvas.getContext("2d")!;
      const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
      grad.addColorStop(0, "rgba(0,207,119,0.55)");
      grad.addColorStop(0.45, "rgba(0,207,119,0.12)");
      grad.addColorStop(1, "rgba(0,207,119,0)");
      g.fillStyle = grad;
      g.fillRect(0, 0, 256, 256);
      const glowTex = new THREE.CanvasTexture(glowCanvas);
      const glow = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.MeshBasicMaterial({
          map: glowTex,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          opacity: 0.55,
          toneMapped: false,
        })
      );
      glow.position.z = -3.5;
      root.add(glow);

      const bezelPad = 0.035;
      const depth = 0.07;
      const screens: ScreenObj[] = textures.map((tex) => {
        tex.needsUpdate = true;
        const group = new THREE.Group();
        const shape = roundedRectShape(ASPECT + bezelPad * 2, 1 + bezelPad * 2, 0.05);
        const bezelGeo = new THREE.ExtrudeGeometry(shape, {
          depth,
          bevelEnabled: true,
          bevelThickness: 0.018,
          bevelSize: 0.018,
          bevelSegments: 4,
          curveSegments: 10,
        });
        bezelGeo.translate(0, 0, -depth);
        const bezel = new THREE.Mesh(
          bezelGeo,
          new THREE.MeshStandardMaterial({
            color: 0x1a1f1c,
            metalness: 0.75,
            roughness: 0.3,
            envMapIntensity: 1,
            transparent: true,
          })
        );
        const screen = new THREE.Mesh(
          new THREE.PlaneGeometry(ASPECT, 1),
          new THREE.ShaderMaterial({
            vertexShader: screenVertex,
            fragmentShader: screenFragment,
            transparent: true,
            toneMapped: false,
            uniforms: {
              uMap: { value: tex },
              uAspect: { value: ASPECT },
              uRadius: { value: 0.022 },
              uOpacity: { value: 1 },
              uDim: { value: 0 },
              uSweep: { value: -1 },
            },
          })
        );
        screen.position.z = 0.02;
        group.add(bezel, screen);
        root.add(group);
        return { group, screen, bezel };
      });

      function visibleWidthAt(z: number) {
        return visibleHeightAt(camera, CAM_Z - z) * camera.aspect;
      }

      function applyPose(obj: ScreenObj, pose: HeroPose) {
        const visH = visibleHeightAt(camera, CAM_Z - pose.z);
        const visW = visH * camera.aspect;
        const worldW = pose.fw * visW;
        const s = worldW / ASPECT;
        obj.group.position.set((pose.fx - 0.5) * visW, (0.5 - pose.fy) * visH, pose.z);
        obj.group.rotation.set(pose.rx, pose.ry, 0);
        obj.group.scale.setScalar(s);
        obj.screen.material.uniforms.uOpacity.value = pose.opacity;
        obj.screen.material.uniforms.uDim.value = pose.dim;
        obj.bezel.material.opacity = pose.opacity;
        obj.group.visible = pose.opacity > 0.01;
      }

      const lerp = THREE.MathUtils.lerp;
      const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
      const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

      function mixPose(a: HeroPose, b: HeroPose, t: number): HeroPose {
        return {
          fx: lerp(a.fx, b.fx, t),
          fy: lerp(a.fy, b.fy, t),
          fw: lerp(a.fw, b.fw, t),
          z: lerp(a.z, b.z, t),
          ry: lerp(a.ry, b.ry, t),
          rx: lerp(a.rx, b.rx, t),
          opacity: lerp(a.opacity, b.opacity, t),
          dim: lerp(a.dim, b.dim, t),
        };
      }

      function layout(elapsed: number) {
        const poses = heroPoses(viewW, viewH);
        const finalFw = heroFinalWidth(viewW, viewH) / viewW;
        const e = easeInOut(clamp01(progress / 0.82));
        const fade = clamp01(progress / 0.55);
        const parallax = 1 - e;

        poses.forEach((start, i) => {
          const end: HeroPose =
            i === 0
              ? { fx: 0.5, fy: 0.45, fw: finalFw, z: 0, ry: 0, rx: 0, opacity: 1, dim: 0 }
              : { ...start, z: start.z - 5, fx: start.fx + (i === 1 ? -0.12 : 0.1), opacity: 0, dim: 0.8 };
          const pose = mixPose(start, end, i === 0 ? e : fade);
          const float = Math.sin(elapsed * 0.6 + i * 1.7) * 0.004 * parallax;
          pose.fy += float;
          pose.ry += pointer.x * 0.05 * parallax;
          pose.rx += -pointer.y * 0.035 * parallax;
          applyPose(screens[i], pose);
          screens[i].screen.material.uniforms.uSweep.value = ((elapsed * 0.09 + i * 0.37) % 2.4) - 0.5;
        });

        const front = screens[0].group;
        glow.position.x = front.position.x;
        glow.position.y = front.position.y;
        const gw = visibleWidthAt(glow.position.z) * 0.75;
        glow.scale.set(gw, gw * 0.8, 1);
        (glow.material as THREE.MeshBasicMaterial).opacity = 0.55 * (1 - e * 0.6);
      }

      return {
        scene,
        camera,
        update(dt, elapsed) {
          progress += (targetProgress - progress) * Math.min(1, dt * 7);
          pointer.lerp(pointerTarget, Math.min(1, dt * 4));
          layout(elapsed);
          return true;
        },
        resize(w, h) {
          viewW = w;
          viewH = h;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        },
        dispose() {
          disposeObject(scene);
          envRT.dispose();
          glowTex.dispose();
        },
      };
    },
    { maxDpr: 1.75, onFirstFrame: opts.onReady, onContextLost: opts.onContextLost }
  );

  return {
    setProgress(p) {
      targetProgress = p;
      stage.invalidate();
    },
    setPointer(x, y) {
      pointerTarget.set(x, y);
    },
    dispose() {
      stage.dispose();
      textures.forEach((t) => t.dispose());
    },
  };
}
