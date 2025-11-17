// src/routes/nftRoutes.ts
import { Router } from 'express';
import { upload } from '../utils/upload.js';
import {
    createNFT,
    updateNFT,
    deleteNFT,
    searchNFTs,
    getUserNFTs,
    getNFT,
} from '../controllers/nftController.js';

const router: Router = Router();

router.post('/', upload.single('image'), createNFT);
router.put('/:id', upload.single('image'), updateNFT);
router.delete('/:id', deleteNFT);
router.get('/', searchNFTs);
router.get('/user', getUserNFTs);
router.get('/:id', getNFT);

export default router;

