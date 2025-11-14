"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from 'next/navigation';
import ProductsList from "@/components/ProductsList";
import Pagination from "@/components/Pagination";
import FilterButton from "@/components/FilterButton";
import { type ProductProps } from "@/types/cards";

const PAGE_SIZE = 16;

interface Props {
  products: ProductProps[];
}

export default function ProductsPageClient({ products }: Props) {
  const searchParams = useSearchParams();
  const initialPage = parseInt(searchParams?.get('page') ?? '1', 10) || 1;

  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  useEffect(() => {
    const p = parseInt(searchParams?.get('page') ?? '1', 10) || 1;
    if (p !== currentPage) setCurrentPage(p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams?.toString()]);

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));

  const sortParam = (searchParams?.get('sort')) ?? '';

  const sortedProducts = useMemo(() => {
    const copy = [...products];
    switch (sortParam) {
      case 'h-price':
        return copy.sort((a, b) => b.price - a.price);
      case 'l-price':
        return copy.sort((a, b) => a.price - b.price);
      case 'newest':
        return copy.sort((a, b) => b.id - a.id);
      case 'oldest':
        return copy.sort((a, b) => a.id - b.id);
      default:
        return copy;
    }
  }, [products, sortParam]);

  const visibleProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedProducts.slice(start, start + PAGE_SIZE);
  }, [currentPage, sortedProducts]);

  return (
    <div>
      <div className="flex justify-start items-center gap-3 mt-4">
        <p className="text-[0.8rem] lg:text-[1.1rem] font-medium text-black-300 dark:text-white-300">Filter by</p>
        <FilterButton />
      </div>

      <ProductsList products={visibleProducts} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(p) => setCurrentPage(p)}
      />
    </div>
  );
}
