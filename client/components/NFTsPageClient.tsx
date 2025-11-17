"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import NFTsList from "@/components/NFTsList";
import Pagination from "@/components/Pagination";
import FilterButton from "@/components/FilterButton";
import { type NFTProps } from "@/types/cards";
import { searchNFTs } from "@/lib/api";

const PAGE_SIZE = 16;

interface Props {
  nfts: NFTProps[];
}

export default function NFTsPageClient({ nfts: initialNfts }: Props) {
  const searchParams = useSearchParams();

  const [nfts, setNfts] = useState<NFTProps[]>(initialNfts);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const sortParam = (searchParams?.get('sort')) ?? '';

  useEffect(() => {
    const fetchNfts = async () => {
      setLoading(true);
      try {
        const result = await searchNFTs({
          page: currentPage,
          sort: sortParam as any,
        });
        setNfts(result.items);
        setTotalPages(result.meta.totalPages);
      } catch (error) {
        console.error("Failed to fetch NFTs:", error);
        setNfts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNfts();
  }, [currentPage, sortParam]);

  useEffect(() => {
    const p = parseInt(searchParams?.get('page') ?? '1', 10) || 1;
    setCurrentPage(p);
  }, [searchParams]);

  return (
    <div>
      <div className="flex justify-start items-center gap-3 mt-4">
        <p className="text-[0.8rem] lg:text-[1.1rem] font-medium text-black-300 dark:text-white-300">Filter by</p>
        <FilterButton />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <NFTsList nfts={nfts} />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(p) => setCurrentPage(p)}
        variant="nft"
      />
    </div>
  );
}
