// src/routes/nftRoutes.ts
import { Router } from 'express';
import {
    createNFT,
    updateNFT,
    deleteNFT,
    searchNFTs,
    getUserNFTs,
} from '../controllers/nftController.js';

const router: Router = Router();

router.post('/', createNFT);
router.put('/:id', updateNFT);
router.delete('/:id', deleteNFT);
router.get('/', searchNFTs);
router.get('/user', getUserNFTs);

export default router;
