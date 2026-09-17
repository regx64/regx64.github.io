// 화면 전체에 캔버스 하나를 깔고, 각 .stage[data-model] 자리에만 그 프로젝트의 3D 오브젝트를 그립니다.
// 오브젝트를 추가하려면 아래 MODELS에 함수를 하나 넣고 HTML에 data-model을 붙이면 됩니다.

import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const canvas = document.getElementById('gl');
const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FONT = '"Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';
const MONO = 'ui-monospace, Consolas, "D2Coding", monospace';

const C = {
  app: 0x7A5BC7, lang: 0xA87808, os: 0x1D8585,
  sec: 0xC23B5A, arch: 0x2F5FC4, dev: 0x2F9A57,
};

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
} catch (e) {
  document.documentElement.classList.add('no-webgl');
  throw e;
}
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.setClearColor(0x000000, 0);
renderer.setScissorTest(true);

const envTex = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;

await document.fonts.ready;

/* ---------- 공용 도구 ---------- */

const mat = (color, o = {}) => new THREE.MeshPhysicalMaterial({ color, roughness: 0.4, ...o });
const rbox = (w, h, d, r, m) => new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 4, r), m);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (x) => 1 - Math.pow(1 - clamp(x), 3);

function canvasTexture(w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  draw(ctx, w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return { tex: t, ctx };
}

function seeded(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function lines(ctx, x, y, w, count, gap, color, rand) {
  ctx.fillStyle = color;
  for (let i = 0; i < count; i++) {
    const lw = i === count - 1 ? w * 0.55 : w * (0.82 + rand() * 0.18);
    ctx.fillRect(x, y + i * gap, lw, gap * 0.38);
  }
}

/* ---------- 오브젝트 ---------- */

const MODELS = {

  // 첫 화면: 여섯 층 스택. 스크롤하면 층이 벌어짐
  stack() {
    const g = new THREE.Group();
    const cols = [C.app, C.lang, C.os, C.sec, C.arch, C.dev];
    const slabs = cols.map((col, i) => {
      const w = 1.9 + i * 0.34;
      const m = rbox(w, 0.34, w, 0.07, mat(col, { roughness: 0.32, clearcoat: 0.6 }));
      g.add(m);
      return m;
    });
    g.rotation.x = 0.45;
    return {
      group: g, camZ: 12,
      update(t, p) {
        const gap = 0.42 + ease((p - 0.5) * 2.5) * 0.45;
        slabs.forEach((m, i) => { m.position.y = (2.5 - i) * gap; });
        g.rotation.y = 0.7 + p * 1.4 + t * 0.12;
      },
    };
  },

  // 링 오실레이터: 인버터 다섯 개 + 도는 펄스 + 가운데 잡음
  trng() {
    const g = new THREE.Group();
    const R = 1.75;
    g.add(new THREE.Mesh(
      new THREE.TorusGeometry(R, 0.035, 12, 200),
      mat(0xbdbdbd, { metalness: 1, roughness: 0.25 }),
    ));

    const tri = new THREE.Shape();
    tri.moveTo(-0.3, -0.32); tri.lineTo(0.32, 0); tri.lineTo(-0.3, 0.32); tri.closePath();
    const triGeo = new THREE.ExtrudeGeometry(tri, {
      depth: 0.2, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04, bevelSegments: 3,
    });
    triGeo.center();
    const body = mat(C.dev, { roughness: 0.3, clearcoat: 0.6 });
    const white = mat(0xf5f5f5, { roughness: 0.3 });
    const bubbleGeo = new THREE.SphereGeometry(0.085, 20, 12);

    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const inv = new THREE.Group();
      inv.position.set(Math.cos(a) * R, Math.sin(a) * R, 0);
      inv.rotation.z = a + Math.PI / 2;
      inv.add(new THREE.Mesh(triGeo, body));
      const b = new THREE.Mesh(bubbleGeo, white);
      b.position.x = 0.44;
      inv.add(b);
      g.add(inv);
    }

    const pulse = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 20, 12),
      new THREE.MeshBasicMaterial({ color: 0x9df0b8, toneMapped: false }),
    );
    g.add(pulse);

    const N = 600;
    const pos = new Float32Array(N * 3);
    const rand = Math.random;
    const place = (k) => {
      const r = Math.sqrt(rand()) * 1.25, a = rand() * Math.PI * 2;
      pos[k * 3] = Math.cos(a) * r;
      pos[k * 3 + 1] = Math.sin(a) * r;
      pos[k * 3 + 2] = (rand() - 0.5) * 0.5;
    };
    for (let k = 0; k < N; k++) place(k);
    const pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const pts = new THREE.Points(pg, new THREE.PointsMaterial({ color: C.dev, size: 0.035 }));
    g.add(pts);

    return {
      group: g, camZ: 10,
      update(t, p) {
        const a = t * 1.3;
        pulse.position.set(Math.cos(a) * R, Math.sin(a) * R, 0);
        if (!REDUCE) {
          for (let j = 0; j < 45; j++) place((Math.random() * N) | 0);
          pg.attributes.position.needsUpdate = true;
        }
        g.rotation.x = -0.35 + p * 0.5;
        g.rotation.y = (p - 0.5) * 0.9;
      },
    };
  },

  // 아두이노 나노 2×2 + 전선 + 전선 위를 지나는 데이터
  systolic() {
    const g = new THREE.Group();
    const pcbMat = mat(0x1f4fa8, { roughness: 0.55 });
    const chipMat = mat(0x151515, { roughness: 0.6 });
    const metal = mat(0xd0d0d0, { metalness: 1, roughness: 0.3 });
    const gold = mat(0xd4a93a, { metalness: 1, roughness: 0.3 });
    const black = mat(0x1a1a1a, { roughness: 0.7 });
    const pinGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.3, 6);

    function nano() {
      const b = new THREE.Group();
      b.add(rbox(1.9, 0.08, 0.75, 0.03, pcbMat));
      const chip = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.06, 0.42), chipMat);
      chip.position.set(0.15, 0.07, 0);
      chip.rotation.y = Math.PI / 4;
      b.add(chip);
      const usb = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.15, 0.32), metal);
      usb.position.set(-0.85, 0.11, 0);
      b.add(usb);
      const pins = new THREE.InstancedMesh(pinGeo, gold, 30);
      const m4 = new THREE.Matrix4();
      let k = 0;
      for (const z of [-0.31, 0.31]) {
        const hdr = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.08, 0.08), black);
        hdr.position.set(0.05, -0.08, z);
        b.add(hdr);
        for (let i = 0; i < 15; i++) {
          m4.makeTranslation(-0.65 + i * 0.1, -0.2, z);
          pins.setMatrixAt(k++, m4);
        }
      }
      b.add(pins);
      return b;
    }

    const spots = [[-1.2, -0.7], [1.2, -0.7], [-1.2, 0.7], [1.2, 0.7]];
    spots.forEach(([x, z]) => { const n = nano(); n.position.set(x, 0, z); g.add(n); });

    const links = [
      [[-0.4, 0.05, -0.7], [0.4, 0.05, -0.7], C.sec],
      [[-0.4, 0.05, 0.7], [0.4, 0.05, 0.7], C.lang],
      [[-1.2, 0.05, -0.3], [-1.2, 0.05, 0.3], 0xeeeeee],
      [[1.2, 0.05, -0.3], [1.2, 0.05, 0.3], 0x2a2a2a],
    ];
    const curves = links.map(([a, b, col]) => {
      const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b);
      const mid = A.clone().lerp(B, 0.5); mid.y = 0.75;
      const curve = new THREE.CatmullRomCurve3([A, A.clone().setY(0.35), mid, B.clone().setY(0.35), B]);
      g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 60, 0.03, 8), mat(col, { roughness: 0.5 })));
      return curve;
    });
    const bitMat = new THREE.MeshBasicMaterial({ color: 0xbcd3ff, toneMapped: false });
    const bits = curves.map(() => {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 10), bitMat);
      g.add(s);
      return s;
    });

    return {
      group: g, camZ: 11,
      update(t, p) {
        bits.forEach((s, i) => s.position.copy(curves[i].getPoint((t * 0.5 + i * 0.25) % 1)));
        g.rotation.x = 0.8;
        g.rotation.y = -0.45 + p * 0.9 + t * 0.04;
      },
    };
  },

  // ㅎ(G) 키캡. 눌릴 때마다 소리 고리가 퍼짐
  kdaa() {
    const g = new THREE.Group();
    const capGeo = new RoundedBoxGeometry(2, 1.1, 2, 6, 0.24);
    const pos = capGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const s = 1 - 0.16 * ((y + 0.55) / 1.1);
      pos.setX(i, pos.getX(i) * s);
      pos.setZ(i, pos.getZ(i) * s);
    }
    capGeo.computeVertexNormals();
    const cap = new THREE.Group();
    cap.add(new THREE.Mesh(capGeo, mat(0xf0f0f0, { roughness: 0.6, clearcoat: 0.15 })));

    const { tex } = canvasTexture(512, 512, (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#2a2a2a';
      ctx.font = `600 120px ${FONT}`;
      ctx.textBaseline = 'top';
      ctx.fillText('G', 70, 60);
      ctx.fillStyle = '#C23B5A';
      ctx.font = `700 220px ${FONT}`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText('ㅎ', w - 60, h - 70);
    });
    const legend = new THREE.Mesh(
      new THREE.PlaneGeometry(1.35, 1.35),
      new THREE.MeshStandardMaterial({ map: tex, transparent: true, roughness: 0.6, polygonOffset: true, polygonOffsetFactor: -2 }),
    );
    legend.rotation.x = -Math.PI / 2;
    legend.position.y = 0.552;
    cap.add(legend);
    g.add(cap);

    const plate = rbox(3.4, 0.16, 3.4, 0.06, mat(0x2b2b2b, { roughness: 0.7 }));
    plate.position.y = -0.78;
    g.add(plate);

    const rings = [0, 1, 2].map(() => {
      const r = new THREE.Mesh(
        new THREE.TorusGeometry(1, 0.018, 8, 120),
        new THREE.MeshBasicMaterial({ color: C.sec, transparent: true, toneMapped: false }),
      );
      r.rotation.x = Math.PI / 2;
      r.position.y = -0.68;
      g.add(r);
      return r;
    });

    const CYCLE = 2.4;
    return {
      group: g, camZ: 10,
      update(t, p) {
        const c = (t % CYCLE) / CYCLE;
        const press = c < 0.12 ? Math.sin((c / 0.12) * Math.PI) : 0;
        cap.position.y = -0.16 * press;
        rings.forEach((r, i) => {
          const k = clamp(c * 1.25 - i * 0.14);
          r.scale.setScalar(1.6 + k * 2.4);
          r.material.opacity = REDUCE ? 0 : (k > 0 && k < 1 ? (1 - k) * 0.9 : 0);
        });
        g.rotation.x = 0.55;
        g.rotation.y = -0.65 + p * 0.9;
      },
    };
  },

  // 부팅 메시지가 찍히는 모니터
  os() {
    const g = new THREE.Group();
    const shell = mat(0xd9d9d9, { roughness: 0.55 });
    g.add(rbox(3.3, 2.6, 1.5, 0.16, shell));
    const back = rbox(2.5, 2.0, 1.3, 0.2, shell);
    back.position.z = -0.95;
    g.add(back);
    const neck = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.35, 0.6), shell);
    neck.position.set(0, -1.45, -0.3);
    g.add(neck);
    const base = rbox(2.0, 0.14, 1.4, 0.06, shell);
    base.position.set(0, -1.65, -0.3);
    g.add(base);

    const bezel = rbox(2.85, 2.15, 0.06, 0.03, mat(0x0c0c0c, { roughness: 0.4 }));
    bezel.position.z = 0.74;
    g.add(bezel);

    const LINES = [
      'regx64 hobby os',
      'booting from disk...',
      'loading kernel',
      'entering 32-bit protected mode',
      'paging enabled',
      'entering 64-bit long mode',
      'kernel_main()',
      'vga: 80x25 text mode ready',
    ];
    const TOTAL = LINES.join('').length;
    const { tex, ctx } = canvasTexture(640, 480, () => {});
    function draw(n, cursorOn) {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, 640, 480);
      ctx.font = `26px ${MONO}`;
      ctx.textBaseline = 'top';
      let left = n, y = 34, lastX = 30;
      for (let i = 0; i < LINES.length && left > 0; i++) {
        const s = LINES[i].slice(0, left);
        left -= LINES[i].length;
        ctx.fillStyle = i === 0 ? '#55FFFF' : '#AAAAAA';
        ctx.fillText(s, 30, y);
        lastX = 30 + ctx.measureText(s).width;
        if (left > 0) { y += 44; lastX = 30; }
      }
      if (n >= TOTAL) { y += 44; ctx.fillStyle = '#AAAAAA'; ctx.fillText('>', 30, y); lastX = 56; }
      if (cursorOn) { ctx.fillStyle = '#AAAAAA'; ctx.fillRect(lastX + 4, y + 22, 16, 4); }
      tex.needsUpdate = true;
    }
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(2.6, 1.95),
      new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }),
    );
    screen.position.z = 0.78;
    g.add(screen);

    let lastKey = '';
    return {
      group: g, camZ: 11,
      update(t, p) {
        const loop = TOTAL / 22 + 3;
        const n = REDUCE ? TOTAL : Math.min(TOTAL, Math.floor((t % loop) * 22));
        const cursor = Math.floor(t * 2) % 2 === 0;
        const key = n + ':' + cursor;
        if (key !== lastKey) { draw(n, cursor); lastKey = key; }
        g.rotation.x = 0.06;
        g.rotation.y = -0.55 + p * 0.8;
      },
    };
  },

  // 목화 솜
  cotton() {
    const g = new THREE.Group();
    const fluff = new THREE.MeshPhysicalMaterial({
      color: 0xfafafa, roughness: 1, sheen: 1, sheenRoughness: 0.7, sheenColor: 0xffffff,
    });
    const rand = seeded(7);
    const sphere = new THREE.SphereGeometry(1, 32, 20);
    for (let l = 0; l < 5; l++) {
      const a = (l / 5) * Math.PI * 2;
      const cx = Math.cos(a) * 0.62, cz = Math.sin(a) * 0.62;
      for (let k = 0; k < 8; k++) {
        const s = new THREE.Mesh(sphere, fluff);
        s.scale.setScalar(0.34 + rand() * 0.16);
        s.position.set(cx + (rand() - 0.5) * 0.5, 0.25 + (rand() - 0.3) * 0.6, cz + (rand() - 0.5) * 0.5);
        g.add(s);
      }
    }
    const top = new THREE.Mesh(sphere, fluff);
    top.scale.setScalar(0.55);
    top.position.y = 0.55;
    g.add(top);

    const leaf = new THREE.Shape();
    leaf.moveTo(0, 0);
    leaf.quadraticCurveTo(0.42, 0.55, 0, 1.3);
    leaf.quadraticCurveTo(-0.42, 0.55, 0, 0);
    const leafGeo = new THREE.ExtrudeGeometry(leaf, { depth: 0.03, bevelEnabled: false, curveSegments: 16 });
    const brown = mat(0x5e4220, { roughness: 0.8, side: THREE.DoubleSide });
    for (let i = 0; i < 5; i++) {
      const holder = new THREE.Group();
      holder.rotation.y = (i / 5) * Math.PI * 2 + 0.6;
      const m = new THREE.Mesh(leafGeo, brown);
      m.rotation.x = 1.95;
      m.position.y = -0.25;
      holder.add(m);
      g.add(holder);
    }
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 1.4, 12), brown);
    stem.position.y = -0.95;
    g.add(stem);

    return {
      group: g, camZ: 9,
      update(t, p) {
        g.rotation.x = 0.3;
        g.rotation.y = t * 0.15 + p * 1.2;
        g.position.y = 0.15 + Math.sin(t * 0.9) * 0.05;
      },
    };
  },

  // 위에서 한 장씩 떨어져 쌓이는 문서
  percentage() {
    const g = new THREE.Group();
    const N = 9;
    const rand = seeded(3);
    const pages = [];
    for (let i = 0; i < N; i++) {
      const shade = i % 2 ? 0xf7f7f7 : 0xeeeeee;
      const m = rbox(2.4, 0.08, 3.0, 0.025, mat(shade, { roughness: 0.8 }));
      m.userData = { y: i * 0.11, r: (rand() - 0.5) * 0.18, x: (rand() - 0.5) * 0.12 };
      g.add(m);
      pages.push(m);
    }
    const r2 = seeded(11);
    const { tex } = canvasTexture(480, 600, (ctx, w, h) => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#7A5BC7';
      ctx.font = `800 170px ${FONT}`;
      ctx.textBaseline = 'top';
      ctx.fillText('%', 40, 30);
      ctx.fillStyle = '#1d1d1d';
      ctx.font = `700 44px ${FONT}`;
      ctx.fillText('Percentage', 44, 230);
      lines(ctx, 44, 310, 392, 6, 34, '#c9c9c9', r2);
      lines(ctx, 44, 530, 392, 2, 34, '#c9c9c9', r2);
    });
    const face = new THREE.Mesh(
      new THREE.PlaneGeometry(2.3, 2.875),
      new THREE.MeshStandardMaterial({ map: tex, roughness: 0.85, polygonOffset: true, polygonOffsetFactor: -2 }),
    );
    face.rotation.x = -Math.PI / 2;
    face.position.y = 0.041;
    pages[N - 1].add(face);

    return {
      group: g, camZ: 11,
      update(t, p) {
        pages.forEach((m, i) => {
          const k = REDUCE ? 1 : ease((p - 0.15) * 6 - i * 0.1);
          const u = m.userData;
          m.position.set(u.x, u.y + (1 - k) * 2.5, 0);
          m.rotation.y = u.r * k + (1 - k) * 0.6;
          m.visible = k > 0.001;
        });
        g.position.y = -0.5;
        g.rotation.x = 0.6;
        g.rotation.y = -0.5 + p * 0.5;
      },
    };
  },

  // 턴테이블
  player() {
    const g = new THREE.Group();
    g.add(rbox(4.6, 0.36, 3.9, 0.08, mat(0xe2e2e2, { roughness: 0.35, metalness: 0.2 })));
    const platter = new THREE.Mesh(new THREE.CylinderGeometry(1.85, 1.85, 0.08, 96), mat(0x9a9a9a, { metalness: 1, roughness: 0.3 }));
    platter.position.set(-0.3, 0.22, 0);
    g.add(platter);

    const { tex } = canvasTexture(1024, 1024, (ctx, w) => {
      const c = w / 2;
      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, w, w);
      for (let r = 200; r < 500; r += 3) {
        ctx.strokeStyle = r % 9 === 0 ? '#262626' : '#181818';
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.arc(c, c, r, 0, Math.PI * 2); ctx.stroke();
      }
      ctx.fillStyle = '#7A5BC7';
      ctx.beginPath(); ctx.arc(c, c, 175, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = `700 50px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.fillText('MUSIC', c, c - 60);
      ctx.fillStyle = '#e8e8e8';
      ctx.beginPath(); ctx.arc(c, c, 14, 0, Math.PI * 2); ctx.fill();
    });
    const vinylSide = mat(0x111111, { roughness: 0.4 });
    const vinylTop = new THREE.MeshPhysicalMaterial({ map: tex, roughness: 0.38, clearcoat: 1, clearcoatRoughness: 0.2 });
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.8, 0.04, 128), [vinylSide, vinylTop, vinylSide]);
    disc.position.set(-0.3, 0.28, 0);
    g.add(disc);

    const arm = new THREE.Group();
    arm.position.set(1.75, 0.25, -1.35);
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.35, 24), mat(0x333333, { metalness: 0.6, roughness: 0.35 }));
    post.position.y = 0.15;
    arm.add(post);
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.2, 12), mat(0xd6d6d6, { metalness: 1, roughness: 0.2 }));
    rod.rotation.x = Math.PI / 2;
    rod.position.set(0, 0.32, 1.1);
    arm.add(rod);
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.1, 0.38), mat(0x222222));
    head.position.set(0, 0.28, 2.25);
    arm.add(head);
    arm.rotation.y = -0.42;
    g.add(arm);

    return {
      group: g, camZ: 11,
      update(t, p) {
        disc.rotation.y = -t * 1.2;
        g.rotation.x = 0.62;
        g.rotation.y = -0.35 + p * 0.7;
      },
    };
  },

  // 원형 이퀄라이저 + 가운데 내려받기 화살표
  muxic() {
    const g = new THREE.Group();
    const COUNT = 32;
    const barGeo = new RoundedBoxGeometry(0.13, 1, 0.3, 2, 0.04);
    barGeo.translate(0, 0.5, 0);
    const barMat = mat(C.app, { roughness: 0.3, clearcoat: 0.6 });
    const bars = [];
    for (let i = 0; i < COUNT; i++) {
      const a = (i / COUNT) * Math.PI * 2;
      const b = new THREE.Mesh(barGeo, barMat);
      b.position.set(Math.cos(a) * 1.55, 0, Math.sin(a) * 1.55);
      b.rotation.y = -a;
      g.add(b);
      bars.push(b);
    }
    const base = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.1, 0.1, 96), mat(0xdddddd, { roughness: 0.4 }));
    base.position.y = -0.06;
    g.add(base);

    const arrow = new THREE.Shape();
    arrow.moveTo(-0.18, 0.5); arrow.lineTo(0.18, 0.5); arrow.lineTo(0.18, 0);
    arrow.lineTo(0.42, 0); arrow.lineTo(0, -0.48); arrow.lineTo(-0.42, 0);
    arrow.lineTo(-0.18, 0); arrow.closePath();
    const arrowGeo = new THREE.ExtrudeGeometry(arrow, {
      depth: 0.16, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 3,
    });
    arrowGeo.center();
    const arr = new THREE.Mesh(arrowGeo, mat(0x1d1d1d, { roughness: 0.35, clearcoat: 0.5 }));
    arr.position.y = 0.75;
    g.add(arr);

    return {
      group: g, camZ: 10,
      update(t, p) {
        bars.forEach((b, i) => {
          const h = REDUCE
            ? 0.4 + 0.6 * Math.abs(Math.sin(i * 0.7))
            : 0.25 + 1.3 * Math.abs(Math.sin(t * 2.1 + i * 0.55) * Math.cos(t * 1.3 + i * 0.21));
          b.scale.y = h;
        });
        arr.position.y = 0.8 + Math.sin(t * 2) * 0.1;
        arr.rotation.y = -g.rotation.y;
        g.position.y = -0.4;
        g.rotation.x = 0.5;
        g.rotation.y = p * 1.2 + t * 0.1;
      },
    };
  },

  // 부채꼴로 펼쳐지는 논문 원고
  ksca() {
    const g = new THREE.Group();
    const W = 2.1, H = 2.97;
    const sheets = [];
    const r = seeded(5);
    for (let i = 0; i < 5; i++) {
      const pivot = new THREE.Group();
      pivot.position.y = i * 0.03;
      const top = i === 4;
      let m;
      if (top) {
        const { tex } = canvasTexture(420, 594, (ctx, w, h) => {
          ctx.fillStyle = '#fff';
          ctx.fillRect(0, 0, w, h);
          ctx.fillStyle = '#1d1d1d';
          lines(ctx, 50, 60, 320, 2, 30, '#1d1d1d', r);
          lines(ctx, 110, 140, 200, 1, 22, '#9a9a9a', r);
          lines(ctx, 50, 200, 320, 5, 22, '#c4c4c4', r);
          lines(ctx, 50, 340, 150, 7, 22, '#c4c4c4', r);
          lines(ctx, 220, 340, 150, 7, 22, '#c4c4c4', r);
          ctx.strokeStyle = '#7A5BC7';
          ctx.lineWidth = 5;
          ctx.beginPath(); ctx.arc(330, 520, 42, 0, Math.PI * 2); ctx.stroke();
          ctx.fillStyle = '#7A5BC7';
          ctx.font = `800 24px ${FONT}`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('KSCA', 330, 521);
        });
        const paper = mat(0xffffff, { roughness: 0.85 });
        const face = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.85 });
        m = new THREE.Mesh(new THREE.BoxGeometry(W, 0.02, H), [paper, paper, face, paper, paper, paper]);
      } else {
        m = new THREE.Mesh(new THREE.BoxGeometry(W, 0.02, H), mat(i % 2 ? 0xf2f2f2 : 0xe9e9e9, { roughness: 0.85 }));
      }
      m.position.set(W / 2, 0, -H / 2);
      pivot.add(m);
      g.add(pivot);
      sheets.push(pivot);
    }
    return {
      group: g, camZ: 11,
      update(t, p) {
        const fan = REDUCE ? 1 : ease((p - 0.2) * 2.2);
        sheets.forEach((s, i) => { s.rotation.y = (4 - i) * 0.17 * fan; });
        g.position.set(-1.1, -0.3, 1.2);
        g.rotation.x = 0.75;
        g.rotation.y = -0.15 + p * 0.3;
      },
    };
  },
};

/* ---------- 장면 준비 ---------- */

const stages = [...document.querySelectorAll('[data-model]')].flatMap((el) => {
  const make = MODELS[el.dataset.model];
  if (!make) return [];
  const m = make();
  const scene = new THREE.Scene();
  scene.environment = envTex;
  const key = new THREE.DirectionalLight(0xffffff, 1.3);
  key.position.set(3, 6, 5);
  scene.add(key);
  scene.add(m.group);
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  return [{ el, scene, camera, ...m }];
});

/* ---------- 렌더 루프 ---------- */

function frame(ms) {
  const t = REDUCE ? 0 : ms / 1000;
  const W = document.documentElement.clientWidth, H = window.innerHeight;
  canvas.style.height = H + 'px';
  canvas.style.transform = `translateY(${window.scrollY}px)`;
  const pr = renderer.getPixelRatio();
  if (canvas.width !== Math.floor(W * pr) || canvas.height !== Math.floor(H * pr)) {
    renderer.setSize(W, H, false);
  }

  renderer.setScissor(0, 0, W, H);
  renderer.clear();

  for (const s of stages) {
    const r = s.el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > H || r.width === 0 || r.height === 0) continue;

    const p = clamp((H - r.top) / (H + r.height));
    s.update(t, p);

    const aspect = r.width / r.height;
    s.camera.aspect = aspect;
    s.camera.position.set(0, 0, s.camZ / Math.min(1, aspect));
    s.camera.updateProjectionMatrix();

    const y = H - r.bottom;
    renderer.setViewport(r.left, y, r.width, r.height);
    renderer.setScissor(r.left, y, r.width, r.height);
    renderer.render(s.scene, s.camera);
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);