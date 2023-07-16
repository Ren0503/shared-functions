import { createSign, createVerify } from "crypto";
import { base64Decode, base64Encode } from "./base64";

const privateKey = Buffer.from(GlobalConfig.PRIVATE_KEY, 'base64').toString('ascii')
const publicKey = Buffer.from(GlobalConfig.PUBLIC_KEY, 'base64').toString('ascii')

export interface IPayload {
  [k: string]: any
}

export function generateToken(input: IPayload, expiresIn: number) {
  const payload = JSON.stringify({
    ...input,
    iat: Date.now(),
    exp: Date.now() + expiresIn * 1000,
  })

  const data = base64Encode(payload)
  
  const signer = createSign('RSA-SHA256')
  signer.update(data)
  const signature = signer.sign(privateKey, 'base64')

  const token = data + '.' + signature
  return token
}

export function verifyToken(token: string) {
  const [data, signature] = token.split('.')
  const payload = base64Decode(data)

  const verifier = createVerify('RSA-SHA256')
  verifier.update(data)
  const isVerified = verifier.verify(publicKey, signature, 'base64')

  if (!isVerified) {
    throw new Error('Invalid signature')
  }

  return { payload, isVerified }
}

export function decodeToken(token: string) {
  const [data, _] = token.split('.')
  const payload = base64Decode(data)

  return payload
}