import type { APIContext } from 'astro';
import { allNotes } from '../lib/notes';
import { allPosts } from '../lib/blog';

// 루트의 정적 페이지는 Astro 밖에 있어서 여기에 직접 적는다. 페이지를 추가하면 이 목록에도 넣을 것
const STATIC_PAGES = [
  '/', '/en/', '/cv/',
  '/systolic/', '/kdaa/', '/hobby-os/', '/cotton/',
  '/percentage/', '/music-player/', '/muxic/', '/ksca/',
];

export async function GET(context: APIContext) {
  const site = context.site!;
  const notes = await allNotes();
  const posts = await allPosts();
  const day = (d: Date) => d.toISOString().slice(0, 10);

  const urls: { loc: string; lastmod?: string }[] = [
    ...STATIC_PAGES.map((p) => ({ loc: p })),
    { loc: '/notes/', lastmod: notes[0] && day(notes[0].data.date) },
    ...notes.map((n) => ({ loc: `/notes/${n.slug}/`, lastmod: day(n.data.date) })),
    { loc: '/blog/', lastmod: posts[0] && day(posts[0].data.date) },
    { loc: '/blog/listen/' },
    ...posts.map((p) => ({ loc: `/blog/${p.slug}/`, lastmod: day(p.data.date) })),
  ];

  const body = urls
    .map((u) => `  <url><loc>${new URL(encodeURI(u.loc), site).href}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`)
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
}
