import { Router } from 'express';
import * as carts from '../controllers/cartController.js';

const router: Router = Router();

router.get('/carts', carts.list);
router.get('/carts/:cart_id', carts.get);
router.post('/carts', carts.create);
router.patch('/carts/:cart_id', carts.update);
router.get('/users/:user_id/cart', carts.getUserCart);
router.delete('/carts/:cart_id', carts.remove);
router.get('/users/:user_id/cart', carts.getUserCart);

export default router;
