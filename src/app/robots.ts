import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { isBeta } from "@/lib/environment";

export default function robots(): MetadataRoute.Robots {
  // The beta runs on placeholder content, so it is closed to crawlers.
  if (isBeta) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.domain}/sitemap.xml`,
  };
}
