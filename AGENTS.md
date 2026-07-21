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
- 404: `[locale]/not-found.tsx` para slugs inexistentes (hereda nav/footer); `app/global-not-found.tsx` para URLs sin ruta y locales inválidos (necesita `experimental.globalNotFound` y trae sus propias fuentes/estilos porque saltea el render normal).
- `Reveal` anima con `IntersectionObserver` + `--animate-rise` (CSS), no con `motion`: el HTML del servidor sale visible, así que un fallo de JS nunca deja la página en blanco.
- Home y página de evento son ISR (`revalidate = 3600`): qué evento es "el próximo" se decide contra la fecha real, y sin revalidación esa comparación quedaría congelada en el build.

## Accesibilidad

- Contraste mínimo AA (4.5:1) sobre `ink`: crema a `/55` o más (`/65` para 10-11px). Para texto chico en rojo usar `blood-hover` (4.65:1), no `blood` (3.15:1). Sobre `bg-blood` el texto va en `cream`, no en `ink`.
- Deuda conocida: `cream` sobre `bg-blood` da 4.1:1 — pasa para texto grande, queda corto para texto chico. Cerrarlo del todo exige mover esas placas a `blood-deep`, que es una decisión de diseño pendiente.
- Diálogos (carrito, menú móvil): `role="dialog"` + `aria-modal`, foco al abrir y devuelto al cerrar, Escape, y scroll del body bloqueado.

## Convenciones de git

- **Los commits NO llevan coautor.** Nada de trailers `Co-Authored-By:` ni líneas tipo "Generated with…". El mensaje termina en su última línea de contenido.
- Mensajes en español, en imperativo o con prefijo de fase (`F0:`, `Fix:`, `Docs:`), describiendo el *qué* y el *porqué*.

## Comandos

- `npm run dev` / `npm run build` / `npm run lint` / `npx tsc --noEmit`
- Docker local: `docker build --network=host -t ufp-site .` (el bridge de Docker no tiene internet en esta máquina; en la VPS no hace falta el flag).
- Deploy: ver `DEPLOY.md` (Docker + Caddy en la VPS, dominio ufpcombat.com).
