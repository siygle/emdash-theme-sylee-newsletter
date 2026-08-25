# EmDash Theme: Sylee Newsletter

A GitHub-hosted EmDash theme template inspired by the layout at
https://sylee.dev/newsletter/.

This is an EmDash **theme**, not a runtime skin. Per the EmDash theme spec, a
theme is a complete Astro project plus a seed file that bootstraps collections,
fields, taxonomies, menus, settings, and sample content.

## Design

The template mirrors the newsletter presentation style:

- monochrome palette with warm off-white background
- 960px centered content column
- minimal uppercase top navigation
- oversized heavy masthead typography
- issue/date row above the feature article
- double-line divider: thin line + thick black bar
- date-first archive rows with tag pills
- long-form article pages with strong headings and clean prose rhythm
- social embeds via `emdash-plugin-social-embeds`

## Install

Use it as an Astro template:

```bash
npm create astro@latest -- --template github:siygle/emdash-theme-sylee-newsletter
cd <your-site>
npm install
npm run dev
```

Then open:

```txt
http://localhost:4321/_emdash/admin
```

The EmDash setup wizard will apply `.emdash/seed.json`.

## Cloudflare deploy setup

This template is prepared for Cloudflare Workers with D1, R2, Images, and Worker
Loader bindings.

Before production deploy, update `wrangler.jsonc`:

- `d1_databases[0].database_id`
- `d1_databases[0].database_name`
- `r2_buckets[0].bucket_name`
- `r2_buckets[0].preview_bucket_name`
- `name`

Then run:

```bash
npm run deploy
```

## Content model

The seed file creates:

- `posts` collection, rendered as newsletter issues at `/newsletter/[slug]`
- `pages` collection
- `category` taxonomy with `newsletter`
- `tag` taxonomy with `newsletter`, `cloudflare`, `open-source`, `ai`
- `primary` menu
- sample issues showing archive/detail layouts and social embeds

## Social embeds

The theme installs:

```json
"emdash-plugin-social-embeds": "github:siygle/emdash-plugin-social-embeds#v0.1.1"
```

Use the EmDash editor's **Social Embed** Portable Text block for X/Twitter and
Bluesky posts. YouTube can use either the built-in EmDash `embed` block or the
Social Embed block.

## Routes

- `/` redirects to `/newsletter`
- `/newsletter` first page with featured latest issue
- `/newsletter/page/[page]` numbered archive pages
- `/newsletter/[slug]` single issue
- `/search` live search
- `/rss.xml` RSS feed
- `/tag/[slug]` tag archive

## Notes

EmDash content routes are server-rendered. This template intentionally does not
use `getStaticPaths()` for CMS-driven pages.
