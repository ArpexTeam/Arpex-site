import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { createStage, disposeObject, roundedRectShape, visibleHeightAt } from "@/lib/three/stage";
import { plaqueModel } from "@/data/plaque";
import { drawPhoneScreen, drawPlaqueArt, loadImage, type ArtFonts } from "./plaque-art";

/**
 * Placa de acrílico (sem base) com arte impressa, QR e NFC; um celular se
 * aproxima, o sinal NFC aparece e a tela abre a página de avaliação de
 * demonstração. Proporções vêm de plaqueModel (parametrizado).
 */

type V3 = [number, number, number];
type Key = { p: number; pos: V3; rot: V3 };

const PLAQUE_KEYS: Key[] = [
  { p: 0, pos: [0.22, -0.03, 0.85], rot: [0.1, 0.88, 0.04] },
  { p: 0.2, pos: [0.05, 0, 0.4], rot: [0.05, 0.45, 0.02] },
  { p: 0.38, pos: [0, 0, 0], rot: [0.02, -0.3, 0] },
  { p: 0.48, pos: [-0.12, 0, 0], rot: [0, 0.06, 0] },
  { p: 0.7, pos: [-0.42, 0.02, 0], rot: [0, 0.22, 0] },
  { p: 1, pos: [-0.6, 0, 0], rot: [0, 0.16, 0] },
];

const PHONE_KEYS: Key[] = [
  { p: 0, pos: [2.8, -1.4, 0.6], rot: [0.25, -0.7, 0.35] },
  { p: 0.46, pos: [2.4, -1.1, 0.6], rot: [0.2, -0.6, 0.3] },
  { p: 0.58, pos: [-0.02, -0.26, 0.36], rot: [-0.32, -0.45, 0.22] },
  { p: 0.68, pos: [-0.04, -0.24, 0.26], rot: [-0.3, -0.42, 0.2] },
  { p: 0.82, pos: [0.62, 0, 0.32], rot: [0, -0.14, 0] },
  { p: 1, pos: [0.6, 0, 0.3], rot: [0, -0.18, 0] },
];

const ease = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const range = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

function sample(keys: Key[], p: number) {
  let i = 0;
  while (i < keys.length - 2 && p > keys[i + 1].p) i++;
  const a = keys[i];
  const b = keys[i + 1];
  const t = ease(range(p, a.p, b.p));
  const mix = (x: V3, y: V3) => x.map((v, k) => v + (y[k] - v) * t) as V3;
  return { pos: mix(a.pos, b.pos), rot: mix(a.rot, b.rot) };
}

export type PlaqueSceneApi = {
  setProgress: (p: number) => void;
  dispose: () => void;
};

export async function mountPlaqueScene(
  container: HTMLElement,
  opts: { qrSrc: string; fonts: ArtFonts; focusX: number; background: string; onReady: () => void; onContextLost: () => void }
): Promise<PlaqueSceneApi> {
  await document.fonts.ready;
  const qr = await loadImage(opts.qrSrc);
  const artCanvas = drawPlaqueArt(qr, opts.fonts);
  const screenIdle = drawPhoneScreen(0, opts.fonts);
  const screenReview = drawPhoneScreen(1, opts.fonts);

  let target = 0;
  let progress = 0;
  let lowQuality = false;
  let acrylicRef: THREE.MeshPhysicalMaterial | null = null;

  const stage = createStage(
    container,
    (renderer) => {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(opts.background);
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 40);
      camera.position.set(0, 0, 6);

      const pmrem = new THREE.PMREMGenerator(renderer);
      const envRT = pmrem.fromScene(new RoomEnvironment(), 0.03);
      scene.environment = envRT.texture;
      pmrem.dispose();

      const key = new THREE.DirectionalLight(0xffffff, 1.6);
      key.position.set(-3, 4, 5);
      const rim = new THREE.DirectionalLight(0x9fffd4, 0.9);
      rim.position.set(4, 1, -3);
      scene.add(key, rim);

      const root = new THREE.Group();
      scene.add(root);

      // --- Placa
      const { width, height, thickness, cornerRadius, printSide } = plaqueModel;
      const plaque = new THREE.Group();
      const bevel = Math.min(0.012, thickness * 0.2);
      const bodyGeo = new THREE.ExtrudeGeometry(roundedRectShape(width, height, cornerRadius), {
        depth: thickness - bevel * 2,
        bevelEnabled: true,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 3,
        curveSegments: 16,
      });
      bodyGeo.translate(0, 0, -(thickness - bevel * 2) / 2);
      const acrylic = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0,
        transmission: lowQuality ? 0 : 1,
        thickness: thickness * 0.5,
        ior: 1.49,
        clearcoat: 0.5,
        clearcoatRoughness: 0.04,
        specularIntensity: 0.6,
        envMapIntensity: 0.55,
        transparent: lowQuality,
        opacity: lowQuality ? 0.3 : 1,
      });
      acrylicRef = acrylic;
      // laterais polidas: acrílico mostra a borda clara, levemente esverdeada
      const edge = new THREE.MeshStandardMaterial({
        color: 0xd9efe5,
        metalness: 0,
        roughness: 0.14,
        envMapIntensity: 1.1,
        transparent: true,
        opacity: 0.92,
      });
      const body = new THREE.Mesh(bodyGeo, [acrylic, edge]);

      const artTex = new THREE.CanvasTexture(artCanvas);
      artTex.colorSpace = THREE.SRGBColorSpace;
      artTex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      const inset = 0.035;
      const print = new THREE.Mesh(
        new THREE.PlaneGeometry(width - inset * 2, height - inset * 2),
        new THREE.MeshBasicMaterial({ map: artTex, toneMapped: false })
      );
      print.position.z = printSide === "back" ? -thickness / 2 + bevel + 0.002 : thickness / 2 + 0.002;
      plaque.add(print, body);

      // Sinal NFC: anéis na zona do ícone da arte (coordenadas da arte → placa)
      const nfcLocal = new THREE.Vector3((760 / 1024 - 0.5) * width - 0.04, (0.5 - 760 / 1454) * height, thickness / 2 + 0.01);
      const rings = Array.from({ length: 3 }, () => {
        const m = new THREE.Mesh(
          new THREE.RingGeometry(0.1, 0.112, 64),
          new THREE.MeshBasicMaterial({ color: 0x00cf77, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false })
        );
        m.position.copy(nfcLocal);
        plaque.add(m);
        return m;
      });

      // Destaque do QR como alternativa de acesso
      const qrSize = (470 / 1024) * width;
      const qrOutline = new THREE.Mesh(
        new THREE.EdgesGeometry(new THREE.ShapeGeometry(roundedRectShape(qrSize + 0.05, qrSize + 0.05, 0.035), 8)),
        new THREE.LineBasicMaterial({ color: 0x00cf77, transparent: true, opacity: 0, toneMapped: false })
      );
      qrOutline.position.set(((96 + 235) / 1024 - 0.5) * width, (0.5 - (600 + 235) / 1454) * height, thickness / 2 + 0.006);
      plaque.add(qrOutline);
      root.add(plaque);

      // --- Celular
      const phone = new THREE.Group();
      const pw = 0.66;
      const ph = 1.36;
      const pd = 0.06;
      const phoneGeo = new THREE.ExtrudeGeometry(roundedRectShape(pw, ph, 0.1), {
        depth: pd,
        bevelEnabled: true,
        bevelThickness: 0.018,
        bevelSize: 0.018,
        bevelSegments: 4,
        curveSegments: 14,
      });
      phoneGeo.translate(0, 0, -pd / 2);
      const phoneBody = new THREE.Mesh(phoneGeo, new THREE.MeshStandardMaterial({ color: 0x121614, metalness: 0.65, roughness: 0.32 }));
      const texIdle = new THREE.CanvasTexture(screenIdle);
      const texReview = new THREE.CanvasTexture(screenReview);
      for (const t of [texIdle, texReview]) {
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      }
      const screenGeo = new THREE.PlaneGeometry(pw - 0.08, ph - 0.08);
      const screenA = new THREE.Mesh(screenGeo, new THREE.MeshBasicMaterial({ map: texIdle, toneMapped: false }));
      const screenB = new THREE.Mesh(screenGeo, new THREE.MeshBasicMaterial({ map: texReview, toneMapped: false, transparent: true, opacity: 0 }));
      screenA.position.z = pd / 2 + 0.02;
      screenB.position.z = pd / 2 + 0.021;
      phone.add(phoneBody, screenA, screenB);
      root.add(phone);

      function layout(elapsed: number) {
        const visH = visibleHeightAt(camera, camera.position.z);
        const visW = visH * camera.aspect;
        // centro da composição deslocado para a direita do texto HTML
        root.position.x = (opts.focusX - 0.5) * visW;
        // telas estreitas: a composição encolhe para caber
        const fit = Math.min(1, (visW * 0.62) / 2.2, visH / 2.4);
        root.scale.setScalar(fit);

        const pk = sample(PLAQUE_KEYS, progress);
        const settle = range(progress, 0.9, 1);
        const float = Math.sin(elapsed * 0.8) * 0.012 * settle;
        plaque.position.set(pk.pos[0], pk.pos[1] + float, pk.pos[2]);
        plaque.rotation.set(pk.rot[0], pk.rot[1], pk.rot[2]);

        const fk = sample(PHONE_KEYS, progress);
        phone.position.set(fk.pos[0], fk.pos[1] - float * 0.6, fk.pos[2]);
        phone.rotation.set(fk.rot[0], fk.rot[1], fk.rot[2]);
        phone.visible = progress > 0.4;

        (screenB.material as THREE.MeshBasicMaterial).opacity = ease(range(progress, 0.66, 0.76));

        const nfc = range(progress, 0.52, 0.58) * (1 - range(progress, 0.72, 0.78));
        rings.forEach((r, i) => {
          const t = (elapsed * 0.9 + i / 3) % 1;
          r.scale.setScalar(0.6 + t * 2.4);
          (r.material as THREE.MeshBasicMaterial).opacity = nfc * (1 - t) * 0.9;
          r.visible = nfc > 0.001;
        });

        const qrOn = range(progress, 0.78, 0.84) * (1 - range(progress, 0.95, 1)) * (0.65 + 0.35 * Math.sin(elapsed * 3));
        (qrOutline.material as THREE.LineBasicMaterial).opacity = qrOn;
      }

      return {
        scene,
        camera,
        update(dt, elapsed) {
          progress += (target - progress) * Math.min(1, dt * 6);
          layout(elapsed);
          return true;
        },
        resize(w, h) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        },
        dispose() {
          disposeObject(scene);
          envRT.dispose();
        },
      };
    },
    {
      maxDpr: 1.5,
      onFirstFrame: opts.onReady,
      onContextLost: opts.onContextLost,
      onLowQuality: () => {
        // sem passe de transmissão: acrílico translúcido simples
        lowQuality = true;
        if (acrylicRef) {
          acrylicRef.transmission = 0;
          acrylicRef.transparent = true;
          acrylicRef.opacity = 0.3;
          acrylicRef.needsUpdate = true;
        }
      },
    }
  );

  return {
    setProgress(p) {
      target = p;
      stage.invalidate();
    },
    dispose() {
      stage.dispose();
    },
  };
}
