import CryptoJS from 'crypto-js';

export const encrypt = (value: string) => {
    return CryptoJS.AES.encrypt(JSON.stringify(value), 'secretKey').toString();
};
