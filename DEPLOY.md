# Despliegue de ufpcombat.com

La VPS es un **servidor multi-app**: un único reverse proxy Caddy al frente termina el
HTTPS de todos los dominios y enruta a cada app por su nombre de contenedor sobre una
red Docker compartida (`edge`). UFP es la **primera app**. Agregar otra = repetir el
patrón, sin tocar lo existente.

```
VPS (Ubuntu) ── Docker
  red "edge" (compartida)
   ├─ ~/infra/proxy/    → Caddy :80/:443  (Let's Encrypt para todos los dominios)
   ├─ ~/apps/ufpcombat/ → ufp-web:3000    (esta app, sin BD)
   └─ ~/apps/<otra>/    → <otra>-web (+ su Postgres en red privada)
```

## 1. DNS (una sola vez, en Cloudflare)

Registros A `@` y `www` → IP de la VPS, en **nube gris (DNS-only)** para que Caddy
emita los certificados directo. `www` redirige a `ufpcombat.com`. (El proxy naranja de
Cloudflare se puede activar después; ahí habría que pasar Caddy al challenge DNS-01.)

## 2. Preparar la VPS (una sola vez)

```bash
# En la VPS (Ubuntu):
curl -fsSL https://get.docker.com | sh          # si no viene Docker
ufw allow 22/tcp && ufw allow 80/tcp && ufw allow 443/tcp

# Red compartida + reverse proxy (ver ~/infra/proxy/)
docker network create edge
cd ~/infra/proxy && docker compose up -d
```

## 3. Desplegar UFP (app #1)

```bash
git clone git@github.com:itsplenum/ufpCombat.git ~/apps/ufpcombat
cd ~/apps/ufpcombat
cp .env.example .env      # pegar RESEND_API_KEY y SUBMISSIONS_EMAIL (ver .env.example)
docker compose up -d --build
```

`web` se une a la red `edge`; el proxy ya lo alcanza en `ufp-web:3000` y emite el
certificado en cuanto el DNS resuelva. Verifica `https://ufpcombat.com` y `/en`.

## 4. Publicar cambios

Desde tu máquina, con los cambios pusheados:

```bash
VPS_HOST=root@IP ./deploy.sh
```

O en la VPS: `cd ~/apps/ufpcombat && git pull && docker compose up -d --build`.

## Agregar otra app (con Postgres)

Nueva carpeta `~/apps/<app>/` con su propio `docker-compose.yml`:

- `web`: en las redes `[edge, internal]` (el proxy la ve por `edge`; habla con su BD
  por `internal`).
- `db` (`postgres:16-alpine`): **solo** en `internal`, sin `ports:` → invisible a
  internet y a las demás apps; solo su `web` la alcanza en `db:5432`. Datos en un
  volumen. Backups con `pg_dump` por cron.

Luego agregar un bloque de dominio en `~/infra/proxy/Caddyfile` (`reverse_proxy
<app>-web:<puerto>`) y recargar el proxy. UFP no lleva `db`: sus datos viven en
`src/data/*.ts`.

## Notas

- Contenido (eventos, boletos, patrocinadores) en `src/data/*.ts` — editar + push +
  deploy es el flujo editorial de hoy. Con CMS, solo cambian los selectores de
  `src/data/index.ts`.
- Formularios (inscripción/patrocinio) → correo vía Resend (`src/lib/email.ts`),
  configurado en `.env`. Sin `.env` quedan en `docker compose logs web` (el respaldo).
- Prueba local de la imagen: `docker build --network=host -t ufp .` (en esta máquina de
  desarrollo el bridge de Docker no tiene salida; en la VPS no hace falta el flag).
