import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** Vercel sets this on its build machines. */
const isVercel = Boolean(process.env.VERCEL);

/**
 * Site-wide security headers. They live here rather than only in the Caddyfile
 * so they survive a change of hosting — the same repo is deployed both to
 * Vercel (preview) and to the VPS behind Caddy (production).
 *
 * HSTS is included here too, for the Vercel deployment: on the VPS it is Caddy
 * that terminates TLS and emits it, so it is skipped there to avoid sending
 * the header twice.
 *
 * There is deliberately no full CSP: Next injects inline scripts and a strict
 * policy needs a per-request nonce, which would break static prerendering.
 * `frame-ancestors` can be enforced without that cost.
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
  ...(isVercel
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains",
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  // Only for self-hosting in Docker. Vercel builds its own output format and
  // warns when this is set, so it is left off there.
  ...(isVercel ? {} : { output: "standalone" as const }),
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
