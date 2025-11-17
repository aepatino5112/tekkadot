// src/controllers/nftController.ts
import type { Request, Response } from 'express';
import { resolveUserId } from '../services/walletService.js';
import * as nftService from '../services/nftService.js';
import { uploadImageToIPFS } from '../services/ipfsService.js';
import type { Category, Rareness, NFTCreate, NFTUpdate } from '../services/nftService.js';
import type { SortKey } from '../utils/pagination.js';

function narrowSort(v: unknown): SortKey | undefined {
    if (v === 'h-price' || v === 'l-price' || v === 'newest' || v === 'oldest') return v;
    return undefined;
}
function parsePage(v: unknown): number {
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1;
}
function narrowCategory(v: unknown): Category | undefined {
    if (v === 'art' || v === 'collectible' || v === 'music' || v === 'fresh' || v === 'cyberpunk') return v;
    return undefined;
}
function narrowRareness(v: unknown): Rareness | undefined {
    if (v === 'common' || v === 'rare' || v === 'epic' || v === 'legendary') return v;
    return undefined;
}
function getStatus(): number {
    return 400;
}
function getMessage(err: unknown): string {
    return err instanceof Error ? err.message : 'Error desconocido';
}

export async function createNFT(req: Request, res: Response) {
    try {
        const walletParams: { walletAddress?: string; walletId?: string } = {};
        if (typeof req.body?.walletAddress === 'string') walletParams.walletAddress = req.body.walletAddress;
        if (typeof req.body?.walletId === 'string') walletParams.walletId = req.body.walletId;
        if (!walletParams.walletAddress && !walletParams.walletId) throw new Error('walletAddress o walletId es requerido');

        let ipfsHash = typeof req.body?.ipfs_hash === 'string' ? req.body.ipfs_hash.trim() : '';
        if (!ipfsHash && req.file) {
            ipfsHash = await uploadImageToIPFS(req.file, String(req.body?.title ?? 'nft'));
        }
        if (!ipfsHash) throw new Error('Se requiere imagen o ipfs_hash');

        const category = narrowCategory(req.body?.category);
        const rareness = narrowRareness(req.body?.rareness);
        const price = Number(req.body?.price);

        const payload: NFTCreate = {
            title: String(req.body?.title ?? '').trim(),
            description: String(req.body?.description ?? '').trim(),
            category: category as Category,
            rareness: rareness as Rareness,
            price,
            ipfs_hash: ipfsHash,
            status: (req.body?.status === 'listed' || req.body?.status === 'sold') ? req.body.status : 'listed',
        };

        if (!payload.title || !payload.description || !payload.category || !payload.rareness || !(payload.price > 0)) {
            throw new Error('Campos de NFT inválidos');
        }

        const userId = await resolveUserId(walletParams);
        const nft = await nftService.createNFT(userId, payload);
        res.status(201).json(nft);
    } catch (err: unknown) {
        res.status(getStatus(err)).json({ error: getMessage(err) });
    }
}

export async function updateNFT(req: Request, res: Response) {
    try {
        const walletParams: { walletAddress?: string; walletId?: string } = {};
        if (typeof req.body?.walletAddress === 'string') walletParams.walletAddress = req.body.walletAddress;
        if (typeof req.body?.walletId === 'string') walletParams.walletId = req.body.walletId;
        if (!walletParams.walletAddress && !walletParams.walletId) throw new Error('walletAddress o walletId es requerido');

        const payload: NFTUpdate = {};
        if (typeof req.body?.title === 'string') payload.title = req.body.title.trim();
        if (typeof req.body?.description === 'string') payload.description = req.body.description.trim();
        const c = narrowCategory(req.body?.category);
        if (c) payload.category = c;
        const r = narrowRareness(req.body?.rareness);
        if (r) payload.rareness = r;
        if (req.body?.price !== undefined) {
            const p = Number(req.body.price);
            if (!(p > 0)) throw new Error('price inválido');
            payload.price = p;
        }
        if (typeof req.body?.ipfs_hash === 'string') payload.ipfs_hash = req.body.ipfs_hash.trim();
        if (req.file) payload.ipfs_hash = await uploadImageToIPFS(req.file, String(req.body?.title ?? 'nft'));
        if (req.body?.status === 'listed' || req.body?.status === 'sold') payload.status = req.body.status;

        const userId = await resolveUserId(walletParams);
        const nft = await nftService.updateNFT(req.params.id, userId, payload);
        res.json(nft);
    } catch (err: unknown) {
        res.status(getStatus(err)).json({ error: getMessage(err) });
    }
}

export async function deleteNFT(req: Request, res: Response) {
    try {
        const walletParams: { walletAddress?: string; walletId?: string } = {};
        if (typeof req.query?.walletAddress === 'string') walletParams.walletAddress = req.query.walletAddress;
        if (typeof req.query?.walletId === 'string') walletParams.walletId = req.query.walletId;
        if (!walletParams.walletAddress && !walletParams.walletId) throw new Error('walletAddress o walletId es requerido');

        const userId = await resolveUserId(walletParams);
        const result = await nftService.deleteNFT(req.params.id, userId);
        res.json(result);
    } catch (err: unknown) {
        res.status(getStatus(err)).json({ error: getMessage(err) });
    }
}

export async function searchNFTs(req: Request, res: Response) {
    try {
        const page = parsePage(req.query?.page);
        const sort = narrowSort(req.query?.sort);
        const result = await nftService.searchNFTs({ page, sort });
        res.json(result);
    } catch (err: unknown) {
        res.status(400).json({ error: getMessage(err) });
    }
}

export async function getUserNFTs(req: Request, res: Response) {
    try {
        const walletParams: { walletAddress?: string; walletId?: string } = {};
        if (typeof req.query?.walletAddress === 'string') walletParams.walletAddress = req.query.walletAddress;
        if (typeof req.query?.walletId === 'string') walletParams.walletId = req.query.walletId;
        if (!walletParams.walletAddress && !walletParams.walletId) throw new Error('walletAddress o walletId es requerido');

        const userId = await resolveUserId(walletParams);
        const nfts = await nftService.getNFTsByUser(userId);
        res.json({ items: nfts });
    } catch (err: unknown) {
        res.status(getStatus(err)).json({ error: getMessage(err) });
    }
}
