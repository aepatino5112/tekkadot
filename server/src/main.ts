import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


// Express server instance
const app = express();

// Middlewares & configs
dotenv.config();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Environment variables
const PORT = process.env.PORT || '3000';

// Server entry point
app.get('/', (_: Request, res: Response) => {
    res.status(200).json({ message: 'Hello, World!' });
});

// Server Health Checkpoint
app.get('/api/health', (_: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
    console.log({ status: 'ok' });
});

// Server listens
app.listen(PORT, () => {
    console.log(`Server listening in port ${PORT}`);
});