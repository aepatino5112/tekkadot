import express, {} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { logger } from './config/logger.js';
import authRoutes from './routes/authRoutes.js';
// Express server instance
const app = express();
// Middlewares & configs
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
// Environment variables
const PORT = process.env.PORT || '3000';
// Server entry point
app.get('/', (_, res) => {
    res.status(200).json({ message: 'Hello, World!' });
});
// Server Health Checkpoint
app.get('/api/health', (_, res) => {
    res.status(200).json({ status: 'ok' });
    logger.info('Server is online');
});
// Routes
app.use('/api/auth', authRoutes);
// Server listens
app.listen(PORT, () => {
    logger.info(`Server listening in port ${PORT}`);
});
//# sourceMappingURL=index.js.map