# Lo que nos falta

El sitio está **EN VIVO en https://ufpcombat.com** (producción, indexable). Todo lo que se
muestra es real; las secciones que aún corren sobre datos de relleno están **apagadas** por
flag (`src/data/features.ts`) — sus rutas dan 404 y no salen en el sitio ni en el sitemap.
Se encienden apenas tengan contenido real. Nada falso está publicado.

---

## Ya está listo (real y en vivo)

- **UFP 6 "Champions"** · vie 7 ago 2026 · Monasterio Club, Granada (Meta).
- **Cartelera completa** del cronograma: estelar **Leo Wi (campeón) vs Carlos Bravo** por
  Título Nacional con su **poster oficial**, + 8 peleas con hora, peso y disciplina.
- **Boletos reales**: 3 palcos + 2 mesas VIP + General ($30.000), en COP, compra por WhatsApp.
- **Patrocinadores** del póster (+ Voltios Burger).
- **Fotos**: poster oficial de la estelar, fotos individuales de Leo y Bravo, y los 6 posters
  promocionales de la cartelera.
- **Timeline de shows** (MB, bailarinas, Zonder, Apocalipto & King Ryan, DJ, lucha de brazo).
- **Formularios** (inscripción y patrocinio) llegan por correo (Resend) al Gmail del dueño.

---

## 1. Datos del evento por confirmar (menores)

| Qué | Cómo está hoy |
| --- | --- |
| **Dirección exacta del Monasterio Club** | Solo dice "Granada, Meta". |
| **Disciplina del co-estelar** (Ramírez vs Psicópata) | Asumida MMA — confirmar. |
| **Peso de la estelar** | No se muestra (solo "Título Nacional"). |
| Opcional | Capacidad del lugar, asaltos por pelea, si hay transmisión. |

## 2. Secciones apagadas (encender cuando haya contenido real)

Cada una se enciende con una línea en `src/data/features.ts`.

**Tienda** — no hay mercancía. Cuando la haya: nombre, precio COP, categoría, foto, tallas y
stock por producto. Y definir cómo se cobra: pasarela (Wompi, Bold, Mercado Pago) o pedidos
por WhatsApp. Hoy el carrito suma pero no cobra.

**Peleadores (roster)** — los 13 son inventados. Por cada peleador real: nombre, apodo,
disciplina y división, récord (V–D–E + KO/TKO y sumisiones), estatura, alcance, edad, peso,
guardia, gimnasio y ciudad, año de debut, si es campeón o su ranking, e historial (rival,
resultado, método, asalto, fecha, evento). También confirmar las 6 divisiones de peso.

**Rankings** — dependen del roster: campeones por división y defensas, top 10 de retadores,
libra por libra, y fecha de actualización.

**Resultados** — los 3 eventos pasados son inventados: por cada uno real, número, nombre,
fecha, sede y resultados con método y asalto.

## 3. Correo de marca `contacto@ufpcombat.com`

Pendiente. Opciones **gratis** (sin mensualidad): **Cloudflare Email Routing** (reenvía a tu
Gmail) o **Zoho Mail free** (buzón propio). **No** auto-hospedar en la VPS (Hostinger bloquea
el puerto 25 + mala entregabilidad). Para que el sitio envíe desde la marca: verificar el
dominio en Resend y llenar `SUBMISSIONS_FROM`. Hoy los formularios salen con remitente
`onboarding@resend.dev`.

## 4. Fotos que faltan

| Qué | Cuántas | Formato |
| --- | --- | --- |
| Logo oficial de UFP | 1 | SVG o PNG transparente |
| Logos de patrocinadores | 1 por marca | PNG transparente |
| Monasterio Club | 1 | horizontal, mín. 1600×900 |
| Peleadores del roster (cuerpo y retrato) | 2 por peleador | vertical 800×1200 + cuadrada 600×600 |
| Productos de la tienda | 1 por producto | cuadrada, mín. 800×800 |

## 5. Pendientes menores

- Números reales de alcance/seguidores/asistencia para la pizarra de patrocinios (se quitó a
  propósito hasta tenerlos; vuelve apenas los pases).
- Descripción real de UFP y requisitos para inscribirse como peleador.
- Redes sociales (el sitio no tiene ninguna todavía).
- Paquetes de patrocinio con precio real, y el kit en PDF si existe.
- Política de tratamiento de datos — la Ley 1581 la exige y ya hay dos formularios recogiendo datos.
- Traducción al inglés de todo lo anterior (no se traducen nombres propios, apodos ni nombres de eventos).
