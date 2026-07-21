/**
 * Where this build is running.
 *
 * The same repo serves two deployments: the beta on Vercel, which still runs on
 * placeholder fighters, results and prices, and production on the VPS behind
 * Caddy. The beta must stay out of search engines — invented records and made-up
 * ticket prices indexed under the UFP name would be worse than no site at all,
 * and Google is slow to forget.
 *
 * `VERCEL` is set automatically on Vercel's build and runtime, so this needs no
 * configuration on either side.
 */
export const isBeta = Boolean(process.env.VERCEL);
