import { getCollection, type CollectionEntry } from 'astro:content';

export interface JournalItem {
  slug: string;                     // URL slug (filename without folder/extension)
  type: 'note' | 'post';
  date: Date;
  title?: string;
  dek?: string;
  entry: CollectionEntry<'journal'>;
}

// Pull a YYYY-MM-DD date out of an id/filename, if present.
function dateFromId(id: string): Date | null {
  const m = id.match(/(\d{4})-(\d{2})-(\d{2})/);
  return m ? new Date(`${m[1]}-${m[2]}-${m[3]}T00:00:00Z`) : null;
}

function toItem(entry: CollectionEntry<'journal'>): JournalItem {
  const id = entry.id; // e.g. "notes/2026-08-16" or "posts/the-comfort-trap"
  const type: JournalItem['type'] = id.startsWith('posts/') ? 'post' : 'note';
  const slug = id.split('/').pop()!;
  const date = entry.data.date ?? dateFromId(id) ?? new Date(0);
  return {
    slug,
    type,
    date,
    title: entry.data.title,
    dek: entry.data.dek,
    entry,
  };
}

// All journal items, newest first.
export async function getJournalItems(): Promise<JournalItem[]> {
  const entries = await getCollection('journal');
  return entries.map(toItem).sort((a, b) => b.date.valueOf() - a.date.valueOf());
}
