import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { logger } from './config/logger.js';
import authRoutes from './routes/authRoutes.js';
import nftRoutes from './routes/nftRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import cartItemRoutes from './routes/cartItemsRoutes.js';
import ordersRoutes from './routes/orderRoutes.js';

// Express server instance
const app = express();

// Middlewares & configs
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);

// Environment variables
const PORT = process.env.PORT || '3000';

// Server entry point
app.get('/', (_: Request, res: Response) => {
    res.status(200).json({ message: 'Hello, World!' });
});

// Server Health Checkpoint
app.get('/api/health', (_: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
    logger.info('Server is online');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/nfts', nftRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/cartItems', cartItemRoutes);
app.use('/api/orders', ordersRoutes);

// Server listens
app.listen(PORT, () => {
    logger.info(`Server listening in port ${PORT}`);
});
