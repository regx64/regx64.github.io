import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    project: z.string().optional(),
    projectHref: z.string().optional(),
    status: z.string().optional(),
  }),
});

export const collections = { notes };
