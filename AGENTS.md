# ronakjethwa.com

Ronak's personal site, built with Astro 7 and deployed on Netlify (`@astrojs/netlify` adapter). It should read like a person, not a résumé: warm, minimal, single column, no cards and no navbar. It has four pages: Home, Work, Journal and About.

`CLAUDE.md` links to this file, so every coding assistant reads the same instructions.

## Commands

- `astro dev --background` starts the dev server. Manage it with `astro dev stop`, `astro dev status` and `astro dev logs`.
- `npm run build` builds into `dist/`.
- `npx astro check` type-checks the project. A Claude Code hook (`.claude/settings.json`) runs it automatically after edits to `src/` code files, so fix any errors it reports before moving on.

## Layout

- `src/pages/`:
  - `index.astro`, `work.astro`, `about.astro`
  - `journal/` (index, `page/[n]`, `[slug]`)
  - `api/now-playing.ts`
- `src/layouts/Layout.astro` and `src/components/` (`Footer`, `EntryList`).
- `src/data/*.json` (`books`, `convictions`, `now`): editable copy lives here, not in templates.
  - The About page's "Now" date comes from the last change to `now.json`, so never hard-code it.
- `src/config.ts` holds site switches:
  - `JOURNAL_PAGE_SIZE`
  - `SPOTIFY_WIDGET_ENABLED`, currently `false`. The widget is built but switched off until the serverless token exchange is wired up.

## Journal: the folder is the type

- `src/content/journal/notes/YYYY-MM-DD.md`: raw notes. No frontmatter; the date comes from the filename. They render in full in the listing.
- `src/content/journal/posts/<slug>.md`: titled posts, with `date`, `title` and `dek` frontmatter. They show as a preview in the listing and get their own page.
- `src/utils/journal.ts` (`getJournalItems()`) normalises both types. URLs are `/journal/<slug-or-date>`.

## Design system (`src/styles/global.css`)

- Colours: use the tokens only.
  - `--bg` `#F6F3ED` paper, `--ink` `#2B2A28`, `--accent` `#3E4A5C` dusty indigo.
  - `--sage` `#687150` (darkened for WCAG AA, so keep it), `--stone` `#C9C2B4` for hairlines.
- Three fonts, each with its own job, and no crossing over:
  - `--font-display` Fraunces: ledes, convictions, names. Italic indigo marks the key word.
  - `--font-body` Source Sans 3: all prose.
  - `--font-mono` JetBrains Mono: small uppercase labels, kickers and dates only. Never sentences.
- No tiny text. Anything sentence-length sits around 0.95–1.05rem. Sizes of 0.6–0.65rem are only for true labels. Anything under 0.8rem for prose has been flagged repeatedly.
- Inner pages share the same header: back-link, mono kicker, one `.page-lede`. Use single hairlines, never stacked borders. Keep whitespace generous.

## Astro gotchas

- A newline before a link swallows the space: `text\n  <a ...>` renders as `textlink`. Keep the word and `<a` on the same line, and break inside the tag instead:
  ```astro
  the <a
    href="...">résumé</a>
  ```
- `getStaticPaths` runs in its own scope, so constants declared at the top of the module aren't visible inside it. Import them instead.

## Workflow

- Branch, then open a PR. Netlify deploys every push to `main` to production.
- The CSP is set in `netlify.toml`, and inline scripts are allowed only by `sha256` hash (Google Analytics). Changing an inline script means recomputing and updating its hash, or the browser blocks it.
- Ronak reviews visually. Show rendered options for design changes rather than describing them.

## Astro docs

Full docs are at https://docs.astro.build. Check the relevant guide before working on [routing](https://docs.astro.build/en/guides/routing/), [components](https://docs.astro.build/en/basics/astro-components/), [content collections](https://docs.astro.build/en/guides/content-collections/) or [styling](https://docs.astro.build/en/guides/styling/).
