<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# UFP site (ufpcombat.com)

Site for the UFP fight promotion (MMA + Boxing). Next.js 16 App Router + TypeScript + Tailwind v4 + next-intl + zod.

## Language policy — read this first

Two different languages are in play. Do not mix them up.

- **The code is English.** Comments, JSDoc, identifiers, type names, commit messages, and dev-facing docs (`AGENTS.md`, `README.md`) are all written in English.
- **The product is Spanish.** Spanish is the site's default language and lives at `/`; English is a translation served under `/en`.

Everything that reaches the browser stays Spanish-first and must never be "translated" as part of a code cleanup:

- UI strings in `src/i18n/messages/es.json`
- Content values in `src/data/*.ts` — fighter names, event titles, ticket zones, product names, venues
- **Route segments** — `/evento`, `/peleador`, `/inscripcion`, `/patrocinadores`, `/tienda`. These are public URLs and SEO surface; renaming them breaks live links.
- **DOM ids used as nav anchors** — `#boletos`, `#tienda`, `#peleadores`, etc.
- **i18n message keys** and **data slugs**

Rule of thumb: if a string crosses the boundary into the browser (URL, DOM id, rendered text, message key), it stays Spanish. If it only exists for developers, it's English.

## Owner's explicit principles

- **DRY**: anything repeated gets abstracted into a shared component or utility.
- **Descriptive names** and clean code.
- **Data-scalable**: adding an event or a fighter means adding an object to `src/data/*.ts` — never duplicating markup.

## Git conventions

- **Commits carry no co-author.** No `Co-Authored-By:` trailers, no "Generated with…" lines. The message ends on its last line of content.
- **Commit messages are written in English**, imperative or phase-prefixed (`F0:`, `Fix:`, `Docs:`), describing the *what* and the *why*.

## Architecture

- `src/data/` — typed content (fake CMS). `types.ts` defines the models; `index.ts` holds the selectors (the single access point, and the swap point for a real CMS). Fighters are referenced by `slug`; fight corners accept opponents from outside the roster (name + record only).
- `src/i18n/` — next-intl: ES at `/` (default, unprefixed), EN under `/en`. UI strings live in `messages/{es,en}.json`; content lives in the data modules as `Localized {es,en}` and is resolved with `L()` from `src/lib/localize.ts`. Brand names (events, nicknames) are not translated. Locale routing runs through `src/proxy.ts` (what earlier Next versions called `middleware.ts`).
- `src/components/` — `ui/` (Section, SectionHeading, CtaButton, OutlineText, PlaceholderImage, Reveal), `layout/`, `event/`, `fighter/`, `rankings/`, `shop/`, `forms/`, `home/` (section compositions).
- Design tokens in `src/app/globals.css` (`@theme`): ink/surface (blacks), blood (#C1121F), cream (#F2ECE4), win (green). Fonts: Anton (display), Barlow Condensed (labels), Barlow (body). Border radius is 0 everywhere.
- Images: `PlaceholderImage` renders CSS stripes until a real `src` is passed.
- Forms: server actions in `src/actions/` with zod (`src/lib/schemas.ts`) — they only log today; that's where email/CRM gets wired in.
- 404s: `[locale]/not-found.tsx` for missing slugs (inherits nav/footer); `app/global-not-found.tsx` for unmatched URLs and invalid locales (requires `experimental.globalNotFound`, and ships its own fonts and styles because it bypasses the normal render).
- `Reveal` animates with `IntersectionObserver` + the `--animate-rise` CSS keyframes, not with a JS animation library: the server HTML renders visible, so a JS failure can never leave a blank page.
- The home and event pages are ISR (`revalidate = 3600`). Which event counts as "upcoming" is decided against the real current date, and that comparison is frozen at prerender time — revalidation is what keeps it honest without a redeploy.

## Regional settings

The promotion is based in **Colombia**: prices in **COP**, dates and numbers formatted with `es-CO`, event times in `America/Bogota`. The upcoming event is **UFP 6** (7 Aug 2026) at Movistar Arena, Bogotá.

Ticket CTAs open WhatsApp with a per-zone prefilled message, built from `site.whatsappNumber` in `src/data/site.ts`. **That number is still a placeholder** — it must be replaced before launch.

## Accessibility

- Minimum AA contrast (4.5:1) against `ink`: cream at `/55` or higher (`/65` for 10–11px text). For small text in red use `blood-hover` (4.65:1), never `blood` (3.15:1). On a `bg-blood` surface, text is `cream`, not `ink`.
- Known debt: cream on `bg-blood` lands at 4.1:1 — fine for large text, short of AA for small text. Closing it fully means moving those plates to `blood-deep`, which is a pending design decision.
- Dialogs (cart, mobile menu): `role="dialog"` + `aria-modal`, focus moved in on open and returned on close, Escape to dismiss, and body scroll locked.

## Commands

- `npm run dev` / `npm run build` / `npm run lint` / `npx tsc --noEmit`
- Local Docker: `docker build --network=host -t ufp-site .` (Docker's bridge has no internet on this machine; the flag isn't needed on the VPS).
- Deploy: see `DEPLOY.md` (Docker + Caddy on the VPS, domain ufpcombat.com). Operator-facing docs (`DEPLOY.md`, `LANZAMIENTO.md`, `MANUAL.md`) are deliberately kept in Spanish — the owner reads them.
