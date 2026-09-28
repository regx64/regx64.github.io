import { defineCollection, z } from 'astro:content';

// 엔지니어링 노트: 실험, 측정, 구현 결정
const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),   // 웹 글쓰기(CMS)가 문자열로 저장해도 날짜로 읽음
    project: z.string().optional(),
    projectHref: z.string().optional(),
    status: z.string().optional(),
    tags: z.array(z.string()).default([]),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
  }),
});

// 블로그: 음악, 작곡, 취미 등 코드 밖의 이야기
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),   // 웹 글쓰기(CMS)가 문자열로 저장해도 날짜로 읽음
    category: z.string(),                 // 음악, 작곡, 취미 ... 자유롭게
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),         // 대표 이미지 경로 (/blog/media/...)
    coverAlt: z.string().optional(),
    audio: z.string().optional(),         // 글 위에 붙는 오디오 (/blog/media/....mp3)
    audioTitle: z.string().optional(),
    youtube: z.string().optional(),       // YouTube 영상 ID
    draft: z.boolean().default(false),    // true면 배포에서 빠짐
  }),
});

export const collections = { notes, blog };
