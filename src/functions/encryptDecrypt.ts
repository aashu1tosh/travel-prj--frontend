import * as CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = CryptoJS.enc.Utf8.parse(
    import.meta.env.VITE_APP_TOKEN_ENCRYPTION_KEY
); // Must be 32 characters long
const IV_LENGTH = 16; // For AES, this is always 16

const encrypt = (plainText: string): string | null => {
    try {
        const iv = CryptoJS.lib.WordArray.random(IV_LENGTH);
        const encrypted = CryptoJS.AES.encrypt(plainText, ENCRYPTION_KEY, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });

        // Combine IV and encrypted text for storage/transmission
        return iv.toString(CryptoJS.enc.Hex) + ':' + encrypted.toString();
    } catch (err) {
        console.error('Encryption error:', err);
        return null;
    }
};

const decrypt = (encrypted: string): string | null => {
    try {
        if (!encrypted) {
            throw new Error('Invalid encrypted text');
        }

        const textParts = encrypted.split(':');
        if (textParts.length !== 2) {
            throw new Error('Invalid encrypted text format');
        }

        const iv = CryptoJS.enc.Hex.parse(textParts[0]);
        const encryptedText = textParts[1];

        const decrypted = CryptoJS.AES.decrypt(encryptedText, ENCRYPTION_KEY, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });

        return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (err) {
        console.error('Decryption error:', err);
        return null;
    }
};

export default { encrypt, decrypt };
