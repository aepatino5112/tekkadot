// src/routes/authRoutes.ts
import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';

const router: Router = Router();

// Issue a challenge nonce for signing
router.post('/nonce', AuthController.nonce);

// Smart connect: login or link depending on session
router.post('/connect', AuthController.connect);

// Logout and clear session cookie
router.post('/logout', AuthController.logout);

router.get('/me', AuthController.getCurrentUser); // New endpoint for session check

export default router;
