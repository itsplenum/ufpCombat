# Lanzamiento de ufpcombat.com — lo que falta, paso a paso

Todo el desarrollo está terminado y verificado (build, lint, TypeScript, Lighthouse, responsive 375–1440px, imagen Docker probada). Lo único pendiente son pasos que requieren **tus credenciales**: GitHub, la VPS y el panel del dominio.

Tiempo estimado total: **30–45 minutos** (más la propagación de DNS, que puede tardar de minutos a horas).

---

## Paso 1 — Subir el código a GitHub (~5 min)

El repo git ya existe localmente con todo el historial. Solo falta crearlo en GitHub y pushear.

```bash
cd ~/Work/ufpCombat

# 1a. Autenticarte (abre el navegador; elige GitHub.com → HTTPS → Login with browser)
gh auth login

# 1b. Crear el repo privado y pushear en un solo comando
gh repo create ufpcombat --private --source=. --push
```

Verifica: `gh repo view ufpcombat --web` debe abrir el repo con todos los commits.

> Alternativa sin `gh`: crea un repo privado vacío en github.com, luego
> `git remote add origin git@github.com:TU_USUARIO/ufpcombat.git && git push -u origin master`.

## Paso 2 — Preparar la VPS (~15 min, una sola vez)

Necesitas: la **IP de la VPS** y acceso SSH (usuario + contraseña o llave).

```bash
# 2a. Conéctate
ssh usuario@IP_DE_LA_VPS
```

Ya dentro de la VPS:

```bash
# 2b. Instalar Docker (Ubuntu/Debian)
curl -fsSL https://get.docker.com | sh

# 2c. Si tu usuario no es root, permitirle usar Docker (cierra y reabre la sesión SSH después)
sudo usermod -aG docker $USER

# 2d. Abrir puertos web si hay firewall activo (ufw es lo común en Ubuntu)
sudo ufw allow 80/tcp && sudo ufw allow 443/tcp

# 2e. Darle acceso al repo privado: genera una llave en la VPS...
ssh-keygen -t ed25519 -N "" -f ~/.ssh/id_ed25519
cat ~/.ssh/id_ed25519.pub
# ...y pega esa llave en GitHub → Settings → SSH and GPG keys → New SSH key
# (o hazlo en 10 segundos desde tu máquina: gh repo deploy-key add — pídemelo)

# 2f. Clonar y levantar
git clone git@github.com:TU_USUARIO/ufpcombat.git ~/ufpcombat
cd ~/ufpcombat
docker compose up -d --build
```

El primer build tarda unos minutos. Verifica que los dos contenedores corren:

```bash
docker compose ps        # web y caddy deben estar "running"
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000   # → 200
```

## Paso 3 — Apuntar el dominio (~5 min + propagación)

En el panel donde compraste **ufpcombat.com** (registrador), crea dos registros DNS:

| Tipo | Nombre / Host | Valor         | TTL             |
| ---- | ------------- | ------------- | --------------- |
| A    | `@`           | IP de la VPS  | el más bajo     |
| A    | `www`         | IP de la VPS  | el más bajo     |

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
- [ ] `https://ufpcombat.com/rankings` y `/evento/ufp-17` y `/peleador/marco-rios` cargan
- [ ] El countdown de la home avanza
- [ ] Enviar el formulario de inscripción → aparece "✓ Recibido" (y el dato queda en `docker compose logs web` en la VPS)

## Paso 5 — Publicar cambios futuros (el flujo de siempre)

Cada vez que edites contenido (ver `MANUAL.md`):

```bash
git add -A && git commit -m "descripción del cambio" && git push
VPS_HOST=usuario@IP_DE_LA_VPS ./deploy.sh
```

`deploy.sh` entra a la VPS por SSH, hace `git pull` y reconstruye. El sitio se actualiza en ~2–3 minutos sin downtime perceptible.

---

## Después del lanzamiento (opcional, sin prisa)

1. **Contenido real** — reemplazar peleadores/eventos/rankings de ejemplo por los reales (ver `MANUAL.md`). Se puede lanzar con placeholders y ir migrando.
2. **Fotos y logo reales** — soltar archivos en `public/` y agregar la ruta en los datos; los placeholders rayados desaparecen solos (ver `MANUAL.md` §Imágenes).
3. **Formularios a tu correo** — hoy quedan en el log del servidor; conectar un servicio de email (ej. Resend) en `src/actions/*.ts`.
4. **Analytics** — agregar un script de analítica (Plausible/Umami se autohospedan en la misma VPS) en `src/app/[locale]/layout.tsx`.
5. **Google Search Console** — dar de alta ufpcombat.com y enviar `https://ufpcombat.com/sitemap.xml` para indexar rápido.
