import { config } from "dotenv";

config()

declare global {
  var GlobalConfig: {
    NODE_ENV: string
    PORT: number

    PRIVATE_KEY: string
    PUBLIC_KEY: string

    SECRET_IV_BUFFER: string
    SECRET_KEY_BUFFER: string
    SECRET_SALT: string
  }
}

global.GlobalConfig = {
  NODE_ENV: process.env.NODE_ENV || '',
  PORT: Number(process.env.PORT),

  PRIVATE_KEY: process.env.PRIVATE_KEY || '',
  PUBLIC_KEY: process.env.PUBLIC_KEY || '',

  SECRET_IV_BUFFER: process.env.SECRET_IV_BUFFER || '',
  SECRET_KEY_BUFFER: process.env.SECRET_KEY_BUFFER || '',
  SECRET_SALT: process.env.SECRET_SALT || '',
}