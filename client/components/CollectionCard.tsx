"use client";

import { type CollectionCardProps } from "@/types/cards";
import Image from "next/image";
import { useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const CollectionCard = ({ name }: CollectionCardProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const current = searchParams?.get('collection') ?? '';

    const onClick = useCallback(() => {
        const params = new URLSearchParams(searchParams?.toString() ?? '');
        if (current === name) {
            // clear filter if already selected
            params.delete('collection');
        } else {
            params.set('collection', name);
        }
        // reset to first page when changing collection
        params.set('page', '1');
        router.push(`?${params.toString()}`);
    }, [router, searchParams, current, name]);

    const selected = current === name;

    return (
        <button onClick={onClick} className="relative aspect-video w-full cursor-pointer max-w-sm lg:max-w-106 rounded-lg overflow-hidden transition-shadow duration-300 focus:outline-none" aria-pressed={selected} aria-label={`Filter by ${name}`}>
            <Image 
                src={`/collections/${name}.svg`}
                alt={`${name} image`}
                fill
                className={`object-cover transform transition-transform duration-500 ${selected ? 'scale-105' : 'hover:scale-105'}`}
            />
            <div className={`absolute inset-0 ${selected ? 'ring-4 ring-pink-200/40' : 'hover:bg-pink-200/20'} transition-colors duration-300`} />
        </button>
    );
};

export default CollectionCard;