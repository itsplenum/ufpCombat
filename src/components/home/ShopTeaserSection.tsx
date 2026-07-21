import { getLocale, getTranslations } from "next-intl/server";
import { products } from "@/data/products";
import type { Locale } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { L } from "@/lib/localize";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/shop/ProductCard";

/** Vitrina de merch: 4 productos destacados; el catálogo completo vive en /tienda. */
export async function ShopTeaserSection() {
  const t = await getTranslations("sections.shop");
  const locale = (await getLocale()) as Locale;
  const featuredProducts = products.slice(0, 4);

  return (
    <Section id="tienda" borderTop>
      <SectionHeading
        title={t("title")}
        titleAccent={t("titleAccent")}
        kicker={t("kicker")}
        action={{ label: t("viewAllLink"), href: "/tienda" }}
      />
      <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.slug}
            name={L(product.name, locale)}
            priceLabel={formatPrice(product.price, locale)}
            image={product.image}
          />
        ))}
      </div>
    </Section>
  );
}
