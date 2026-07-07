# Manual de uso del sitio UFP

Cómo mantener el sitio con información real. **No hay panel de administración**: el contenido vive en archivos TypeScript dentro de `src/data/` que funcionan como un CMS. La regla de oro:

> **Editar un archivo de datos → commit → push → deploy.** Nunca hace falta tocar componentes ni páginas para cambiar contenido.

Todos los archivos de datos tienen tipos estrictos: si te falta un campo o te equivocas en un nombre, `npm run build` (o el editor) te lo marca antes de publicar. Para previsualizar cambios en vivo: `npm run dev` y abre http://localhost:3000.

## Mapa del contenido

| Quiero cambiar…                                  | Archivo                                    |
| ------------------------------------------------ | ------------------------------------------ |
| Eventos, carteleras, boletos, resultados          | `src/data/events.ts`                       |
| Peleadores (récord, bio, historial, videos)       | `src/data/fighters.ts`                     |
| Rankings y libra por libra                        | `src/data/rankings.ts`                     |
| Divisiones de peso                                | `src/data/divisions.ts`                    |
| Productos de la tienda                            | `src/data/products.ts`                     |
| Paquetes de patrocinio                            | `src/data/sponsors.ts`                     |
| Email de contacto, mensajes del ticker, copyright | `src/data/site.ts`                         |
| Textos fijos de la interfaz (botones, títulos)    | `src/i18n/messages/es.json` y `en.json`    |
| Cifras de alcance para patrocinadores             | `src/app/[locale]/patrocinadores/page.tsx` |

**Idiomas**: todo texto de contenido traducible es un objeto `{ es: "...", en: "..." }`. Los nombres de marca (títulos de evento como "Sangre Nueva", apodos) van como string simple y **no se traducen**.

---

## 1. Ciclo de vida de un evento (la operación más frecuente)

### Crear el próximo evento (ej. UFP 18)

Agrega un objeto al inicio del array en `src/data/events.ts`:

```ts
{
  slug: "ufp-18",                          // define la URL: /evento/ufp-18
  number: 18,
  title: "Nombre Del Evento",              // marca, no se traduce
  status: "upcoming",
  date: "2026-11-21T20:00:00-06:00",       // fecha/hora real CON zona horaria — mueve el countdown
  venue: { name: "...", address: {es, en}, capacity: 20500, doorsOpen: "17:00", broadcast: {es, en} },
  schedule: [ { time: "17:00", label: {es: "Puertas", en: "Doors"} }, ... ],
  fights: [ ...ver abajo... ],
  tickets: [
    { id: "general", zone: "General", price: 450, currency: "MXN", perks: {es, en} },
    // featured: true destaca la zona; soldOut: true la marca agotada
  ],
}
```

Cada pelea (`fights`) tiene dos esquinas `red` y `blue`:

- **Peleador del roster**: `{ slug: "marco-rios", name: "Marco Ríos", tag: {es: "CAMPEÓN", en: "CHAMPION"} }` — el récord y el link al perfil salen solos del roster.
- **Rival externo** (no tiene perfil): `{ name: "John Doe", recordText: "14-2-0" }` — solo nombre y récord.

`order: 0` es la pelea estelar (alimenta el hero de la home y el tale of the tape).

**Con solo agregar ese objeto**: la home apunta su countdown y cartelera al nuevo evento, se crea `/evento/ufp-18` en ambos idiomas, entra al sitemap y se genera su imagen para redes sociales. No hay que tocar nada más — salvo el **ticker** en `src/data/site.ts`, que menciona el evento por nombre y se actualiza a mano.

### Cerrar un evento cuando ya pasó

En el mismo objeto: cambia `status: "upcoming"` → `"past"`, agrega `result` a cada pelea y el `highlight` del evento:

```ts
result: {
  winner: "red",                                   // "red" | "blue" | null (empate)
  method: { es: "KO — golpes", en: "KO — punches" },
  round: 3,
  time: "2:14",
  summary: { es: "Ríos vence a Herrera por KO — R3", en: "Ríos beats Herrera by KO — R3" },
},
```

La página del evento se convierte sola en archivo de resultados (adiós countdown y boletos), y el evento aparece en la sección "Resultados" de la home.

### Después de cada evento, además:

1. **Peleadores** (`fighters.ts`): actualiza `record` de cada participante y agrégale la pelea a su `history`.
2. **Rankings** (`rankings.ts`): ver siguiente sección.

## 2. Rankings (la página insignia)

En `src/data/rankings.ts`, tras cada evento:

1. Cambia `rankingsUpdatedAt` a la fecha de la actualización (`"2026-08-16"`) — es el sello de "Última actualización" que da credibilidad oficial a la página.
2. Reordena `poundForPound` y los `contenders` de cada división en `divisionRankings`.
3. El campo `movement` de cada peleador indica el cambio **respecto a la lista anterior**: `2` = subió dos (▲2 verde), `-1` = bajó uno (▼1 rojo), `0` = igual (—), `"new"` = debuta en el ranking (badge NEW).
4. `championSlug: null` muestra "TÍTULO VACANTE"; `defenses` es el número de defensas del campeón actual.

Los retadores que no están en el roster van sin `slug` (solo `name` + `record` como texto). Cada división tiene ancla compartible: `ufpcombat.com/rankings#mma-welter`.

## 3. Peleadores

Agregar un peleador = un objeto en `src/data/fighters.ts`. Campos clave:

- `slug` define la URL (`/peleador/nombre-apellido`) — no lo cambies después de publicar (rompería links compartidos).
- `divisionId` debe existir en `divisions.ts`.
- `shortName` es como aparece en cartelera y cards (ej. `'"El Verdugo" Ríos'`).
- `history` alimenta la tabla de historial (G/P/E con colores); si el rival o el evento tienen `opponentSlug`/`eventSlug`, se convierten en links.
- `videos` son los "Mejores momentos" — hoy con `url` opcional; cuando tengas los clips reales, agrega la URL.

## 4. Imágenes reales (fotos, logos, mapas)

Hoy todo muestra placeholders rayados. El sistema está diseñado para que el cambio sea **solo agregar la ruta del archivo**, sin tocar ningún layout:

1. Coloca el archivo en `public/`, organizado, ej.: `public/fighters/marco-rios-full.jpg`, `public/products/playera-ufp-17.jpg`.
2. Referéncialo en el dato correspondiente (la ruta es desde `public/`, empezando con `/`):
   - Peleador: `photoFull: "/fighters/marco-rios-full.jpg"` (perfil, vertical ~2:3) y `photoBust: "/fighters/marco-rios-bust.jpg"` (cards, cuadrada).
   - Producto: `image: "/products/playera-ufp-17.jpg"`.
   - Arena: `venue.mapImage`.
3. El placeholder desaparece automáticamente y la foto se sirve optimizada.

Recomendación: JPG/WebP ≤ 300 KB por foto; las fotos de peleador lucen mejor recortadas sobre fondo oscuro (el diseño ya pone el glow rojo detrás).

## 5. Tienda y patrocinadores

- **Productos** (`products.ts`): `category` es `"apparel" | "accessories" | "collectible"` (alimenta el filtro). La home muestra los primeros 4 del array. El carrito es real (persiste en el navegador) pero el checkout dice "próximamente" — cobrar de verdad requiere integrar Stripe/MercadoPago después.
- **Patrocinadores** (`sponsors.ts`): tiers con pitch y beneficios. Las cifras de alcance (asistencia, PPV, redes) están hardcodeadas en `src/app/[locale]/patrocinadores/page.tsx` — **pon las reales antes de mandar el link a un patrocinador**.

## 6. Formularios (inscripción y patrocinio)

Los envíos hoy **quedan registrados en el log del servidor**. Para verlos, en la VPS:

```bash
cd ~/ufpcombat && docker compose logs web | grep -A2 "application\|sponsor"
```

Es funcional pero incómodo — el siguiente paso natural es conectar un servicio de email en `src/actions/apply.ts` y `src/actions/sponsor.ts` (ahí está marcado el punto exacto; con Resend son ~10 líneas). La validación (récord con formato `18-2-0`, email, campos obligatorios) ya está hecha.

## 7. Publicar

```bash
# 1. Verifica en local (opcional pero recomendado)
npm run build

# 2. Sube y despliega
git add -A && git commit -m "UFP 18 anunciado" && git push
VPS_HOST=usuario@IP ./deploy.sh
```

En ~2–3 minutos el cambio está en ufpcombat.com. Si el build falla, el sitio anterior sigue en línea — no hay riesgo de tumbar la página con un error de dedo.

---

**El día que el volumen lo amerite** (alguien no-técnico editando contenido), el sitio está preparado para conectarse a un CMS con panel visual: solo se reescriben los selectores de `src/data/index.ts` para leer del CMS en vez de estos archivos. Nada del diseño ni de las páginas cambia.
