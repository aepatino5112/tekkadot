import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = useCallback((page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);

    const params = new URLSearchParams(searchParams?.toString() ?? '');
    params.set('page', page.toString());
    // push new query without scrolling
    router.push(`?${params.toString()}`, { scroll: false });
  }, [onPageChange, router, searchParams, totalPages]);

  const renderPageNumbers = () => {
    const pages: Array<number | string> = [];
    const maxVisiblePages = 3; // show current +/- 1 (plus first/last)
    let startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) pages.push(i);

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center my-8">
      <nav className="inline-flex items-center gap-3 rounded-full border-2 border-black-500 dark:border-white-500 px-3 py-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className={`rounded-full p-2 ${currentPage === 1 ? 'text-black-400 dark:text-white-400 cursor-not-allowed' : 'text-gray-700 dark:text-white-700 hover:bg-gray-100'}`}
        >
          <ChevronLeft size={18} />
        </button>

        {renderPageNumbers().map((page, idx) => (
          typeof page === 'number' ? (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-9 h-9 flex items-center justify-center rounded-full text-lg font-medium transition-colors ${
                currentPage === page
                  ? 'bg-vivid-pink-500 text-white-500' // pink active
                  : 'text-black-500 dark:text-white-500 hover:bg-gray-100 dark:hover:text-black-500'
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={`el-${idx}`} className="text-black-500 dark:text-white-500 text-lg px-2">{page}</span>
          )
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className={`rounded-full p-2 ${currentPage === totalPages ? 'text-black-400 dark:text-white-400 cursor-not-allowed' : 'text-gray-700 dark:text-white-700 hover:bg-gray-100'}`}
        >
          <ChevronRight size={18} />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
