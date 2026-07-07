"use client";

import { useState } from "react";
import type { ProductCategory } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { ProductCard } from "./ProductCard";
import { CartDrawer } from "./CartDrawer";
import { CartProvider, useCart } from "./CartProvider";

export interface ProductView {
  slug: string;
  name: string;
  price: number;
  category: ProductCategory;
  image?: string;
}

export interface ShopLabels {
  filterAll: string;
  categories: Record<ProductCategory, string>;
  addToCart: string;
  added: string;
  cart: string;
  cartEmpty: string;
  total: string;
  checkoutSoon: string;
  remove: string;
  closeCart: string;
}

interface ShopCatalogProps {
  products: ProductView[];
  labels: ShopLabels;
}

type CategoryFilter = "all" | ProductCategory;

function AddToCartButton({ product, labels }: { product: ProductView; labels: ShopLabels }) {
  const { addItem, hasItem } = useCart();
  const inCart = hasItem(product.slug);

  return (
    <button
      type="button"
      onClick={() => addItem({ slug: product.slug, name: product.name, price: product.price })}
      className={`mt-1 cursor-pointer border px-3 py-2 font-condensed text-[13px] font-bold uppercase tracking-[.18em] transition-colors ${
        inCart
          ? "border-win/50 text-win"
          : "border-blood text-blood-hover hover:bg-blood hover:text-cream"
      }`}
    >
      {inCart ? labels.added : labels.addToCart}
    </button>
  );
}

function CatalogGrid({ products, labels }: ShopCatalogProps) {
  const [filter, setFilter] = useState<CategoryFilter>("all");

  const categoryTabs: { id: CategoryFilter; label: string }[] = [
    { id: "all", label: labels.filterAll },
    ...(Object.entries(labels.categories) as [ProductCategory, string][]).map(
      ([id, label]) => ({ id: id as CategoryFilter, label }),
    ),
  ];

  const visibleProducts = products.filter(
    (product) => filter === "all" || product.category === filter,
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        {categoryTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            className={`cursor-pointer px-5 py-2 font-condensed text-sm font-bold uppercase tracking-[.18em] transition-colors ${
              filter === tab.id
                ? "clip-cta-sm bg-blood text-cream"
                : "border border-cream/20 text-cream/60 hover:border-blood hover:text-blood-hover"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.slug}
            name={product.name}
            priceLabel={formatPrice(product.price)}
            image={product.image}
            action={<AddToCartButton product={product} labels={labels} />}
          />
        ))}
      </div>
    </div>
  );
}

/** Catálogo con filtro por categoría + carrito mock persistente. */
export function ShopCatalog({ products, labels }: ShopCatalogProps) {
  return (
    <CartProvider>
      <CatalogGrid products={products} labels={labels} />
      <CartDrawer labels={labels} />
    </CartProvider>
  );
}
