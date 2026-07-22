# Lanzamiento de ufpcombat.com — lo que falta, paso a paso

Todo el desarrollo está terminado y verificado (build, lint, TypeScript, Lighthouse, responsive 375–1440px, imagen Docker probada). Lo único pendiente son pasos que requieren **tus credenciales**: GitHub, la VPS y el panel del dominio.

Tiempo estimado total: **30–45 minutos** (más la propagación de DNS, que puede tardar de minutos a horas).

---

## Paso 1 — Subir el código a GitHub — ✅ HECHO

El repo ya vive en `git@github.com:itsplenum/ufpCombat.git` y `main` está pusheado.
Para publicar cambios futuros alcanza con `git push` (ver Paso 5).

## Vía rápida — Vercel, para mostrar el sitio ya (~10 min)

Para enseñarle el sitio a alguien **hoy**, sin tocar servidores. La VPS queda para el lanzamiento definitivo; el mismo repo sirve para las dos cosas.

1. Entrá a [vercel.com](https://vercel.com) → **Continue with GitHub**.
2. **Add New… → Project** → elegí el repo `ufpCombat` → **Import**.
3. No cambies **nada** en la pantalla de configuración. Vercel detecta Next.js solo. → **Deploy**.
4. A los ~2 minutos te da una URL tipo `ufp-combat.vercel.app`. Esa ya es compartible.

Eso es todo: no hay variables de entorno que configurar ni comandos de build que escribir.

**Qué funciona igual que en la VPS:** el español en `/` y el inglés en `/en`, el countdown, los botones de WhatsApp, las imágenes de redes sociales y los headers de seguridad. `next.config.ts` detecta que está en Vercel y se ajusta solo (ver la constante `isVercel`).

**Cada `git push` a `main` redespliega automáticamente.** Las ramas generan URLs de preview aparte.

**El dominio, después.** Mientras uses la URL `.vercel.app` no hace falta tocar el DNS. Cuando quieras `ufpcombat.com` ahí, es Vercel → Settings → Domains, y apuntar el DNS en Cloudflare. Ojo: el dominio solo puede apuntar a un lugar a la vez, así que eso conviene decidirlo recién cuando elijas destino final.

> Plan gratis (Hobby): alcanza de sobra para mostrar el sitio, pero es **solo para uso no comercial**. En cuanto se vendan boletos o merch de verdad, hay que pasar al plan Pro o mover todo a la VPS — que es justamente el plan.

---

## Paso 2 — Preparar la VPS y el proxy compartido (~20 min, una sola vez)

La VPS aloja varias apps detrás de un único proxy. Este paso deja la base lista; UFP se despliega en el Paso 2.6. Necesitas la **IP de la VPS** y acceso SSH (root, o un usuario con sudo).

```bash
# 2a. Conéctate
ssh root@IP_DE_LA_VPS

# 2b. Instalar Docker (si la plantilla no lo trae)
curl -fsSL https://get.docker.com | sh

# 2c. Abrir puertos (SSH + web) si hay firewall
ufw allow 22/tcp && ufw allow 80/tcp && ufw allow 443/tcp

# 2d. Acceso al repo privado: genera una llave y agrégala como deploy key en GitHub
ssh-keygen -t ed25519 -N "" -f ~/.ssh/id_ed25519
cat ~/.ssh/id_ed25519.pub
# → GitHub → repo ufpCombat → Settings → Deploy keys → Add key (pega la línea)
# (o desde tu máquina en 10s: gh repo deploy-key add — pídemelo)

# 2e. Red compartida entre el proxy y todas las apps
docker network create edge
```

**2f. Reverse proxy compartido** — crea `~/infra/proxy/` con dos archivos:

`~/infra/proxy/docker-compose.yml`
```yaml
services:
  caddy:
    image: caddy:2-alpine
    restart: unless-stopped
    ports: ["80:80", "443:443"]
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy_data:/data
      - caddy_config:/config
    networks: [edge]
networks:
  edge: { external: true }
volumes:
  caddy_data:
  caddy_config:
```

`~/infra/proxy/Caddyfile`
```
ufpcombat.com {
	encode zstd gzip
	header {
		Strict-Transport-Security "max-age=31536000; includeSubDomains"
		-Server
	}
	reverse_proxy ufp-web:3000
}
www.ufpcombat.com {
	redir https://ufpcombat.com{uri} permanent
}
```

Levanta el proxy (cada app nueva = un bloque de dominio más aquí + `docker compose up -d`):
```bash
cd ~/infra/proxy && docker compose up -d
```

## Paso 2.5 — Correo de los formularios con Resend (~5 min, una sola vez)

Hoy no existe un correo `@ufpcombat.com`, y montarlo en la VPS toma tiempo. Mientras tanto las inscripciones y solicitudes de patrocinio te llegan a **tu correo personal** con Resend, sin tocar DNS ni servidores de correo.

1. Entra a [resend.com](https://resend.com) y crea la cuenta **con el correo donde quieres recibir las submissions** (importante: con el remitente por defecto, Resend solo entrega a ese mismo correo).
2. **API Keys → Create API Key**. Copia la clave (empieza por `re_`).
3. Estos dos valores van en el `.env` de UFP (Paso 2.6):
   - `RESEND_API_KEY=re_...`
   - `SUBMISSIONS_EMAIL=tu-correo@gmail.com`
   - `SUBMISSIONS_FROM=` (déjalo vacío por ahora)
4. Si el sitio ya está corriendo, aplica los cambios con `docker compose up -d` en `~/apps/ufpcombat`.

Más adelante, cuando exista `@ufpcombat.com`, se verifica el dominio en Resend y se pone `SUBMISSIONS_FROM="UFP <noreply@ufpcombat.com>"` para enviar desde la marca y a cualquier destinatario.

> El plan gratis de Resend da 3.000 correos/mes — de sobra para los formularios.

## Paso 2.6 — Desplegar UFP (app #1)

```bash
git clone git@github.com:itsplenum/ufpCombat.git ~/apps/ufpcombat
cd ~/apps/ufpcombat
cp .env.example .env
nano .env   # pega RESEND_API_KEY y SUBMISSIONS_EMAIL (Paso 2.5), guarda con Ctrl+O, Ctrl+X
docker compose up -d --build
```

El primer build tarda unos minutos. `web` se une a la red `edge` y el proxy ya lo alcanza en `ufp-web:3000`. Verifica:

```bash
docker compose ps                              # ufp-web "running"
docker exec ufp-web wget -qO- localhost:3000 >/dev/null && echo OK
```

## Paso 3 — Apuntar el dominio en Cloudflare (~5 min + propagación)

En Cloudflare → tu dominio **ufpcombat.com** → **DNS → Records**, crea dos registros A, ambos en **nube gris (DNS only)** para que Caddy emita los certificados directo:

| Tipo | Nombre / Host | Valor         | Proxy        | TTL  |
| ---- | ------------- | ------------- | ------------ | ---- |
| A    | `@`           | IP de la VPS  | DNS only 🔘  | Auto |
| A    | `www`         | IP de la VPS  | DNS only 🔘  | Auto |

Borra cualquier registro A/AAAA/CNAME previo en `@` y `www` que apunte a otro lado (parking del registrador, etc.).

Comprueba la propagación desde tu máquina:

```bash
dig +short ufpcombat.com     # debe devolver la IP de la VPS
dig +short www.ufpcombat.com
```

**HTTPS es automático**: en cuanto el DNS resuelva, Caddy (ya corriendo en la VPS) pide los certificados a Let's Encrypt solo. No hay que configurar nada; `www` redirige al dominio principal.

## Paso 4 — Verificación final (~5 min)

Abre en el navegador y confirma:

- [ ] `https://ufpcombat.com` — home en español, candado de HTTPS válido
- [ ] `https://ufpcombat.com/en` — home en inglés; el toggle ES/EN funciona en ambas direcciones
- [ ] `https://www.ufpcombat.com` — redirige al dominio sin www
- [ ] `https://ufpcombat.com/evento/ufp-6` y `/patrocinadores` y `/inscripcion` cargan
- [ ] Boletos: se muestran **6 zonas** y el botón de **General** abre WhatsApp con "$30.000"
- [ ] El countdown de la home avanza
- [ ] Enviar el formulario de inscripción → aparece "✓ Recibido", **te llega el correo** y el dato queda en el log (`docker compose logs web` en `~/apps/ufpcombat`)
- [ ] Secciones apagadas dan 404 a propósito: `/tienda`, `/rankings`, `/peleador/marco-rios` (tienda, roster, rankings y resultados están off hasta tener contenido real)
- [ ] `https://ufpcombat.com/peleador/no-existe` → 404 con la marca UFP (nav + footer), no una pantalla blanca
- [ ] Headers de seguridad presentes:
      `curl -sI https://ufpcombat.com | grep -i "strict-transport\|x-content-type\|x-frame"`
      → deben salir los tres, y **no** debe aparecer `X-Powered-By`

## Paso 5 — Publicar cambios futuros (el flujo de siempre)

Cada vez que edites contenido (ver `MANUAL.md`):

```bash
git add -A && git commit -m "descripción del cambio" && git push
VPS_HOST=root@IP_DE_LA_VPS ./deploy.sh
```

`deploy.sh` entra a la VPS por SSH, hace `git pull` en `~/apps/ufpcombat` y reconstruye. El sitio se actualiza en ~2–3 minutos sin downtime perceptible.

---

## Después del lanzamiento (opcional, sin prisa)

1. **Reactivar secciones** — tienda, roster, rankings y resultados están apagadas (`src/data/features.ts`) porque corren sobre datos inventados. Con el contenido real (ver `CONTENIDO.md` y `MANUAL.md`), poner su flag en `true` y vuelven al home, la nav, el footer y el sitemap. Lo mismo con la pizarra de alcance de patrocinios cuando tengas números reales.
2. **Fotos y logo reales** — soltar archivos en `public/` y agregar la ruta en los datos; los placeholders rayados desaparecen solos (ver `MANUAL.md` §Imágenes). La estelar ya usa la foto real de Carlos Bravo.
3. **Correo de marca** — cuando exista `@ufpcombat.com`, verificar el dominio en Resend y poner `SUBMISSIONS_FROM` (Paso 2.5) para enviar desde la marca.
4. **Analytics** — agregar un script de analítica (Plausible/Umami se autohospedan en la misma VPS) en `src/app/[locale]/layout.tsx`.
5. **Google Search Console** — dar de alta ufpcombat.com y enviar `https://ufpcombat.com/sitemap.xml` para indexar rápido.
