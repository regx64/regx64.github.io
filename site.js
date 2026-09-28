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

  /* ---------- 상단 바: 스크롤하면 경계선, 어두운 구간 위에서는 어두운 바 ---------- */
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const darks = [...document.querySelectorAll('.dark, .tone-dark')];
  const theme = document.querySelector('meta[name="theme-color"]');
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
    if (theme) theme.setAttribute('content', onDark ? '#000000' : '#FFFFFF');
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();

  root.classList.add('ready');
})();
