import { Readable } from 'stream';
import axios from 'axios';
import FormData from 'form-data';

const PINATA_JWT = process.env.PINATA_JWT;
const PINATA_ENDPOINT = process.env.PINATA_ENDPOINT;
const PINATA_GATEWAY = process.env.PINATA_GATEWAY;
const IPFS_MAX_FILE_SIZE = Number(process.env.IPFS_MAX_FILE_SIZE);

const allowedMimes = new Set<string>(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

export async function uploadImageToIPFS(file: Express.Multer.File, name?: string): Promise<string> {
    if (!PINATA_JWT) throw new Error('IPFS JWT no configurado');
    if (!allowedMimes.has(file.mimetype)) throw new Error('Formato de imagen no soportado');
    if (file.size > IPFS_MAX_FILE_SIZE) throw new Error('Archivo excede el tamaño máximo permitido');

    const form = new FormData();

    const stream: Readable = Readable.from(file.buffer);
    form.append('file', stream, { filename: file.originalname, contentType: file.mimetype });
    form.append('pinataMetadata', JSON.stringify({ name: name ?? file.originalname }));

    const headers = {
        Authorization: `Bearer ${PINATA_JWT}`,
        ...form.getHeaders(),
    };

    const res = await axios.post(PINATA_ENDPOINT, form, { headers, maxBodyLength: Infinity });
    const data: unknown = res.data;
    const hash = typeof data === 'object' && data !== null ? (data as { IpfsHash?: string }).IpfsHash : undefined;

    if (typeof hash !== 'string' || hash.length === 0) {
        throw new Error('Respuesta IPFS inválida (sin IpfsHash)');
    }

    return hash;
}

export function ipfsGatewayUrl(hash: string): string {
    if (!PINATA_GATEWAY) {
        return 'Error';
    }
    const gateway = PINATA_GATEWAY.replace(/\/+$/, '');
    return `${gateway}/${hash}`;
}
