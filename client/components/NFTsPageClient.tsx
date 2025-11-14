"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from 'next/navigation';
import NFTsList from "@/components/NFTsList";
import Pagination from "@/components/Pagination";
import FilterButton from "@/components/FilterButton";
import { type NFTProps } from "@/types/cards";

const PAGE_SIZE = 15;

interface Props {
  nfts: NFTProps[];
}

export default function NFTsPageClient({ nfts }: Props) {
  const searchParams = useSearchParams();
  const initialPage = parseInt(searchParams?.get('page') ?? '1', 10) || 1;

  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  useEffect(() => {
    const p = parseInt(searchParams?.get('page') ?? '1', 10) || 1;
    if (p !== currentPage) setCurrentPage(p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams?.toString()]);

  const sortParam = (searchParams?.get('sort')) ?? '';

  const sorted = useMemo(() => {
    const copy = [...nfts];
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
  }, [nfts, sortParam]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));

  const visible = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sorted.slice(start, start + PAGE_SIZE);
  }, [currentPage, sorted]);

  return (
    <div>
      <div className="flex justify-start items-center gap-3 mt-4">
        <p className="text-[0.8rem] lg:text-[1.1rem] font-medium text-black-300 dark:text-white-300">Filter by</p>
        <FilterButton />
      </div>

      <NFTsList nfts={visible} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(p) => setCurrentPage(p)}
        variant="nft"
      />
    </div>
  );
}
