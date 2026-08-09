# Proyecto Carlo Acutis Chascomús v2

Esta es una plataforma web desarrollada con [Next.js](https://nextjs.org) dedicada a la comunidad de Carlo Acutis en Chascomús. El sitio proporciona información sobre novedades (blog), videos, novenas y detalles sobre las entronizaciones de las reliquias.

## Características del Proyecto

- **Framework**: Next.js 16 (App Router) con Turbopack.
- **Lenguaje**: TypeScript.
- **Estilos**: Tailwind CSS 4 con `@tailwindcss/postcss`.
- **Estructura**:
    - `src/app`: Rutas y páginas de la aplicación.
    - `src/components`: Componentes de UI reutilizables.
    - `src/lib`: Lógica de negocio y servicios de datos.
    - `src/content`: El contenido del sitio, versionado y editable a mano.

## Gestión de Contenido

**No hay CMS.** Novedades, entronizaciones, videos, testimonios y misiones son arrays de
TypeScript en `src/content/`, y las imágenes son archivos dentro de `public/img/`. Editar el
sitio es editar esos archivos y hacer deploy.

| Archivo | Sección |
|---|---|
| `src/content/novedades.ts` | `/blog` y la novedad destacada de la home |
| `src/content/entronizaciones.ts` | `/entronizaciones` |
| `src/content/videos.ts` | `/videos` y el video destacado de la home |
| `src/content/testimonios.ts` | `/testimonios` |
| `src/content/misiones.ts` | `/misiones` |

Los tipos están en `src/content/types.ts`. `src/lib/content.ts` solo deriva los campos
calculados (la portada, las URLs de embed y miniatura de YouTube), ordena y filtra.

### Cómo agregar una novedad

1. Poné las imágenes en `public/img/novedades/<slug>/`.
2. Agregá un objeto al principio de `src/content/novedades.ts` con un `id` **mayor** a todos
   los existentes: el `id` es lo que define el orden, no la posición en el array.
3. Escribí solo `youtubeUrl` si hay video; el embed y la miniatura se derivan solos.

Dos cosas que conviene no tocar:

- El **`slug`** es la URL pública y está en el sitemap: cambiarlo rompe enlaces. Por eso la
  novedad con slug `entronizacion` se titula "Canonización" aunque no coincidan.
- Los **`id`** son la key de React y el orden del listado. No los reasignes.

## Instagram

Es la única sección dinámica. `src/lib/instagram.ts` lee las tablas `instagram_profile` e
`instagram_posts` de NocoDB (API v2) usando el cliente de `src/lib/nocodb.ts`, que resuelve los
IDs de tabla por nombre vía la API de metadatos.

Las miniaturas de la grilla son adjuntos de NocoDB (columna `thumbnail`), que sube el scraper;
usamos la variante `card_cover` que NocoDB genera sola. La foto completa la sirve el embed
oficial de Instagram dentro del modal. Un post sin miniatura no rompe nada: su card se
renderiza como card de texto.

> **Requisito del servidor:** el reverse proxy delante de NocoDB tiene que exponer `/download`
> y `/dltemp` además de `/api`, si no las miniaturas dan 404.

Si `NOCODB_BASE_URL` o `NOCODB_API_TOKEN` no están configuradas, la sección simplemente no
aparece y el resto del sitio funciona igual.

## Comenzando

Para ejecutar el servidor de desarrollo:

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Cómo Actualizar

Para mantener el proyecto al día con las últimas versiones de Next.js y sus dependencias críticas, sigue estos pasos:

1. **Ejecutar la actualización**:
   ```bash
   npm install next@latest react@latest react-dom@latest eslint-config-next@latest
   ```

2. **Verificar estabilidad**:
   Siempre ejecuta el build para asegurar que no hay errores de tipado o cambios disruptivos:
   ```bash
   npm run build
   ```

3. **Verificar calidad de código**:
   ```bash
   npm run lint
   ```

## Despliegue

La forma más sencilla de desplegar es usando la [Plataforma Vercel](https://vercel.com/new).

Las únicas variables de entorno son `NOCODB_BASE_URL` y `NOCODB_API_TOKEN` (para la sección de
Instagram) y las tres `NEXT_PUBLIC_EMAILJS_*` (para el formulario de contacto). Ver
`.env.local.example`.

