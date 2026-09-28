import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

// draft: true 인 글은 개발 서버에서만 보이고 배포에서는 빠짐
export async function allPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function allCategories(posts?: Post[]): Promise<string[]> {
  const all = posts ?? (await allPosts());
  const count = new Map<string, number>();
  all.forEach((p) => count.set(p.data.category, (count.get(p.data.category) ?? 0) + 1));
  return [...count.keys()].sort((a, b) => (count.get(b)! - count.get(a)!) || a.localeCompare(b, 'ko'));
}

// 카테고리 이름을 라우트 파라미터로 그대로 씀 (공백 없는 한글/영문 토큰만 사용할 것)
export function categorySlug(name: string): string {
  return name;
}

export function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10).replaceAll('-', '.');
}
