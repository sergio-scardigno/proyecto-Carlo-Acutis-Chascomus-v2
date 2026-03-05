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
    - `data`: Almacenamiento local para contenido en formato CSV.

## Gestión de Contenido

El proyecto utiliza un sistema dual de fuentes de contenido configurado en `src/lib/content.ts`:
1. **Directus**: Si se configuran las variables de entorno `DIRECTUS_BASE_URL` y `DIRECTUS_API_TOKEN`, el sitio consumirá datos dinámicos desde un CMS Directus.
2. **CSV**: Como fallback o para desarrollo sencillo, utiliza archivos `.csv` en la carpeta `data/`.

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

La forma más sencilla de desplegar es usando la [Plataforma Vercel](https://vercel.com/new). Asegúrate de configurar las variables de entorno necesarias (`DIRECTUS_*`) si vas a usar el CMS externo.

