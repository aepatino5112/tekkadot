// src/controllers/cartItemsController.ts
import type { Request, Response } from 'express';
import * as svc from '../services/cartItemsService.js';

export async function listByCart(req: Request, res: Response) {
    if (!req.params.cart_id) {
        res.status(400).json({ error: 'Missing crutial cart_id' });
        return;
    }
    
    try {
        const data = await svc.listCartItemsByCart(req.params.cart_id);
        res.json({ data });
    } catch (err: unknown) {
        res.status(500).json({ error: err instanceof Error ? err.message : 'unknown error' });
    }
}

export async function get(req: Request, res: Response) {
    if (!req.params.cart_item_id) {
        res.status(400).json({ error: 'Missing crutial cart_id' });
        return;
    }

    try {
        const data = await svc.getCartItemById(req.params.cart_item_id);
        res.json({ data });
    } catch (err: unknown) {
        res.status(500).json({ error: err instanceof Error ? err.message : 'unknown error' });
    }
}

export async function create(req: Request, res: Response) {
    try {
        const data = await svc.createCartItem(req.body);
        res.status(201).json({ data });
    } catch (err: unknown) {
        res.status(500).json({ error: err instanceof Error ? err.message : 'unknown error' });
    }
}

export async function update(req: Request, res: Response) {
    if (!req.params.cart_item_id) {
        res.status(400).json({ error: 'Missing crutial cart_id' });
        return;
    }

    try {
        const data = await svc.updateCartItem(req.params.cart_item_id, req.body);
        res.json({ data });
    } catch (err: unknown) {
        res.status(500).json({ error: err instanceof Error ? err.message : 'unknown error' });
    }
}

export async function remove(req: Request, res: Response) {
    if (!req.params.cart_item_id) {
        res.status(400).json({ error: 'Missing crutial cart_id' });
        return;
    }
    
    try {
        await svc.deleteCartItem(req.params.cart_item_id);
        res.status(204).send();
    } catch (err: unknown) {
        res.status(500).json({ error: err instanceof Error ? err.message : 'unknown error' });
    }
}
