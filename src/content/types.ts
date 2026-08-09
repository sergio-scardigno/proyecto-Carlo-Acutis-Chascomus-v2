/**
 * Tipos de ENTRADA del contenido estatico.
 *
 * Son deliberadamente mas chicos que los tipos publicos de `@/lib/content`: aca
 * solo se escribe lo que hay que decidir a mano. Los campos derivados
 * (`imagen`, `youtubeEmbedUrl`, `thumbnailUrl`) los calcula `content.ts`.
 */

/** Comun a todas las colecciones. */
type Base = {
  /**
   * Ordena el listado (mayor id = primero) y es la key de React.
   * No reasignar ids existentes; un item nuevo va con id mayor.
   */
  id: number;
  /** Default: true. */
  publicado?: boolean;
};

export type NovedadInput = Base & {
  /** URL publica de la nota, presente en el sitemap. Cambiarlo rompe enlaces. */
  slug: string;
  titulo: string;
  resumen?: string;
  contenido?: string;
  fecha?: string;
  /** Rutas bajo `public/`. La primera es la portada del listado y de la home. */
  imagenes?: string[];
  youtubeUrl?: string;
};

export type EntronizacionInput = Base & {
  slug: string;
  lugar: string;
  fecha?: string;
  descripcion?: string;
  imagenes?: string[];
  /** Default: true. Hoy ninguna vista lo usa para filtrar. */
  destacada?: boolean;
};

export type VideoInput = Base & {
  titulo: string;
  descripcion?: string;
  /** Obligatorio: sin un enlace de YouTube valido el video no se muestra. */
  youtubeUrl: string;
};

export type TestimonioInput = Base & {
  slug: string;
  titulo?: string;
  descripcion?: string;
  /** Obligatorio: sin un enlace de YouTube valido el testimonio no se muestra. */
  youtubeUrl: string;
};

export type MisionInput = Base & {
  titulo: string;
  texto?: string;
  fecha?: string;
  imagenes?: string[];
  youtubeUrl?: string;
};
