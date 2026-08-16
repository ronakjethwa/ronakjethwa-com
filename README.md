# ronakjethwa.com

Personal site — warm, minimal, built with [Astro](https://astro.build). Four pages:
Home, Work, Journal, About.

## Develop

```sh
npm install
npm run dev        # local dev server at http://localhost:4321
npm run build      # production build to ./dist
npm run preview    # preview the build locally
```

## Editing content

Content lives in two predictable places — you never need to touch component logic.

### Journal — `src/content/journal/`

Two folders. The folder decides the type.

- **A quick note** → drop a Markdown file in `notes/`, named by date, and just type. No
  frontmatter needed; the date comes from the filename.
  ```
  src/content/journal/notes/2026-08-20.md
  ```
  ```
  a thought I didn't want to lose.
  ```
- **A titled post / essay** → drop a Markdown file in `posts/`, with frontmatter:
  ```
  src/content/journal/posts/some-essay.md
  ```
  ```markdown
  ---
  date: 2026-08-20
  title: Some Essay
  dek: A one-line hook
  ---

  ## A heading
  Full markdown — headings, > quotes, **bold**, lists…
  ```

Notes show inline on the listing; posts show a title + dek + "Read →" and get their own
page. The listing is paginated (`JOURNAL_PAGE_SIZE` in `src/config.ts`).

### About page bits — `src/data/`

- `now.json` — the "Now" block. Editing it auto-updates the "updated" date.
- `books.json` — the reading list.

### Work convictions — `src/data/convictions.json`

### Everything else

- Home lede + About prose live inline in `src/pages/index.astro` and `src/pages/about.astro`.
- Footer links + colophon: `src/components/Footer.astro`.

## Design system

Three fonts, each in its lane (enforced via tokens in `src/styles/global.css`):

- **Fraunces** (serif) — display: ledes, convictions, names
- **Source Sans 3** — body: all prose
- **JetBrains Mono** — small uppercase labels only (kickers, dates, footer)

Palette: warm paper `#F6F3ED`, ink `#2B2A28`, dusty indigo `#3E4A5C`, sage `#8A9174`,
stone `#C9C2B4`.

## Deploy

Static build via Astro, deployed on Netlify.
