import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: { fileSize: Number(process.env.IPFS_MAX_FILE_SIZE || 5242880) },
});
