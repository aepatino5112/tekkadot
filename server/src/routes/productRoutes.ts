// src/routes/productRoutes.ts
import { Router } from 'express';
import {
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getUserProducts,
} from '../controllers/productController.js';

const router: Router = Router();

router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/', searchProducts);
router.get('/user', getUserProducts);

export default router;
