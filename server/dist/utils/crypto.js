import crypto from 'crypto';
import { signatureVerify } from '@polkadot/util-crypto';
import { hexToU8a } from '@polkadot/util';
// helper to avoid relying on isHex export
function isHexString(s) {
    if (typeof s !== 'string')
        return false;
    return /^0x[0-9a-f]+$/i.test(s) || /^[0-9a-f]+$/i.test(s);
}
export function makeNonce(bytes = 32) {
    return crypto.randomBytes(bytes).toString('hex'); // hex string for signRaw
}
export function verifySignature(nonceHex, signature, addressOrPublicKey) {
    // Ensure 0x prefix for hex inputs
    const messageHex = isHexString(nonceHex) ? (nonceHex.startsWith('0x') ? nonceHex : `0x${nonceHex}`) : nonceHex;
    const sigHex = signature.startsWith('0x') ? signature : `0x${signature}`;
    // Convert to byte arrays so signatureVerify checks the exact bytes
    const messageU8a = isHexString(messageHex) ? hexToU8a(messageHex) : new TextEncoder().encode(messageHex);
    const signatureU8a = hexToU8a(sigHex);
    try {
        const { isValid } = signatureVerify(messageU8a, signatureU8a, addressOrPublicKey);
        return !!isValid;
    }
    catch (err) {
        console.error('signatureVerify error', err);
        return false;
    }
}
//# sourceMappingURL=crypto.js.map