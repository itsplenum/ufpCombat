# Qué información hay que conseguir para reemplazar los datos de ejemplo

Todo lo que hay hoy en el sitio es **inventado**: nombres, récords, fechas, precios, patrocinadores. Funciona como maqueta, pero nada de eso es real.

Esta es la lista completa de lo que hace falta pedir, ordenada por urgencia. Lo marcado 🔴 debería estar **antes** de que el sitio sea público; lo demás puede ir entrando después sin romper nada.

Dónde se carga cada cosa está en `MANUAL.md`. Los archivos viven en `src/data/`.

---

## ✅ Ya cargado desde el póster oficial

Esto **ya no hay que pedirlo** — salió del póster de UFP 6:

- Evento: **UFP 6 "Champions"**, viernes 7 de agosto, 8:00 p.m.
- Sede: **Monasterio Club**, Granada (Meta)
- Los **10 peleadores anunciados**: Garzón Palma, El Zurdo, Zuluaga, Psicópata, Leo Wi, Carlos Bravo, Lobo, Medina, Ochoa, Orozco
- Que la cartelera mezcla **boxeo y MMA**
- Los extras: música en vivo, corridos bélicos, bailarinas, DJ, invitado especial **MB**
- **Patrocinadores**: Monasterio, Sobre Ruedas, Passion Fruit, Kromasol, La Fortaleza, Grupo Colsolar, Bloom X, Aguardiente Antioqueño + aliados Somos, Combatam y Caray

---

## 🔴 0. Bloqueantes reales

| Dato | Por qué bloquea | Dónde va |
| --- | --- | --- |
| **Número de WhatsApp de ventas** | Hoy es `570000000000` (falso). Todos los botones de boletos llevan ahí. | `src/data/site.ts` → `whatsappNumber` |
| **Email de contacto real** | Hoy es `contacto@ufpcombat.com`. Si el buzón no existe, se pierden inscripciones y patrocinios. | `src/data/site.ts` → `contactEmail` |
| **Quién pelea contra quién** | El póster lista 10 nombres pero ningún duelo. Hoy están emparejados por orden del póster — **es una suposición** y se publica como si fuera la cartelera oficial. | `src/data/events.ts` |
| **Precios reales de boletos** | Las 4 zonas y sus precios ($80.000 a $750.000) son inventados; el póster no los menciona. Publicar un precio equivocado es el peor error posible. | `src/data/events.ts` → `ufp6Tickets` |
| **Qué peleas son boxeo y cuáles MMA** | El póster solo dice que la cartelera mezcla ambas. Hoy todas figuran como MMA. | `src/data/events.ts` |
| **Dirección exacta del Monasterio Club** | Hoy dice solo "Granada, Meta". | `src/data/events.ts` |

---

## 🔴 1. El evento (UFP 6)

- Número y **nombre del evento** (hoy "Sangre Nueva")
- **Fecha y hora exactas** de inicio, con huso horario
- **Sede**: nombre, dirección completa, capacidad, hora de apertura de puertas
- **Cómo se transmite**: canal/plataforma de PPV, precio si aplica
- **Horarios de la jornada**: preliminares / cartelera principal / estelar
- **Cartelera completa**, pelea por pelea:
  - los dos peleadores de cada esquina
  - disciplina (MMA o boxeo), división y número de asaltos
  - si es pelea de título
  - el orden real (estelar, co-estelar, preliminares, apertura)
- **Boletos**: nombre de cada zona, precio en COP, y qué incluye cada una

> Hoy hay 4 zonas de ejemplo: General $80.000, Preferente $150.000, Ringside $350.000, VIP Cage $750.000. **Todos los precios son inventados.**

---

## 🔴 2. Peleadores (hay 13 de ejemplo)

Por **cada** peleador del roster:

- Nombre y apellido reales, y **apodo** si tiene
- Disciplina y **división** de peso
- **Récord oficial**: victorias – derrotas – empates, y de esas cuántas por KO/TKO y cuántas por sumisión
- **Ficha física**: estatura, alcance, edad, peso, guardia (ortodoxo o zurdo)
- **Gimnasio o equipo** y **ciudad/país de origen**
- **Año de debut** en UFP
- Si es **campeón** o qué **posición** ocupa en el ranking
- **Historial de peleas**: rival, resultado (G/P/E), método, asalto, fecha y en qué evento fue

Las 6 divisiones actuales también son inventadas — hay que confirmar cuáles usa UFP de verdad (`src/data/divisions.ts`).

---

## 🔴 3. Fotos

Este es probablemente el trabajo más largo, y hoy **no hay ni una sola imagen real**: todo lo que se ve son rayas grises de placeholder.

| Qué | Cuántas | Formato sugerido |
| --- | --- | --- |
| Foto de cuerpo entero por peleador, en pose de pelea, **fondo oscuro o recortada** | 1 × peleador (13) | vertical, mín. 800×1200 |
| Foto de busto/retrato por peleador | 1 × peleador (13) | cuadrada, mín. 600×600 |
| Foto o render de la **arena** | 1 | horizontal, mín. 1600×900 |
| Foto por **producto** de la tienda | 8 | cuadrada, mín. 800×800 |
| **Logos de patrocinadores** | 1 × marca | PNG con fondo transparente |
| **Logo oficial de UFP** | 1 | SVG o PNG transparente |
| Imagen de cada **evento pasado** (para las tarjetas de resultados) | 3 | horizontal |

> Consistencia: si las fotos de peleadores vienen con fondos distintos, el roster va a verse desparejo. Lo ideal es una sesión con fondo uniforme.

---

## 🟡 4. Rankings

- Quiénes son los **campeones** por división, y cuántas defensas lleva cada uno
- **Top 10 de retadores** por división
- **Libra por libra** (P4P): top 10 general
- Si subieron o bajaron posiciones respecto al ranking anterior
- **Fecha de la última actualización**

---

## 🟡 5. Resultados de eventos pasados

Hoy hay 3 eventos pasados inventados (UFP 5, 4, 3). Por cada evento real:

- Número, nombre, fecha y sede
- Cartelera con **quién ganó, por qué método y en qué asalto**
- Un resumen corto del evento
- Link al video/highlight si existe

---

## 🟡 6. Tienda

Hoy hay 8 productos de ejemplo con precios inventados. Por producto:

- Nombre, **precio real en COP**, categoría (ropa / accesorios / coleccionables)
- Foto
- Tallas y stock, si aplica

> **Ojo:** el carrito hoy es una maqueta — suma productos pero **no cobra nada**. Antes de vender de verdad hay que decidir: pasarela de pago (Wompi, Mercado Pago, Bold) o mandar el pedido por WhatsApp como se hizo con los boletos.

---

## 🟡 7. Patrocinadores

- **Marcas actuales** con su logo y el nivel de patrocinio
- **Paquetes reales**: nombre, qué incluye cada uno y precio (o "a convenir")
- Un **kit de patrocinio** en PDF si existe, para enlazarlo

---

## 🟢 8. Textos institucionales

- Descripción real de UFP: quiénes son, desde cuándo, qué los diferencia
- **Requisitos reales** para inscribirse como peleador (hoy hay 4 genéricos)
- **Redes sociales** (hoy no hay ninguna en el sitio)
- Aviso legal / términos, si van a vender boletos o merch
- Política de tratamiento de datos — en Colombia la Ley 1581 la exige si se recogen datos por formulario

---

## 🟢 9. Traducción al inglés

El sitio es bilingüe. Todo lo de arriba que sea **texto** necesita su versión en inglés: descripciones de peleadores, textos de boletos, nombres de productos, paquetes de patrocinio.

Lo que **no** se traduce: nombres propios, apodos y nombres de eventos.

---

## Cómo entregar todo esto

Lo más práctico es una hoja de cálculo con una pestaña por bloque (peleadores, cartelera, boletos, productos, patrocinadores) y una carpeta de Drive con las fotos, nombradas por peleador (`marco-rios-full.jpg`, `marco-rios-busto.jpg`).

Con eso se carga todo de una sola pasada. Sin las fotos, el sitio puede salir igual: los placeholders están diseñados para no verse rotos.
