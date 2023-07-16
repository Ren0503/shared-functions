import { createCipheriv, createDecipheriv, createHmac } from "crypto"

const envSecret = {
  key: GlobalConfig.SECRET_KEY_BUFFER,
  iv: GlobalConfig.SECRET_IV_BUFFER,
  salt: GlobalConfig.SECRET_SALT,
}

export const saltRing = 24

export function encrypt(text: string) {
  const key = Buffer.from(envSecret.key, 'hex')
  const iv = Buffer.from(envSecret.iv, 'hex')

  const cipher = createCipheriv('aes-256-ctr', key, iv)

  const encryptedText = Buffer.concat([
    cipher.update(text),
    cipher.final(),
  ])

  return encryptedText.toString('hex')
}

export function decrypt(text: string) {
  const key = Buffer.from(envSecret.key, 'hex')
  const iv = Buffer.from(envSecret.iv, 'hex')

  const buffer = Buffer.from(text, 'hex')
  const decipher = createDecipheriv('aes-256-ctr', key, iv)

  const decryptedText = Buffer.concat([
    decipher.update(buffer),
    decipher.final(),
  ])

  return decryptedText.toString()
}

export function generateSecretSalt() {
  const arr: number[] = [16807]
  for (let i = 1; i < saltRing; i++) {
    arr[i] = (100 * arr[i-1] || 1) % 2147
    if (arr[i] < 0) {
      arr[i] += 2147
    }
  }

  return arr
}

export function randomSalt() {
  const arr = generateSecretSalt()
  let max = 0
  let value = arr[1]
  for (let i = 2; i < arr.length; i++) {
    const element = Math.floor(new Date().getTime() % arr[i])
    if (element > max) {
      max = element
      value = arr[i]
    }
  }

  return value.toString()
}

export function hash(plain: string) {
  const salt = randomSalt()
  const hash = createHmac('sha256', salt)
  hash.update(plain)
  const hashedData = hash.digest('hex')
  return hashedData
}

export function compare(hashed: string, plain: string) {
  const arr = generateSecretSalt()
  for (const salt of arr) {
    const hash = createHmac('sha256', salt.toString())
    hash.update(plain)
    const hashedData = hash.digest('hex')
    if (hashedData === hashed) {
      return true
    }
  }
  return false
}