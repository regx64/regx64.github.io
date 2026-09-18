import { getCollection, type CollectionEntry } from 'astro:content';

export type Note = CollectionEntry<'notes'>;

export async function allNotes(): Promise<Note[]> {
  const notes = await getCollection('notes');
  return notes.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// 태그/시리즈 이름을 라우트 파라미터로 그대로 씀 (공백 없는 한글/영문 토큰만 사용할 것)
export function seriesSlug(name: string): string {
  return name;
}

export function tagSlug(name: string): string {
  return name;
}

export async function notesInSeries(series: string, notes?: Note[]): Promise<Note[]> {
  const all = notes ?? (await allNotes());
  return all
    .filter((n) => n.data.series === series)
    .sort((a, b) => (a.data.seriesOrder ?? 0) - (b.data.seriesOrder ?? 0) || a.data.date.valueOf() - b.data.date.valueOf());
}

export async function allTags(notes?: Note[]): Promise<string[]> {
  const all = notes ?? (await allNotes());
  const set = new Set<string>();
  all.forEach((n) => n.data.tags.forEach((t) => set.add(t)));
  return [...set].sort((a, b) => a.localeCompare(b, 'ko'));
}

export async function allSeries(notes?: Note[]): Promise<string[]> {
  const all = notes ?? (await allNotes());
  const set = new Set<string>();
  all.forEach((n) => n.data.series && set.add(n.data.series));
  return [...set].sort((a, b) => a.localeCompare(b, 'ko'));
}
