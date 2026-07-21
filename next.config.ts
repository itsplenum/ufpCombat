import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/**
 * Headers de seguridad aplicados a todo el sitio. Van acá y no solo en el
 * Caddyfile para que sobrevivan a un cambio de hosting (Vercel, otro proxy).
 * HSTS es la excepción: lo emite Caddy, que es quien termina el TLS.
 *
 * No hay CSP completa a propósito: Next inyecta scripts inline y una CSP
 * estricta necesita nonces por request, lo que rompería el prerender estático.
 * `frame-ancestors` sí se puede aplicar sin ese costo.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  // No delatar la versión del framework.
  poweredByHeader: false,
  experimental: {
    // Habilita `app/global-not-found.tsx`. Hace falta porque el root layout
    // vive en un segmento dinámico (`app/[locale]/layout.tsx`), así que no hay
    // un layout único desde el cual componer un 404 para rutas sin match.
    globalNotFound: true,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);
