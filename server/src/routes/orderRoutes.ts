// src/routes/ordersRoutes.ts
import { Router } from 'express';
import * as orders from '../controllers/orderController.js';

const router: Router = Router();

router.get('/orders', orders.list);
router.get('/buyers/:buyer_id/orders', orders.listByBuyer);
router.get('/orders/:order_id', orders.get);
router.post('/orders', orders.create);
router.patch('/orders/:order_id', orders.update);
router.delete('/orders/:order_id', orders.remove);
router.get('/users/:user_id/orders', orders.userOrders);

export default router;
