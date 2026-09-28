import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { allNotes } from '../../lib/notes';

export async function GET(context: APIContext) {
  const notes = await allNotes();
  return rss({
    title: 'regx64 엔지니어링 노트',
    description: '실험, 실패한 시도, 측정값, 구현 결정을 기록하는 노트',
    site: context.site!,
    items: notes.map((n) => ({
      title: n.data.title,
      description: n.data.description,
      pubDate: n.data.date,
      link: `/notes/${n.slug}/`,
      categories: n.data.tags,
    })),
    customData: '<language>ko</language>',
  });
}
