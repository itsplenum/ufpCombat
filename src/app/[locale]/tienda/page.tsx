import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { isEnabled } from "@/data/features";
import { localizedAlternates } from "@/lib/seo";
import { products } from "@/data/products";
import type { Locale, ProductCategory } from "@/data/types";
import { L } from "@/lib/localize";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShopCatalog, type ProductView, type ShopLabels } from "@/components/shop/ShopCatalog";

interface ShopPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ShopPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "shopPage" });

  return {
    title: `${t("title")} ${t("titleAccent")}`,
    description: t("kicker"),
    alternates: localizedAlternates("/tienda", locale),
  };
}

/** /tienda — full catalog with category filter and a mock cart. */
export default async function ShopPage({ params }: ShopPageProps) {
  if (!isEnabled("shop")) notFound();
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);

  const t = await getTranslations("shopPage");
  const locale = (await getLocale()) as Locale;

  const productViews: ProductView[] = products.map((product) => ({
    slug: product.slug,
    name: L(product.name, locale),
    price: product.price,
    category: product.category,
    image: product.image,
  }));

  const categoryIds: ProductCategory[] = ["apparel", "accessories", "collectible"];
  const labels: ShopLabels = {
    filterAll: t("filterAll"),
    categories: Object.fromEntries(
      categoryIds.map((id) => [id, t(`categories.${id}`)]),
    ) as Record<ProductCategory, string>,
    addToCart: t("addToCart"),
    added: t("added"),
    cart: t("cart"),
    cartEmpty: t("cartEmpty"),
    total: t("total"),
    checkoutSoon: t("checkoutSoon"),
    remove: t("remove"),
    closeCart: t("closeCart"),
    increaseQuantity: t("increaseQuantity"),
    decreaseQuantity: t("decreaseQuantity"),
  };

  return (
    <>
      <main>
        <Section>
          <SectionHeading title={t("title")} titleAccent={t("titleAccent")} kicker={t("kicker")} />
          <ShopCatalog products={productViews} labels={labels} />
        </Section>
      </main>
      <Footer compact />
    </>
  );
}
