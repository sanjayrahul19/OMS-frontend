import CryptoJS from 'crypto-js';

export const decrypt = (encryptedValue: string) => {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, 'secretKey');
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};