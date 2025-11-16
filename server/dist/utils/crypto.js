import crypto from 'crypto';
import { signatureVerify } from '@polkadot/util-crypto';
export function makeNonce(bytes = 32) {
    return crypto.randomBytes(bytes).toString('hex'); // hex string for signRaw
}
export function verifySignature(messageHex, signature, address) {
    const result = signatureVerify(messageHex, signature, address);
    return result.isValid;
}
//# sourceMappingURL=crypto.js.map