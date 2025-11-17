import type { Request, Response } from 'express';
import { resolveUserId } from '../services/walletService.js';
import * as productService from '../services/productService.js';
import { HttpError } from '../utils/error.js';
import type { ProductCreate, ProductUpdate, Collection, SortKey } from '../types/enums.js';

// Helpers de parseo
function parseSort(v: unknown): SortKey | undefined {
    const s = typeof v === 'string' ? v : undefined;
    return s && ['h-price', 'l-price', 'newest', 'oldest'].includes(s) ? (s as SortKey) : undefined;
}
function parsePage(v: unknown): number {
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1;
}
function parseCollection(v: unknown): Collection | undefined {
    const c = typeof v === 'string' ? v : undefined;
    return c && ['gaming', 'laptop', 'mobile', 'wearable'].includes(c) ? (c as Collection) : undefined;
}

// Helpers de error
function getStatus(err: unknown): number {
    return err instanceof HttpError ? err.status : 400;
}
function getMessage(err: unknown): string {
    return err instanceof Error ? err.message : 'Error desconocido';
}

export async function createProduct(req: Request, res: Response) {
    try {
        const walletParams: { walletAddress?: string; walletId?: string } = {};
        if (typeof req.body?.walletAddress === 'string') walletParams.walletAddress = req.body.walletAddress;
        if (typeof req.body?.walletId === 'string') walletParams.walletId = req.body.walletId;
        if (!walletParams.walletAddress && !walletParams.walletId) throw new HttpError(400, 'walletAddress o walletId es requerido');

        const payload: ProductCreate = {
            title: String(req.body.title ?? '').trim(),
            description: String(req.body.description ?? '').trim(),
            collection: parseCollection(req.body.collection) as Collection,
            price: Number(req.body.price),
            ipfs_hash: String(req.body.ipfs_hash ?? '').trim(),
            status: (req.body.status as 'listed' | 'sold') ?? 'listed',
        };

        const userId = await resolveUserId(walletParams);
        const product = await productService.createProduct(userId, payload);
        res.status(201).json(product);
    } catch (err: unknown) {
        res.status(getStatus(err)).json({ error: getMessage(err) });
    }
}

export async function updateProduct(req: Request, res: Response) {
    try {
        const walletParams: { walletAddress?: string; walletId?: string } = {};
        if (typeof req.body?.walletAddress === 'string') walletParams.walletAddress = req.body.walletAddress;
        if (typeof req.body?.walletId === 'string') walletParams.walletId = req.body.walletId;
        if (!walletParams.walletAddress && !walletParams.walletId) throw new HttpError(400, 'walletAddress o walletId es requerido');

        const payload: ProductUpdate = {};
        if (typeof req.body.title === 'string') payload.title = req.body.title.trim();
        if (typeof req.body.description === 'string') payload.description = req.body.description.trim();
        const c = parseCollection(req.body.collection);
        if (c) payload.collection = c;
        if (req.body.price !== undefined) {
            const p = Number(req.body.price);
            if (!(p > 0)) throw new HttpError(400, 'price inválido');
            payload.price = p;
        }
        if (typeof req.body.ipfs_hash === 'string') payload.ipfs_hash = req.body.ipfs_hash.trim();
        if (req.body.status === 'listed' || req.body.status === 'sold') payload.status = req.body.status;

        if (!req.params.id) {
            res.status(400).json({ error: 'Missing productId' });
            return;
        }

        const userId = await resolveUserId(walletParams);
        const product = await productService.updateProduct(req.params.id, userId, payload);
        res.json(product);
    } catch (err: unknown) {
        res.status(getStatus(err)).json({ error: getMessage(err) });
    }
}

export async function deleteProduct(req: Request, res: Response) {
    try {
        const walletParams: { walletAddress?: string; walletId?: string } = {};
        if (typeof req.query?.walletAddress === 'string') walletParams.walletAddress = req.query.walletAddress;
        if (typeof req.query?.walletId === 'string') walletParams.walletId = req.query.walletId;
        if (!walletParams.walletAddress && !walletParams.walletId) throw new HttpError(400, 'walletAddress o walletId es requerido');

        if (!req.params.id) {
            res.status(400).json({ error: 'Missing productId' });
            return;
        }

        const userId = await resolveUserId(walletParams);
        const result = await productService.deleteProduct(req.params.id, userId);
        res.json(result);
    } catch (err: unknown) {
        res.status(getStatus(err)).json({ error: getMessage(err) });
    }
}

export async function searchProducts(req: Request, res: Response) {
    try {
        const page = parsePage(req.query?.page);
        const sort = parseSort(req.query?.sort);
        const collection = parseCollection(req.query?.collection);
        const result = await productService.searchProducts({ page, sort, collection });
        res.json(result);
    } catch (err: unknown) {
        res.status(400).json({ error: getMessage(err) });
    }
}

export async function getUserProducts(req: Request, res: Response) {
    try {
        const walletParams: { walletAddress?: string; walletId?: string } = {};
        if (typeof req.query?.walletAddress === 'string') walletParams.walletAddress = req.query.walletAddress;
        if (typeof req.query?.walletId === 'string') walletParams.walletId = req.query.walletId;
        if (!walletParams.walletAddress && !walletParams.walletId) throw new HttpError(400, 'walletAddress o walletId es requerido');

        const userId = await resolveUserId(walletParams);
        const products = await productService.getProductsByUser(userId);
        res.json({ items: products });
    } catch (err: unknown) {
        res.status(getStatus(err)).json({ error: getMessage(err) });
    }
}
