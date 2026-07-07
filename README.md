# UFP — ufpcombat.com

Sitio oficial de Ultimate Fight Promotions (MMA + Boxeo): eventos, carteleras, boletos, perfiles de peleadores, rankings oficiales, tienda, inscripción de peleadores y patrocinios. Bilingüe ES (default) / EN (`/en`).

## Documentación

| Documento         | Para qué                                                            |
| ----------------- | ------------------------------------------------------------------- |
| `LANZAMIENTO.md`  | Pasos pendientes para salir a producción (GitHub, VPS, DNS)          |
| `MANUAL.md`       | Cómo editar contenido real: eventos, peleadores, rankings, imágenes  |
| `DEPLOY.md`       | Referencia de infraestructura y flujo de publicación                 |
| `AGENTS.md`       | Arquitectura y convenciones (para desarrollo con agentes/IA)         |

## Comandos

```bash
npm run dev          # desarrollo con hot reload → http://localhost:3000
npm run build        # build de producción (pre-renderiza ~50 páginas estáticas)
npm run start        # servir el build de producción
npm run lint         # ESLint
npx tsc --noEmit     # verificación de tipos
```

## Tecnologías y por qué

| Tecnología | Qué hace aquí | Por qué esta y no otra |
| --- | --- | --- |
| **Next.js (App Router)** | Framework del sitio. Pre-renderiza todas las páginas como HTML estático en build (SSG). | El sitio es contenido que cambia por evento, no por segundo: HTML estático significa carga instantánea, SEO perfecto (Google recibe el contenido completo, clave para que los rankings UFP sean "la fuente de la verdad" en búsquedas) y un servidor que casi no trabaja — aguanta el pico de tráfico de una noche de pelea en una VPS modesta. |
| **TypeScript** | Tipado estricto de todo, en especial los modelos de contenido (`src/data/types.ts`). | El contenido se edita a mano en archivos de datos; los tipos convierten errores de dedo (campo faltante, slug mal escrito) en errores de compilación **antes** de publicar, no en páginas rotas en producción. |
| **Tailwind CSS v4** | Todos los estilos, con los tokens de la marca (negros, rojo sangre, tipografías) definidos en `src/app/globals.css`. | El diseño exige fidelidad pixel a pixel con valores muy específicos; Tailwind los expresa junto al markup sin inventar cientos de clases CSS propias, y purga todo lo no usado (CSS final mínimo). La v4 define los design tokens en CSS puro, un solo lugar para cambiar la identidad visual. |
| **next-intl** | Rutas bilingües: ES en `/`, EN en `/en`, con detección de idioma, hreflang y toggle. | Es la librería estándar de i18n para App Router. La alternativa (duplicar páginas por idioma) viola DRY; next-intl mantiene **una sola implementación** de cada página y dos archivos de textos. |
| **motion** | Animaciones de scroll-reveal y micro-interacciones. | Sucesor oficial de framer-motion, la librería de animación más madura de React. Declarativa (la animación vive junto al componente) y respeta `prefers-reduced-motion` — el "mucho movimiento" del diseño sin sacrificar accesibilidad. |
| **zod** | Validación de los formularios (inscripción, patrocinio) en el servidor. | Valida en el servidor (no confiable hacerlo solo en el navegador) y los esquemas generan los tipos TypeScript solos: una sola definición de "qué es una inscripción válida". |
| **Datos en TS (`src/data/`) en vez de CMS/base de datos** | Todo el contenido: eventos, peleadores, rankings, productos. | Un CMS hoy sería infraestructura extra (otro servicio, otra base de datos, otro login) para un equipo de una persona que ya edita código. Los archivos tipados dan versionado gratis (git = historial de cada cambio de ranking) y validación gratis. El día que haga falta panel visual, `src/data/index.ts` es el único punto a reescribir. |
| **Docker + Caddy** | Empaquetado y servido en la VPS con HTTPS automático. | Docker hace el deploy reproducible (la VPS solo necesita Docker, nada de configurar Node). Caddy en vez de Nginx por una razón: HTTPS con Let's Encrypt **automático y auto-renovable** en 3 líneas de config — cero mantenimiento de certificados. |

Decisiones transversales: **cero base de datos y cero servicios externos de pago** (todo corre en la VPS propia), **DRY por diseño** (crear el evento UFP 18 = agregar un objeto de datos, ningún markup nuevo), y **escalabilidad por capas** — los puntos de crecimiento futuros (CMS, checkout real, email/CRM) ya tienen su lugar marcado sin refactor.
