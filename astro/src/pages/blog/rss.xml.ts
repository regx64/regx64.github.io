import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { allPosts } from '../../lib/blog';

export async function GET(context: APIContext) {
  const posts = await allPosts();
  return rss({
    title: 'regx64 블로그',
    description: '음악, 작곡, 취미 등 코드 밖의 이야기',
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: `/blog/${p.slug}/`,
      categories: [p.data.category, ...p.data.tags],
    })),
    customData: '<language>ko</language>',
  });
}
