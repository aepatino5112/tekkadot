import type { SortKey } from '../types/enums.js';

export type { SortKey };

export const PAGE_SIZE = 16;

export function getPagination(page: number) {
    const safePage = Number.isFinite(page) && page > 0 ? page : 1;
    const limit = PAGE_SIZE;
    const offset = (safePage - 1) * PAGE_SIZE;
    return { limit, offset, page: safePage };
}

export function getOrderForSort(sort?: SortKey): { column: string; ascending: boolean } {
    switch (sort) {
        case 'h-price':
            return { column: 'price', ascending: false };
        case 'l-price':
            return { column: 'price', ascending: true };
        case 'newest':
            return { column: 'created_at', ascending: false };
        case 'oldest':
            return { column: 'created_at', ascending: true };
        default:
            return { column: 'created_at', ascending: false };
    }
}
