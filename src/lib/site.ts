const DEFAULT_SITE_URL = "https://sancarloacutis.com.ar";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).replace(/\/$/, "");

export const SITE_NAME = "Misión San Carlo Acutis Chascomús";

export const SITE_DESCRIPTION =
  "Misión San Carlo Acutis en Chascomús, Argentina. Novedades, entronizaciones, testimonios, misiones y recursos para vivir la fe.";
