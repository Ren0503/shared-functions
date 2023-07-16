"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.verifyToken = exports.generateToken = void 0;
const crypto_1 = require("crypto");
const base64_1 = require("./base64");
const privateKey = Buffer.from(GlobalConfig.PRIVATE_KEY, 'base64').toString('ascii');
const publicKey = Buffer.from(GlobalConfig.PUBLIC_KEY, 'base64').toString('ascii');
function generateToken(input, expiresIn) {
    const payload = JSON.stringify(Object.assign(Object.assign({}, input), { iat: Date.now(), exp: Date.now() + expiresIn * 1000 }));
    const data = (0, base64_1.base64Encode)(payload);
    const signer = (0, crypto_1.createSign)('RSA-SHA256');
    signer.update(data);
    const signature = signer.sign(privateKey, 'base64');
    const token = data + '.' + signature;
    return token;
}
exports.generateToken = generateToken;
function verifyToken(token) {
    const [data, signature] = token.split('.');
    const payload = (0, base64_1.base64Decode)(data);
    const verifier = (0, crypto_1.createVerify)('RSA-SHA256');
    verifier.update(data);
    const isVerified = verifier.verify(publicKey, signature, 'base64');
    if (!isVerified) {
        throw new Error('Invalid signature');
    }
    return { payload, isVerified };
}
exports.verifyToken = verifyToken;
function decodeToken(token) {
    const [data, _] = token.split('.');
    const payload = (0, base64_1.base64Decode)(data);
    return payload;
}
exports.decodeToken = decodeToken;
