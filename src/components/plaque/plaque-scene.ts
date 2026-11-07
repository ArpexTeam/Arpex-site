import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { createStage, disposeObject, roundedRectShape, visibleHeightAt } from "@/lib/three/stage";
import { plaquePhoto } from "@/data/plaque";
import { drawPhoneScreen, loadImage, type ArtFonts } from "./plaque-art";

/**
 * A placa é a foto real, recortada: um plano com a imagem, uma sombra própria
 * e um brilho que passa pelo acrílico. A foto só registra a frente da peça,
 * então o giro fica curto (até ~10° no eixo vertical e ~4° no horizontal).
 *
 * Dois momentos na mesma rolagem:
 * 1. o produto (0–0.44): a placa entra de trás, assenta de frente e fica em foco;
 * 2. a demonstração (0.44–1): a placa abre espaço, o celular se aproxima, o
 *    sinal NFC aparece e a tela abre a página de avaliação de demonstração.
 */

type V3 = [number, number, number];
type Key = { p: number; pos: V3; rot: V3 };

const PLAQUE_KEYS: Key[] = [
  { p: 0, pos: [0.28, -0.3, -1.1], rot: [0.07, -0.17, 0.02] },
  { p: 0.14, pos: [0.1, -0.08, -0.35], rot: [0.035, -0.09, 0.008] },
  { p: 0.3, pos: [0, 0, 0], rot: [0, 0, 0] },
  { p: 0.42, pos: [0, 0.02, 0], rot: [0, 0.03, 0] },
  { p: 0.54, pos: [-0.36, 0, -0.05], rot: [0, 0.12, 0] },
  { p: 0.72, pos: [-0.46, 0.02, -0.05], rot: [0, 0.15, 0] },
  { p: 1, pos: [-0.64, 0, -0.05], rot: [0, 0.13, 0] },
];

// o celular encosta na área de NFC da placa (canto inferior esquerdo da arte)
const PHONE_KEYS: Key[] = [
  { p: 0, pos: [2.8, -1.4, 0.6], rot: [0.25, -0.7, 0.35] },
  { p: 0.46, pos: [2.4, -1.1, 0.6], rot: [0.2, -0.6, 0.3] },
  { p: 0.6, pos: [-0.62, -0.62, 0.34], rot: [-0.3, -0.35, 0.22] },
  { p: 0.7, pos: [-0.64, -0.6, 0.24], rot: [-0.28, -0.33, 0.2] },
  { p: 0.84, pos: [0.62, 0, 0.32], rot: [0, -0.14, 0] },
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

function canvasTexture(c: HTMLCanvasElement) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Sombra macia da placa (desenhada só pela sombra do canvas, que funciona em todos os navegadores). */
function drawShadow() {
  const S = 256;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const ctx = c.getContext("2d")!;
  ctx.shadowColor = "rgba(0,0,0,1)";
  ctx.shadowBlur = 34;
  ctx.shadowOffsetX = S * 4;
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.roundRect(S * 0.2 - S * 4, S * 0.2, S * 0.6, S * 0.6, 14);
  ctx.fill();
  return c;
}

/** Luz difusa atrás da placa: dá contraste ao topo preto sobre o fundo escuro. */
function drawSpot() {
  const S = 256;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0, "rgba(210,232,220,0.16)");
  g.addColorStop(0.55, "rgba(210,232,220,0.05)");
  g.addColorStop(1, "rgba(210,232,220,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);
  return c;
}

/** Faixa de brilho do acrílico (desliza conforme a placa gira). */
function drawSheen() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 8;
  const ctx = c.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 512, 0);
  g.addColorStop(0, "rgba(255,255,255,0)");
  g.addColorStop(0.44, "rgba(255,255,255,0)");
  g.addColorStop(0.5, "rgba(255,255,255,1)");
  g.addColorStop(0.56, "rgba(255,255,255,0)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 8);
  return c;
}

/** Máscara da placa (branco onde a foto é opaca), para o brilho não sair da peça. */
function drawMask(img: HTMLImageElement) {
  const c = document.createElement("canvas");
  c.width = img.naturalWidth;
  c.height = img.naturalHeight;
  const ctx = c.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  ctx.globalCompositeOperation = "source-in";
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, c.width, c.height);
  return c;
}

export type PlaqueSceneApi = {
  setProgress: (p: number) => void;
  dispose: () => void;
};

export async function mountPlaqueScene(
  container: HTMLElement,
  opts: { photoSrc: string; fonts: ArtFonts; focusX: number; background: string; onReady: () => void; onContextLost: () => void }
): Promise<PlaqueSceneApi> {
  await document.fonts.ready;
  const photo = await loadImage(opts.photoSrc);
  const screenIdle = drawPhoneScreen(0, opts.fonts);
  const screenReview = drawPhoneScreen(1, opts.fonts);

  let target = 0;
  let progress = 0;

  const stage = createStage(
    container,
    (renderer) => {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(opts.background);
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 40);
      camera.position.set(0, 0, 6);

      // o ambiente só reflete no corpo do celular; a foto não recebe luz
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
      const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());

      // --- Luz de fundo e sombra: elementos separados da placa
      const spot = new THREE.Mesh(
        new THREE.PlaneGeometry(4, 4),
        new THREE.MeshBasicMaterial({ map: canvasTexture(drawSpot()), transparent: true, depthWrite: false, toneMapped: false })
      );
      spot.position.z = -1.6;
      root.add(spot);

      const aspect = photo.naturalHeight / photo.naturalWidth;
      const W = 1;
      const H = W * aspect;
      const shadow = new THREE.Mesh(
        new THREE.PlaneGeometry(W * 1.7, H * 1.7),
        new THREE.MeshBasicMaterial({ map: canvasTexture(drawShadow()), transparent: true, depthWrite: false, toneMapped: false })
      );
      root.add(shadow);

      // --- Placa: a foto recortada, com alfa pré-multiplicado (contorno sem franja)
      const plaque = new THREE.Group();
      const art = new THREE.Group();
      // a foto original tem um leve giro; a cena o desfaz
      art.rotation.z = THREE.MathUtils.degToRad(-plaquePhoto.tiltDeg);
      plaque.add(art);

      const photoTex = new THREE.Texture(photo);
      photoTex.colorSpace = THREE.SRGBColorSpace;
      photoTex.anisotropy = maxAniso;
      photoTex.premultiplyAlpha = true;
      photoTex.generateMipmaps = true;
      photoTex.minFilter = THREE.LinearMipmapLinearFilter;
      photoTex.needsUpdate = true;
      const photoMat = new THREE.MeshBasicMaterial({ map: photoTex, transparent: true, premultipliedAlpha: true, toneMapped: false });
      const plane = new THREE.PlaneGeometry(W, H);
      art.add(new THREE.Mesh(plane, photoMat));

      const sheenTex = canvasTexture(drawSheen());
      sheenTex.wrapS = THREE.ClampToEdgeWrapping;
      sheenTex.repeat.set(0.6, 1);
      sheenTex.center.set(0.5, 0.5);
      sheenTex.rotation = -0.5;
      const maskTex = new THREE.CanvasTexture(drawMask(photo));
      const sheenMat = new THREE.MeshBasicMaterial({
        map: sheenTex,
        alphaMap: maskTex,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      });
      const sheen = new THREE.Mesh(plane, sheenMat);
      sheen.position.z = 0.002;
      art.add(sheen);

      // pontos da arte (fração do recorte) → coordenadas do plano
      const at = (u: number, v: number, z: number) => new THREE.Vector3((u - 0.5) * W, (0.5 - v) * H, z);

      // Sinal NFC sobre o ícone "Aproxime seu celular"
      const nfcLocal = at(plaquePhoto.nfc.x, plaquePhoto.nfc.y, 0.01);
      const rings = Array.from({ length: 3 }, () => {
        const m = new THREE.Mesh(
          new THREE.RingGeometry(0.08, 0.09, 64),
          new THREE.MeshBasicMaterial({ color: 0x00cf77, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false })
        );
        m.position.copy(nfcLocal);
        art.add(m);
        return m;
      });

      // Destaque do QR Code como alternativa de acesso
      const qrSize = plaquePhoto.qr.size * W;
      const qrOutline = new THREE.Mesh(
        new THREE.EdgesGeometry(new THREE.ShapeGeometry(roundedRectShape(qrSize + 0.03, qrSize + 0.03, 0.03), 8)),
        new THREE.LineBasicMaterial({ color: 0x00cf77, transparent: true, opacity: 0, toneMapped: false })
      );
      qrOutline.position.copy(at(plaquePhoto.qr.x, plaquePhoto.qr.y, 0.006));
      art.add(qrOutline);
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
      const texIdle = canvasTexture(screenIdle);
      const texReview = canvasTexture(screenReview);
      texIdle.anisotropy = texReview.anisotropy = maxAniso;
      const screenGeo = new THREE.PlaneGeometry(pw - 0.08, ph - 0.08);
      const screenA = new THREE.Mesh(screenGeo, new THREE.MeshBasicMaterial({ map: texIdle, toneMapped: false }));
      const screenB = new THREE.Mesh(screenGeo, new THREE.MeshBasicMaterial({ map: texReview, toneMapped: false, transparent: true, opacity: 0 }));
      screenA.position.z = pd / 2 + 0.02;
      screenB.position.z = pd / 2 + 0.021;
      phone.add(phoneBody, screenA, screenB);
      phone.renderOrder = 2;
      root.add(phone);

      function layout(elapsed: number) {
        const visH = visibleHeightAt(camera, camera.position.z);
        const visW = visH * camera.aspect;
        // centro da composição deslocado para a direita do texto HTML
        root.position.x = (opts.focusX - 0.5) * visW;
        // telas estreitas: a composição encolhe para caber
        const fit = Math.min(1, (visW * 0.62) / 2.2, visH / 2.4);
        root.scale.setScalar(fit);

        // 1. produto: entra de trás e cresce; 2. demonstração: volta ao tamanho da composição
        const reveal = ease(range(progress, 0, 0.16));
        const size = 1.3 - 0.3 * ease(range(progress, 0.42, 0.54));
        const pk = sample(PLAQUE_KEYS, progress);
        const settle = range(progress, 0.9, 1);
        const float = Math.sin(elapsed * 0.8) * 0.012 * settle;
        plaque.position.set(pk.pos[0], pk.pos[1] + float, pk.pos[2]);
        plaque.rotation.set(pk.rot[0], pk.rot[1], pk.rot[2]);
        plaque.scale.setScalar(size);
        photoMat.opacity = 0.25 + 0.75 * reveal;

        // sombra: mesma posição, um pouco atrás e abaixo; mais aberta quando a placa está longe
        const depth = clamp01(-pk.pos[2] / 1.1);
        shadow.position.set(pk.pos[0] + 0.05 * size, pk.pos[1] - 0.09 * size + float * 0.4, pk.pos[2] - 0.18);
        shadow.rotation.set(pk.rot[0] * 0.5, pk.rot[1] * 0.5, 0);
        shadow.scale.setScalar(size * (1 + depth * 0.25));
        (shadow.material as THREE.MeshBasicMaterial).opacity = (0.7 - depth * 0.35) * reveal;
        spot.position.x = pk.pos[0] * 0.8;

        // brilho: atravessa a placa na entrada e depois acompanha o giro
        const sweep = range(progress, 0.06, 0.3);
        sheenTex.offset.x = 0.75 - sweep * 1.35 - pk.rot[1] * 1.6;
        sheenMat.opacity = 0.16 * Math.sin(Math.PI * sweep) + 0.06 * Math.abs(pk.rot[1]) / 0.17;

        const fk = sample(PHONE_KEYS, progress);
        phone.position.set(fk.pos[0], fk.pos[1] - float * 0.6, fk.pos[2]);
        phone.rotation.set(fk.rot[0], fk.rot[1], fk.rot[2]);
        phone.visible = progress > 0.44;

        (screenB.material as THREE.MeshBasicMaterial).opacity = ease(range(progress, 0.68, 0.78));

        const nfc = range(progress, 0.55, 0.61) * (1 - range(progress, 0.74, 0.8));
        rings.forEach((r, i) => {
          const t = (elapsed * 0.9 + i / 3) % 1;
          r.scale.setScalar(0.6 + t * 2.2);
          (r.material as THREE.MeshBasicMaterial).opacity = nfc * (1 - t) * 0.9;
          r.visible = nfc > 0.001;
        });

        const qrOn = range(progress, 0.8, 0.86) * (1 - range(progress, 0.95, 1)) * (0.65 + 0.35 * Math.sin(elapsed * 3));
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
