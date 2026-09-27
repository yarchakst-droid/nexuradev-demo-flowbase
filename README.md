# MODA — cinematic lookbook (formerly the Flowbase demo)

Deployed at `flowbase.nexuradev.com` (domain kept from the previous demo; content fully
replaced). This repo no longer hosts the Flowbase no-code-automation concept — it now
serves a single self-contained static page: a cinematic fashion/e-commerce product
preview, source-identical to `portfolio-demos/07-moda-lookbook/index.html`.

## How it's served

The Next.js app around it is now just a thin host for the static file, kept only
because the existing PM2 + Nginx + Cloudflare Tunnel + GitHub Actions pipeline for this
domain expects a `next build` / `next start` process on port 3213:

- `public/moda.html` — the actual page (copy of `portfolio-demos/07-moda-lookbook/index.html`).
- `src/app/route.ts` — a Route Handler at `/` that reads `public/moda.html` and returns
  it verbatim as `text/html`. It bypasses `layout.tsx`/React rendering entirely, so the
  static document's own `<html>/<head>/<body>` isn't double-wrapped.
- `src/app/layout.tsx` — inert passthrough (`return children`), kept only because the
  App Router expects a root layout file to exist; it's never actually rendered since
  there's no `page.tsx` anywhere in the app anymore.
- `next.config.ts` — CSP updated (`media-src`, `style-src`, `font-src`) to allow the
  page's Cloudflare R2 video assets and Google Fonts; everything else (headers, PM2
  config, GitHub Actions workflow, `package.json`) left untouched from the Flowbase era.

All of the old Flowbase-specific code (pipeline canvas, workspace, pricing, waitlist
API routes, 3D graph hero) was deleted — nothing referenced it once `/` stopped needing
it.

## Updating the page

Edit `portfolio-demos/07-moda-lookbook/index.html` (the canonical source) and copy it
over `public/moda.html` here, then commit + push to `master` to redeploy.
