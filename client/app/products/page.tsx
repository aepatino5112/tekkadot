import Collections from "@/components/Collections";
import GradientBanner from "@/components/GradientBanner";
import ProductsPageClient from "@/components/ProductsPageClient";
import { searchProducts } from "@/lib/api";
import { type ProductProps } from "@/types/cards";

const Products = async () => {
  let products: ProductProps[] = [];
  try {
    const result = await searchProducts({ page: 1, sort: "newest" });
    products = result.items;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    // Fallback to an empty array to prevent the page from crashing
  }

  return (
    <div className="flex flex-col mx-10 min-w-0">
      <GradientBanner variant="products" />
      <Collections />
      <ProductsPageClient products={products} />
    </div>
  );
};

export default Products;
