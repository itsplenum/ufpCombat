# Lo que nos falta para el lanzamiento

Los datos de **UFP 6** ya son reales (salieron del póster). Lo demás está construido pero sin contenido, así que **por ahora está oculto** — ver `src/data/features.ts`.

La idea es simple: el sitio solo muestra lo que tenemos de verdad. Nada de secciones con datos de relleno.

---

## Ya está listo

Evento UFP 6 "Champions" · viernes 7 de agosto, 8:00 p.m. · Monasterio Club, Granada (Meta) · estelar **Leo Wi vs Carlos Bravo** · música en vivo, corridos bélicos, bailarinas, DJ e invitado especial MB · patrocinadores del póster · WhatsApp de ventas.

**Hoy el sitio son cinco bloques:** portada con countdown, pelea estelar, cartelera, boletos, y patrocinios + convocatoria de peleadores.

---

## 1. Para poder publicar

| Qué | Cómo está hoy |
| --- | --- |
| **Precios y zonas de boletos** | Inventados ($80.000 a $750.000). Es lo único falso que sigue visible. |
| **Los 4 duelos restantes** | Entre Garzón Palma, El Zurdo, Zuluaga, Psicópata, Lobo, Medina, Ochoa y Orozco. Están cargados pero ocultos. |
| **Qué peleas son boxeo y cuáles MMA** | Todas figuran como MMA. |
| **Orden de la cartelera** | Co-estelar, preliminares, apertura. |
| **Dirección exacta del Monasterio Club** | Solo dice "Granada, Meta". |
| **Email de contacto** | Hoy `contacto@ufpcombat.com`. Si ese buzón no existe, perdemos inscripciones y patrocinios. |

Suma si lo tenemos: capacidad del lugar, asaltos por pelea, si hay transmisión.

---

## 2. Secciones apagadas hasta tener contenido

Están hechas y funcionando. Se prenden cambiando una línea en `src/data/features.ts` cuando llegue el material.

**Tienda** — no hay mercancía todavía. Cuando la haya: nombre, precio en COP, categoría, foto, tallas y stock por producto. Y hay que definir cómo se cobra: pasarela (Wompi, Bold, Mercado Pago) o pedidos por WhatsApp. Hoy el carrito suma pero no cobra.

**Peleadores** — los 13 del roster son inventados. Por cada peleador real:

- Nombre, apellido y apodo
- Disciplina y división de peso
- Récord: victorias–derrotas–empates, y cuántas por KO/TKO y por sumisión
- Estatura, alcance, edad, peso, guardia (ortodoxo/zurdo)
- Gimnasio y ciudad de origen
- Año de debut en UFP
- Si es campeón, o su posición en el ranking
- Historial: rival, resultado, método, asalto, fecha y evento

También hay que confirmar las divisiones de peso que usamos (hay 6 inventadas).

**Rankings** — depende del roster. Campeones por división y defensas, top 10 de retadores, libra por libra, y fecha de última actualización.

**Resultados** — los 3 eventos pasados son inventados. Por cada uno real: número, nombre, fecha, sede y resultados con método y asalto.

---

## 3. Fotos

No hay ninguna imagen real todavía; todo son placeholders rayados, hechos para no verse rotos mientras tanto.

| Qué | Cuántas | Formato |
| --- | --- | --- |
| Logo oficial de UFP | 1 | SVG o PNG transparente |
| Logos de patrocinadores | 1 por marca | PNG transparente |
| Monasterio Club | 1 | horizontal, mín. 1600×900 |
| Peleador, cuerpo entero, fondo oscuro o recortada | 1 por peleador | vertical, mín. 800×1200 |
| Peleador, retrato | 1 por peleador | cuadrada, mín. 600×600 |
| Productos de la tienda | 1 por producto | cuadrada, mín. 800×800 |

Las de peleadores conviene sacarlas con fondo uniforme, o el roster se ve desparejo.

---

## 4. Pendientes menores

- Descripción real de UFP y requisitos para inscribirse como peleador
- Redes sociales (el sitio no tiene ninguna todavía)
- Paquetes de patrocinio con precio real, y el kit en PDF si existe
- Política de tratamiento de datos — la Ley 1581 la exige y ya tenemos dos formularios recogiendo datos
- Traducción al inglés de todo lo anterior (no se traducen nombres propios, apodos ni nombres de eventos)
