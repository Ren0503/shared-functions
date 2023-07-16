"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.hash = exports.randomSalt = exports.generateSecretSalt = exports.decrypt = exports.encrypt = exports.saltRing = void 0;
const crypto_1 = require("crypto");
const envSecret = {
    key: GlobalConfig.SECRET_KEY_BUFFER,
    iv: GlobalConfig.SECRET_IV_BUFFER,
    salt: GlobalConfig.SECRET_SALT,
};
exports.saltRing = 24;
function encrypt(text) {
    const key = Buffer.from(envSecret.key, 'hex');
    const iv = Buffer.from(envSecret.iv, 'hex');
    const cipher = (0, crypto_1.createCipheriv)('aes-256-ctr', key, iv);
    const encryptedText = Buffer.concat([
        cipher.update(text),
        cipher.final(),
    ]);
    return encryptedText.toString('hex');
}
exports.encrypt = encrypt;
function decrypt(text) {
    const key = Buffer.from(envSecret.key, 'hex');
    const iv = Buffer.from(envSecret.iv, 'hex');
    const buffer = Buffer.from(text, 'hex');
    const decipher = (0, crypto_1.createDecipheriv)('aes-256-ctr', key, iv);
    const decryptedText = Buffer.concat([
        decipher.update(buffer),
        decipher.final(),
    ]);
    return decryptedText.toString();
}
exports.decrypt = decrypt;
function generateSecretSalt() {
    const arr = [16807];
    for (let i = 1; i < exports.saltRing; i++) {
        arr[i] = (100 * arr[i - 1] || 1) % 2147;
        if (arr[i] < 0) {
            arr[i] += 2147;
        }
    }
    return arr;
}
exports.generateSecretSalt = generateSecretSalt;
function randomSalt() {
    const arr = generateSecretSalt();
    let max = 0;
    let value = arr[1];
    for (let i = 2; i < arr.length; i++) {
        const element = Math.floor(new Date().getTime() % arr[i]);
        if (element > max) {
            max = element;
            value = arr[i];
        }
    }
    return value.toString();
}
exports.randomSalt = randomSalt;
function hash(plain) {
    const salt = randomSalt();
    const hash = (0, crypto_1.createHmac)('sha256', salt);
    hash.update(plain);
    const hashedData = hash.digest('hex');
    return hashedData;
}
exports.hash = hash;
function compare(hashed, plain) {
    const arr = generateSecretSalt();
    for (const salt of arr) {
        const hash = (0, crypto_1.createHmac)('sha256', salt.toString());
        hash.update(plain);
        const hashedData = hash.digest('hex');
        if (hashedData === hashed) {
            return true;
        }
    }
    return false;
}
exports.compare = compare;
