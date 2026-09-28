import { defineConfig } from 'astro/config';

// 루트의 정적 페이지(index.html, 프로젝트 페이지)는 Astro 밖에 있고,
// Astro는 /notes/(엔지니어링 노트)와 /blog/(블로그)만 만든다.
// 배포 때 astro/dist를 사이트 루트에 합친다 (.github/workflows/deploy.yml).
export default defineConfig({
  site: 'https://regx64.github.io',
  outDir: './dist',
  trailingSlash: 'always',
});
