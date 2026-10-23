# Millionhair · Web

Sitio de una sola página para **Millionhair**, barbería en Av. La Paz 683, Miraflores (Lima).
Muestra servicios, equipo, lookbook, reseñas y ubicación, y manda todas las reservas a [Fresha](https://www.fresha.com/es/a/millionhair-miraflores-avenida-la-paz-683-ltgt8x8y).

## Características

- **Reserva en un clic**: cada servicio y cada barbero abre Fresha con esa opción ya elegida.
- **Estado "abierto / cerrado" en vivo**, calculado con la hora de Lima aunque el visitante esté en otra zona horaria.
- **Videos en loop** que se reproducen solo cuando están en pantalla y se quedan en el póster si el usuario prefiere menos movimiento.
- **Rendimiento**: HTML estático, sin framework en el cliente. Las fotos salen en WebP con `srcset` y las fuentes son locales.
- **SEO local**: JSON-LD `BarberShop` (horario, dirección, ofertas y `ReserveAction`), Open Graph, sitemap y `robots.txt`.
- **Accesibilidad**: navegación con teclado, foco visible, áreas táctiles de 44 px, textos para lectores de pantalla y respeto de `prefers-reduced-motion`.

## Stack

| Herramienta                    | Uso                                                             |
| ------------------------------ | --------------------------------------------------------------- |
| [Astro 7](https://astro.build) | Sitio estático y optimización de imágenes (`astro:assets`)      |
| SCSS                           | Estilos por componente, con tokens expuestos como variables CSS |
| TypeScript (strict)            | Datos, lógica y scripts del navegador                           |
| Vitest                         | Tests de la lógica de `src/lib`                                 |
| Prettier                       | Formato de TS, SCSS, JSON y Markdown                            |
| Vercel                         | Hosting (detecta Astro solo, sin configuración)                 |

Fuentes: Archivo Variable (eje de ancho) para títulos y texto, y Michroma para el logotipo.

## Cómo empezar

Requiere **Node 22.23.4 o superior** (lo exige Astro 7). El archivo `.nvmrc` fija la versión 22.

```bash
npm install
npm run dev
```

El sitio queda en http://localhost:4321.

### Scripts

| Comando                           | Qué hace                                      |
| --------------------------------- | --------------------------------------------- |
| `npm run dev`                     | Servidor de desarrollo                        |
| `npm run build`                   | Revisa tipos (`astro check`) y genera `/dist` |
| `npm run preview`                 | Sirve el build de `/dist`                     |
| `npm test`                        | Corre los tests con Vitest                    |
| `npm run check`                   | Solo revisa tipos                             |
| `npm run format` / `format:check` | Aplica o verifica el formato con Prettier     |

### Variables de entorno

| Variable   | Para qué                                                                                 | Por defecto                      |
| ---------- | ---------------------------------------------------------------------------------------- | -------------------------------- |
| `SITE_URL` | Dominio público. Lo usan el canonical, Open Graph, el JSON-LD, el sitemap y `robots.txt` | `https://millionhair.vercel.app` |

Hay un ejemplo en `.env.example`. En Vercel se define en _Project Settings → Environment Variables_.

## Estructura

```
src/
  data/          contenido editable: negocio, servicios, equipo, lookbook y reseñas
  lib/           lógica: horario, JSON-LD, formatos y helpers de video (con sus *.test.ts)
  styles/        _tokens.scss, _mixins.scss y global.scss
  layouts/       BaseLayout: <head>, SEO y fuentes
  components/
    ui/          Button, Icon, Stars, LoopVideo, OpenStatus, SectionHeader
    layout/      Header, Footer, StickyBooking (barra fija en móvil)
    sections/    Hero, Services, Experience, Team, Lookbook, Reviews, Visit
  assets/        fotos que se optimizan en el build
  pages/         index.astro y robots.txt.ts
public/
  video/         loops en mp4 + webm, con su póster
```

## Editar el contenido

Todo el contenido vive en `src/data/`; no hace falta tocar los componentes.

| Quiero cambiar…                             | Archivo                |
| ------------------------------------------- | ---------------------- |
| Horario, dirección, Instagram, calificación | `src/data/site.ts`     |
| Servicios, precios y duración               | `src/data/services.ts` |
| Barberos y sus enlaces de reserva           | `src/data/team.ts`     |
| Fotos y nombres del lookbook                | `src/data/lookbook.ts` |
| Reseñas destacadas y frases de la franja    | `src/data/reviews.ts`  |

Los enlaces de Fresha se arman con `bookService(id)` y `bookWith(id)` en `site.ts`: solo hay que poner el id del servicio o del profesional.

## Convenciones

- **Tokens**: colores, espacios, área táctil (`--tap`) y breakpoints están en `_tokens.scss`. En los componentes no se escriben colores hex sueltos.
- **Mixins**: `_mixins.scss` reúne lo que se repite: `ink($alpha)` para velos negros, `mono` para fotos y videos en blanco y negro, `display($size, $fit)` para títulos, `icon-link` y `underline-on-hover`.
- **Temas**: las secciones oscuras usan `.theme-dark`, que redefine `--muted` y `--rule`. Dentro de ellas se usan esas variables, no los colores directos.
- **Scripts**: los que corren en el navegador importan de `src/lib/motion.ts`, que no se usa en el frontmatter.
- **Formato**: los `.astro` se formatean a mano, porque `prettier-plugin-astro` parte el texto en línea y cambia cómo se ve.

## Deploy

Vercel construye con `npm run build` y publica `/dist`. Antes del primer deploy:

1. En _Project Settings → Node.js Version_, elegir **22.x**.
2. Definir `SITE_URL` con el dominio del sitio.
