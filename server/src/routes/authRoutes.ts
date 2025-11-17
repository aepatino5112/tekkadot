// src/routes/authRoutes.ts
import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router: Router = Router();

// Issue nonce for wallet signature
router.post('/nonce', AuthController.nonce);

// Smart connect: login or link depending on session
router.post('/connect', AuthController.connect);

// Get current session (requires auth)
router.get('/session', authMiddleware, AuthController.session);

// Logout (requires auth)
router.post('/logout', authMiddleware, AuthController.logout);

export default router;
