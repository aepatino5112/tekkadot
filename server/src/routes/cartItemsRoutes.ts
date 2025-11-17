import { Router } from 'express';
import * as items from '../controllers/cartItemsController.js';

const router: Router = Router();

router.get('/carts/:cart_id/items', items.listByCart);
router.get('/cart-items/:cart_item_id', items.get);
router.post('/cart-items', items.create);
router.patch('/cart-items/:cart_item_id', items.update);
router.delete('/cart-items/:cart_item_id', items.remove);

export default router;
