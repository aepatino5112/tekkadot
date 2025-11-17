// src/controllers/ordersController.ts
import type { Request, Response } from 'express';
import * as svc from '../services/orderService.js';

export async function list(_: Request, res: Response) {
    try {
        const data = await svc.listOrders();
        res.json({ data });
    } catch (err: unknown) {
        res.status(500).json({ error: err instanceof Error ? err.message : 'unknown error' });
    }
}

export async function userOrders(req: Request, res: Response) {
    if (!req.params.user_id) {
        res.status(400).json({ error: 'Missing crucial user_id' });
        return;
    }
    
    try {
        const data = await svc.getUserOrders(req.params.user_id);
        res.json({ data });
    } catch (err: unknown) {
        res.status(500).json({ error: err instanceof Error ? err.message : 'unknown error' });
    }
}

export async function listByBuyer(req: Request, res: Response) {
    if (!req.params.buyer_id) {
        res.status(400).json({ error: 'Missing crucial buyer_id' });
        return;
    }
    
    try {
        const data = await svc.listOrdersByBuyer(req.params.buyer_id);
        res.json({ data });
    } catch (err: unknown) {
        res.status(500).json({ error: err instanceof Error ? err.message : 'unknown error' });
    }
}

export async function get(req: Request, res: Response) {
    if (!req.params.order_id) {
        res.status(400).json({ error: 'Missing crucial order_id' });
        return;
    }
    
    try {
        const data = await svc.getOrderById(req.params.order_id);
        res.json({ data });
    } catch (err: unknown) {
        res.status(500).json({ error: err instanceof Error ? err.message : 'unknown error' });
    }
}

export async function create(req: Request, res: Response) {
    try {
        const data = await svc.createOrder(req.body);
        res.status(201).json({ data });
    } catch (err: unknown) {
        res.status(500).json({ error: err instanceof Error ? err.message : 'unknown error' });
    }
}

export async function update(req: Request, res: Response) {
    if (!req.params.order_id) {
        res.status(400).json({ error: 'Missing crucial order_id' });
        return;
    }
    
    try {
        const data = await svc.updateOrder(req.params.order_id, req.body);
        res.json({ data });
    } catch (err: unknown) {
        res.status(500).json({ error: err instanceof Error ? err.message : 'unknown error' });
    }
}

export async function remove(req: Request, res: Response) {
    if (!req.params.order_id) {
        res.status(400).json({ error: 'Missing crucia' });
        return;
    }
    
    try {
        await svc.deleteOrder(req.params.order_id);
        res.status(204).send();
    } catch (err: unknown) {
        res.status(500).json({ error: err instanceof Error ? err.message : 'unknown error' });
    }
}
