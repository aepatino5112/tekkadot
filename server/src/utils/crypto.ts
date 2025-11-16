import crypto from 'crypto';
import { signatureVerify } from '@polkadot/util-crypto';

export function makeNonce(bytes = 32) {
    return crypto.randomBytes(bytes).toString('hex'); // hex string for signRaw
}

export function verifySignature(messageHex: string, signature: string, address: string) {
    const result = signatureVerify(messageHex, signature, address);
    return result.isValid;
}
