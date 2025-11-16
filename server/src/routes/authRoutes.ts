import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router: Router = Router();

router.post('/nonce', AuthController.nonce);
router.post('/verify', AuthController.verify);
router.post('/logout', authMiddleware, AuthController.logout);
router.get('/session', authMiddleware, AuthController.session);

export default router;
