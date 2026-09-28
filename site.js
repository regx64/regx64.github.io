// 3D와 상관없는 페이지 동작: 스크롤하면 떠오르는 요소, 상단 바 상태.
// main.js(WebGL)가 실패해도 이 파일은 따로 돌아갑니다.
(() => {
  const root = document.documentElement;
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 떠오르는 요소 ---------- */
  const items = document.querySelectorAll('.reveal');
  if (REDUCE || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    items.forEach((el) => io.observe(el));
  }

  /* ---------- 방문 통계 (GoatCounter, 쿠키 없음) ----------
     goatcounter.com에서 만든 코드 이름을 넣으면 켜짐. 비어 있으면 아무것도 안 함 */
  const GOATCOUNTER = 'redbeanof';
  if (GOATCOUNTER && location.hostname === 'regx64.kro.kr') {
    const gc = document.createElement('script');
    gc.async = true;
    gc.src = 'https://gc.zgo.at/count.js';
    gc.dataset.goatcounter = `https://${GOATCOUNTER}.goatcounter.com/count`;
    document.head.appendChild(gc);
  }

  /* ---------- 프로젝트 페이지의 수정일과 저장소 최근 활동 ---------- */
  const upd = document.querySelector('.updated[data-page]');
  if (upd) showUpdated(upd);

  async function showUpdated(el) {
    const fmt = (iso) => iso.slice(0, 10).replaceAll('-', '. ') + '.';
    const ago = (iso) => {
      const days = Math.floor((Date.now() - new Date(iso)) / 86400000);
      if (days < 1) return '오늘';
      if (days < 30) return `${days}일 전`;
      if (days < 365) return `${Math.floor(days / 30)}개월 전`;
      return `${Math.floor(days / 365)}년 전`;
    };
    const cached = (key, load) => {
      try { const v = sessionStorage.getItem(key); if (v) return Promise.resolve(JSON.parse(v)); } catch (e) {}
      return load().then((v) => { try { sessionStorage.setItem(key, JSON.stringify(v)); } catch (e) {} return v; });
    };
    const parts = [];
    try {
      const map = await cached('updated.json', () => fetch('/updated.json').then((r) => (r.ok ? r.json() : {})));
      if (map[el.dataset.page]) parts.push(`이 페이지 수정 ${fmt(map[el.dataset.page])}`);
    } catch (e) {}
    if (el.dataset.repo) {
      try {
        const repo = await cached('repo:' + el.dataset.repo, () =>
          fetch(`https://api.github.com/repos/${el.dataset.repo}`).then((r) => (r.ok ? r.json() : {})).then((j) => ({ pushed_at: j.pushed_at })));
        if (repo.pushed_at) parts.push(`저장소 최근 커밋 ${ago(repo.pushed_at)}`);
      } catch (e) {}
    }
    if (parts.length) { el.textContent = parts.join(' · '); el.hidden = false; }
  }

  /* ---------- 상단 바: 스크롤하면 경계선, 어두운 구간 위에서는 어두운 바 ---------- */
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const darks = [...document.querySelectorAll('.dark, .tone-dark')];
  const theme = document.querySelector('meta[name="theme-color"]');
  const DARK = matchMedia('(prefers-color-scheme: dark)');
  let ticking = false;

  function update() {
    ticking = false;
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
    const y = nav.offsetHeight / 2;
    const onDark = darks.some((el) => {
      const r = el.getBoundingClientRect();
      return r.top <= y && r.bottom >= y;
    });
    nav.classList.toggle('on-dark', onDark);
    if (theme) theme.setAttribute('content', onDark || DARK.matches ? '#000000' : '#FFFFFF');
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();

  root.classList.add('ready');
})();
