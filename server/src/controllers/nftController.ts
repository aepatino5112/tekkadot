// src/controllers/nftController.ts
import type { Request, Response } from 'express';
import { HttpError } from '../utils/error.js';
import { resolveUserId } from '../services/walletService.js';
import * as nftService from '../services/nftService.js';
import type { SortKey, Category, Rareness, NFTCreate, NFTUpdate } from '../types/enums.js';

function parseSort(v: unknown): SortKey | undefined {
    const s = typeof v === 'string' ? v : undefined;
    return s === 'h-price' || s === 'l-price' || s === 'newest' || s === 'oldest' ? s : undefined;
}
function parsePage(v: unknown): number {
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1;
}
function parseCategory(v: unknown): Category | undefined {
    const c = typeof v === 'string' ? v : undefined;
    return c && ['art', 'collectible', 'music', 'fresh', 'cyberpunk'].includes(c) ? (c as Category) : undefined;
}
function parseRareness(v: unknown): Rareness | undefined {
    const r = typeof v === 'string' ? v : undefined;
    return r && ['common', 'rare', 'epic', 'legendary'].includes(r) ? (r as Rareness) : undefined;
}

export async function createNFT(req: Request, res: Response) {
    try {
        const walletAddress = typeof req.body?.walletAddress === 'string' ? req.body.walletAddress : undefined;
        const walletId = typeof req.body?.walletId === 'string' ? req.body.walletId : undefined;
        if (!walletAddress && !walletId) throw new HttpError(400, 'walletAddress o walletId es requerido');

        const payload: NFTCreate = {
            title: String(req.body.title ?? '').trim(),
            description: String(req.body.description ?? '').trim(),
            category: parseCategory(req.body.category) as Category,
            rareness: parseRareness(req.body.rareness) as Rareness,
            price: Number(req.body.price),
            ipfs_hash: String(req.body.ipfs_hash ?? '').trim(),
            status: (req.body.status as 'listed' | 'sold') ?? 'listed',
        };
        if (!payload.title || !payload.description || !payload.category || !payload.rareness || !payload.ipfs_hash || !(payload.price > 0)) {
            throw new HttpError(400, 'Campos de NFT inválidos');
        }

        const userId = await resolveUserId({ walletAddress, walletId });
        const nft = await nftService.createNFT(userId, payload);
        res.status(201).json(nft);
    } catch (err) {
        const status = err instanceof HttpError ? err.status : 400;
        res.status(status).json({ error: (err as Error).message });
    }
}

export async function updateNFT(req: Request, res: Response) {
    try {
        const walletAddress = typeof req.body?.walletAddress === 'string' ? req.body.walletAddress : undefined;
        const walletId = typeof req.body?.walletId === 'string' ? req.body.walletId : undefined;
        if (!walletAddress && !walletId) throw new HttpError(400, 'walletAddress o walletId es requerido');

        const payload: NFTUpdate = {};
        if (typeof req.body.title === 'string') payload.title = req.body.title.trim();
        if (typeof req.body.description === 'string') payload.description = req.body.description.trim();
        const c = parseCategory(req.body.category);
        if (c) payload.category = c;
        const r = parseRareness(req.body.rareness);
        if (r) payload.rareness = r;
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

        const userId = await resolveUserId({ walletAddress, walletId });
        const nft = await nftService.updateNFT(req.params.id, userId, payload);
        res.json(nft);
    } catch (err) {
        const status = err instanceof HttpError ? err.status : 400;
        res.status(status).json({ error: (err as Error).message });
    }
}

export async function deleteNFT(req: Request, res: Response) {
    try {
        const walletAddress = typeof req.query?.walletAddress === 'string' ? req.query.walletAddress : undefined;
        const walletId = typeof req.query?.walletId === 'string' ? req.query.walletId : undefined;
        if (!walletAddress && !walletId) throw new HttpError(400, 'walletAddress o walletId es requerido');

        if (!req.params.id) {
            res.status(400).json({ error: 'Missing productId' });
            return;
        }

        const userId = await resolveUserId({ walletAddress, walletId });
        const result = await nftService.deleteNFT(req.params.id, userId);
        res.json(result);
    } catch (err) {
        const status = err instanceof HttpError ? err.status : 400;
        res.status(status).json({ error: (err as Error).message });
    }
}

export async function searchNFTs(req: Request, res: Response) {
    try {
        const page = parsePage(req.query?.page);
        const sort = parseSort(req.query?.sort);
        const result = await nftService.searchNFTs({ page, sort });
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
}

export async function getUserNFTs(req: Request, res: Response) {
    try {
        const walletAddress = typeof req.query?.walletAddress === 'string' ? req.query.walletAddress : undefined;
        const walletId = typeof req.query?.walletId === 'string' ? req.query.walletId : undefined;
        if (!walletAddress && !walletId) throw new HttpError(400, 'walletAddress o walletId es requerido');

        const userId = await resolveUserId({ walletAddress, walletId });
        const nfts = await nftService.getNFTsByUser(userId);
        res.json({ items: nfts });
    } catch (err) {
        const status = err instanceof HttpError ? err.status : 400;
        res.status(status).json({ error: (err as Error).message });
    }
}
