<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Sitio UFP (ufpcombat.com)

Sitio de la promotora de peleas UFP (MMA + Boxeo). Next.js 16 App Router + TypeScript + Tailwind v4 + next-intl + motion + zod.

## Principios (pedidos explícitos del dueño)

- **DRY**: todo lo repetido se abstrae en componentes/utilidades compartidos.
- **Nombres descriptivos** y clean code.
- **Escalable por datos**: crear un evento/peleador nuevo = agregar un objeto en `src/data/*.ts`, nunca duplicar markup.

## Arquitectura

- `src/data/` — contenido tipado (fake CMS). `types.ts` define los modelos; `index.ts` son los selectores (único punto de acceso; punto de swap para un CMS real). Peleadores referenciados por `slug`; esquinas de pelea aceptan rivales fuera del roster (solo nombre + récord).
- `src/i18n/` — next-intl: ES en `/` (default, sin prefijo), EN en `/en`. UI strings en `messages/{es,en}.json`; contenido en data modules como `Localized {es,en}` resuelto con `L()` de `src/lib/localize.ts`. Nombres de marca (eventos, apodos) NO se traducen.
- `src/components/` — `ui/` (Section, SectionHeading, CtaButton, OutlineText, PlaceholderImage, Reveal), `layout/`, `event/`, `fighter/`, `rankings/`, `shop/`, `forms/`, `home/` (composiciones de secciones).
- Tokens de diseño en `src/app/globals.css` (`@theme`): ink/surface (negros), blood (#C1121F), cream (#F2ECE4), win (verde). Fuentes: Anton (display), Barlow Condensed (labels), Barlow (body). Border-radius 0 en todo.
- Imágenes: `PlaceholderImage` renderiza rayas CSS hasta que se le pase `src` real.
- Forms: server actions en `src/actions/` con zod (`src/lib/schemas.ts`) — hoy solo loggean; ahí se conecta email/CRM.

## Comandos

- `npm run dev` / `npm run build` / `npm run lint` / `npx tsc --noEmit`
- Docker local: `docker build --network=host -t ufp-site .` (el bridge de Docker no tiene internet en esta máquina; en la VPS no hace falta el flag).
- Deploy: ver `DEPLOY.md` (Docker + Caddy en la VPS, dominio ufpcombat.com).
