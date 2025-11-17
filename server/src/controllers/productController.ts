// src/controllers/productController.ts
import type { Request, Response } from 'express';
import { resolveUserId } from '../services/walletService.js';
import * as productService from '../services/productService.js';
import { uploadImageToIPFS } from '../services/ipfsService.js';
import type { Collection, ProductCreate, ProductUpdate } from '../types/enums.js';

// helpers de narrow
function narrowCollection(v: unknown): Collection | undefined {
    if (v === 'gaming' || v === 'laptop' || v === 'mobile' || v === 'wearable') return v;
    return undefined;
}
function getStatus(): number {
    return 400;
}
function getMessage(err: unknown): string {
    return err instanceof Error ? err.message : 'Error desconocido';
}

export async function createProduct(req: Request, res: Response) {
    try {
        const walletParams: { walletAddress?: string; walletId?: string } = {};
        if (typeof req.body?.walletAddress === 'string') walletParams.walletAddress = req.body.walletAddress;
        if (typeof req.body?.walletId === 'string') walletParams.walletId = req.body.walletId;
        if (!walletParams.walletAddress && !walletParams.walletId) throw new Error('walletAddress o walletId es requerido');

        let ipfsHash = typeof req.body?.ipfs_hash === 'string' ? req.body.ipfs_hash.trim() : '';
        if (!ipfsHash && req.file) {
            ipfsHash = await uploadImageToIPFS(req.file, String(req.body?.title ?? 'product'));
        }
        if (!ipfsHash) throw new Error('Se requiere imagen o ipfs_hash');

        const collection = narrowCollection(req.body?.collection);
        const price = Number(req.body?.price);

        const payload: ProductCreate = {
            title: String(req.body?.title ?? '').trim(),
            description: String(req.body?.description ?? '').trim(),
            collection: collection as Collection,
            price,
            ipfs_hash: ipfsHash,
            status: (req.body?.status === 'listed' || req.body?.status === 'sold') ? req.body.status : 'listed',
        };

        if (!payload.title || !payload.description || !payload.collection || !(payload.price > 0)) {
            throw new Error('Campos de producto inválidos');
        }

        const userId = await resolveUserId(walletParams);
        const product = await productService.createProduct(userId, payload);
        res.status(201).json(product);
    } catch (err: unknown) {
        res.status(getStatus()).json({ error: getMessage(err) });
    }
}

export async function updateProduct(req: Request, res: Response) {
    try {
        const productId = req.params.id;
        if (!productId) throw new Error('ID de producto requerido');
        const walletParams: { walletAddress?: string; walletId?: string } = {};
        if (typeof req.body?.walletAddress === 'string') walletParams.walletAddress = req.body.walletAddress;
        if (typeof req.body?.walletId === 'string') walletParams.walletId = req.body.walletId;
        if (!walletParams.walletAddress && !walletParams.walletId) throw new Error('walletAddress o walletId es requerido');

        const payload: ProductUpdate = {};
        if (typeof req.body?.title === 'string') payload.title = req.body.title.trim();
        if (typeof req.body?.description === 'string') payload.description = req.body.description.trim();
        const c = narrowCollection(req.body?.collection);
        if (c) payload.collection = c;
        if (req.body?.price !== undefined) {
            const p = Number(req.body.price);
            if (!(p > 0)) throw new Error('price inválido');
            payload.price = p;
        }
        if (typeof req.body?.ipfs_hash === 'string') payload.ipfs_hash = req.body.ipfs_hash.trim();
        if (req.file) payload.ipfs_hash = await uploadImageToIPFS(req.file, String(req.body?.title ?? 'product'));
        if (req.body?.status === 'listed' || req.body?.status === 'sold') payload.status = req.body.status;

        const userId = await resolveUserId(walletParams);
        const product = await productService.updateProduct(productId, userId, payload);
        res.json(product);
    } catch (err: unknown) {
        res.status(getStatus()).json({ error: getMessage(err) });
    }
}

export async function deleteProduct(req: Request, res: Response) {
    try {
        const walletParams: { walletAddress?: string; walletId?: string } = {};
        if (typeof req.query?.walletAddress === 'string') walletParams.walletAddress = req.query.walletAddress;
        if (typeof req.query?.walletId === 'string') walletParams.walletId = req.query.walletId;
        if (!walletParams.walletAddress && !walletParams.walletId) throw new Error('walletAddress o walletId es requerido');

        const userId = await resolveUserId(walletParams);
        const productId = req.params.id;
        if (!productId) throw new Error('ID de producto requerido');
        const result = await productService.deleteProduct(productId, userId);
        res.json(result);
    } catch (err: unknown) {
        res.status(getStatus()).json({ error: getMessage(err) });
    }
}

export async function getProduct(req: Request, res: Response) {
    try {
        const productId = req.params.id;
        if (!productId) throw new Error('ID de producto requerido');
        const product = await productService.getProductById(productId);
        res.json(product);
    } catch (err: unknown) {
        res.status(getStatus()).json({ error: getMessage(err) });
    }
}

export async function getUserProducts(req: Request, res: Response) {
    try {
        const walletParams: { walletAddress?: string; walletId?: string } = {};
        if (typeof req.query?.walletAddress === 'string') walletParams.walletAddress = req.query.walletAddress;
        if (typeof req.query?.walletId === 'string') walletParams.walletId = req.query.walletId;
        if (!walletParams.walletAddress && !walletParams.walletId) throw new Error('walletAddress o walletId es requerido');

        const userId = await resolveUserId(walletParams);
        const products = await productService.getProductsByUser(userId);
        res.json({ items: products });
    } catch (err: unknown) {
        res.status(getStatus()).json({ error: getMessage(err) });
    }
}
