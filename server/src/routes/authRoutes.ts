// src/routes/authRoutes.ts
import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';

const router: Router = Router();

// Smart connect: login or link depending on session
router.post('/connect', AuthController.connect);

router.get('/me', AuthController.getCurrentUser); // New endpoint for session check

export default router;
