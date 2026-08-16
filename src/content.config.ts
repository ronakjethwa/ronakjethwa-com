import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One journal collection spanning two folders:
//   notes/  — raw notes. No frontmatter needed; the date comes from the filename.
//   posts/  — titled essays. Frontmatter carries date + title + dek.
// The folder an entry lives in decides whether it's a note or a post.
const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    date: z.coerce.date().optional(),
    title: z.string().optional(),
    dek: z.string().optional(),
  }),
});

export const collections = { journal };
