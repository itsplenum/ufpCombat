# Despliegue de ufpcombat.com

El sitio corre en la VPS con Docker: un contenedor Next.js (standalone) detrás de Caddy, que gestiona HTTPS automáticamente con Let's Encrypt.

## 1. DNS (una sola vez)

En el panel de tu dominio, crea dos registros apuntando a la IP de la VPS:

| Tipo | Nombre | Valor        |
| ---- | ------ | ------------ |
| A    | @      | IP de la VPS |
| A    | www    | IP de la VPS |

Caddy redirige `www.ufpcombat.com` → `ufpcombat.com` y emite los certificados solo (necesita los puertos 80 y 443 abiertos).

## 2. Preparar la VPS (una sola vez)

```bash
# En la VPS (Ubuntu/Debian):
curl -fsSL https://get.docker.com | sh

# Clonar el repo
git clone <URL-DEL-REPO> ~/ufpcombat
cd ~/ufpcombat
docker compose up -d --build
```

Primera emisión de certificado tarda unos segundos tras levantar. Verifica: `https://ufpcombat.com` y `https://ufpcombat.com/en`.

## 3. Publicar cambios

Desde tu máquina, con los cambios ya pusheados al repo:

```bash
VPS_HOST=usuario@ip ./deploy.sh
```

O manualmente en la VPS: `cd ~/ufpcombat && git pull && docker compose up -d --build`.

## Notas

- El contenido (eventos, peleadores, rankings, productos) vive en `src/data/*.ts` — editar + push + deploy es todo el flujo editorial de hoy. El día que haya CMS, solo se reemplazan los selectores de `src/data/index.ts`.
- Los formularios (inscripción/patrocinio) hoy solo se registran en el log del contenedor (`docker compose logs web`). Conectar email/CRM = editar `src/actions/*.ts`.
- Prueba local del stack completo: `docker compose up --build` y abre `http://localhost` (Caddy servirá con certificado interno; para probar solo la app: `docker build -t ufp . && docker run -p 3000:3000 ufp`).
- En esta máquina de desarrollo (CachyOS) el bridge de Docker no tiene salida a internet (firewall local), así que el build local necesita `docker build --network=host …`. En la VPS no hace falta.
