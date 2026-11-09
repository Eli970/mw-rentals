# MW Rentals

Marketing and fleet catalog site for **MW Rentals** — short- and long-term car hire, worldwide.

Stack: Vite + React + TypeScript, deployed as a **Cloudflare Worker with static assets** (no Pages project).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local Vite dev server |
| `npm run build` | Typecheck and emit static files to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npx wrangler deploy` | Upload `dist/` as Worker static assets |
| `npx wrangler deploy --dry-run` | Package the Worker without publishing |
| `npm run deploy` | Build, then deploy |

## Cloudflare Workers Builds

Connect this GitHub repository to a Worker named **`mw-rentals`** (must match `wrangler.jsonc`).

Suggested dashboard values under **Workers & Pages → mw-rentals → Settings → Build**:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Preview command | `npx wrangler preview` |
| Root directory | `/` (repo root) |
| Production branch | `main` |

`wrangler.jsonc` sets `preview_urls: true` and an empty `previews` block so PR branches can get a Preview URL instead of deploying to production. In the dashboard also turn on **Settings → Build → Branch control → Enable Preview Builds**. Without that, Cloudflare still posts a **Workers Builds** check on pull requests, points it at the production Worker, and the check fails immediately (this is what failed on PR #2 and PR #3). Pushes to `main` keep using the deploy command.

Workers Builds installs dependencies with `npm ci` when `package-lock.json` is present, then runs the build command, then the deploy or Preview command. Wrangler reads `wrangler.jsonc` and publishes the contents of **`dist/`**.

A GitHub Actions workflow (`.github/workflows/build.yml`) runs `npm ci`, `npm run build`, and `npx wrangler deploy --dry-run` on pull requests so packaging is checked even if the Cloudflare Preview check is still disabled.

No extra Cloudflare products are required (no KV, D1, or R2). After the first deploy you may:

1. Attach a **custom domain** on the Worker.
2. Confirm **workers.dev** is enabled if you want the `*.workers.dev` URL.
3. Enable **Preview Builds** as above so non-`main` branches get a Preview URL.

### Local deploy

```bash
npm ci
npm run build
npx wrangler deploy
```

You will need to be logged in (`npx wrangler login`) or provide `CLOUDFLARE_API_TOKEN`. The Worker name is `mw-rentals`.

## Project layout

- `src/data/cars.json` — fleet catalog `{ name, category, pricePerDay, image, minAge, location }`. Swap this file (or fetch it) when moving the catalog to Sanity.
- `src/config.ts` — brand contact details (email, WhatsApp/phone). Update before going live.
- `public/logo.jpg` — brand mark; also used as favicon and Open Graph image.
- `public/logo.png` — transparent roundel for the navy header.
- `public/hero.webp` — full-width home hero photograph.
- `public/cars/` — studio-style white-background fleet cutouts (all facing left).
- `wrangler.jsonc` — Worker name `mw-rentals`, `compatibility_date` current, `assets.directory` `./dist`, SPA `not_found_handling` so `/privacy` and `/terms` load on refresh.

## Booking form

**Book Now** (nav, fleet cards, footer, concierge section) opens an accessible dialog prefilled with the chosen car. There is **no backend yet**. Submit opens a prefilled WhatsApp chat and a success state with a mailto fallback.

```ts
// TODO: Replace client-side WhatsApp / mailto with a Worker API route
// that stores bookings (Sanity, D1, or email via Resend) and sends a
// confirmation. Keep this form posting JSON matching InquiryPayload.
```

See `src/components/BookingDialog.tsx`.

## Legal pages

`/privacy` and `/terms` are generic car-hire templates for client review, linked in the footer. They are client-routed; Workers serves `index.html` for unknown paths via `assets.not_found_handling: "single-page-application"`.

## Design

Navy `#0b1528`, gold `#c4a35a` (Book now only), and white. Self-hosted **Bricolage Grotesque** (headings) and **Figtree** (body). Photo hero with an overlapping booking bar. Fleet photographs are processed cutouts on white.
