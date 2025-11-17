"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductsList from "@/components/ProductsList";
import Pagination from "@/components/Pagination";
import FilterButton from "@/components/FilterButton";
import { type ProductProps } from "@/types/cards";
import { searchProducts } from "@/lib/api";

const PAGE_SIZE = 16;

interface Props {
  products: ProductProps[];
}

export default function ProductsPageClient({ products: initialProducts }: Props) {
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<ProductProps[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const sortParam = searchParams?.get("sort") ?? "";
  const collectionParam = searchParams?.get("collection") ?? "";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const result = await searchProducts({
          page: currentPage,
          sort: sortParam as any,
          collection: collectionParam as any,
        });
        setProducts(result.items);
        setTotalPages(result.meta.totalPages);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, sortParam, collectionParam]);

  useEffect(() => {
    const p = parseInt(searchParams?.get("page") ?? "1", 10) || 1;
    setCurrentPage(p);
  }, [searchParams]);

  return (
    <div>
      <div className="flex justify-start items-center gap-3 mt-4">
        <p className="text-[0.8rem] lg:text-[1.1rem] font-medium text-black-300 dark:text-white-300">
          Filter by
        </p>
        <FilterButton />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <ProductsList products={products} />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(p) => setCurrentPage(p)}
      />
    </div>
  );
}
