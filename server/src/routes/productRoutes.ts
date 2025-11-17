// src/routes/productRoutes.ts
import { Router } from 'express';
import { upload } from '../utils/upload.js';
import {
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getUserProducts,
} from '../controllers/productController.js';

const router:Router = Router();

router.post('/', upload.single('image'), createProduct);
router.put('/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);
router.get('/', searchProducts);
router.get('/user', getUserProducts);

export default router;
