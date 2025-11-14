
"use client";

import { useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const FilterButton = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const current = searchParams?.get('sort') ?? '';

    const onChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const params = new URLSearchParams(searchParams?.toString() ?? '');
        if (value) params.set('sort', value);
        else params.delete('sort');
        // reset to first page when changing sort/filter
        params.set('page', '1');
        router.push(`?${params.toString()}`);
    }, [router, searchParams]);

    return (
        <div>
            <label htmlFor="Headline">
                <select name="Headline" id="Headline" value={current} onChange={onChange} className="lg:mt-0.5 p-1 lg:p-2 w-full rounded-xl border-black-500 dark:border-white-500 border text-black-300 dark:text-white-300 shadow-sm sm:text-sm">
                    <option value="" className="text-black-300">Default</option>
                    <option value="h-price" className="text-black-300">Highest Price</option>
                    <option value="l-price" className="text-black-300">Lowest Price</option>
                    <option value="newest" className="text-black-300">Newest</option>
                    <option value="oldest" className="text-black-300">Oldest</option>
                </select>
            </label>
        </div>
    );
};

export default FilterButton;