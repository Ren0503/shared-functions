"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
global.GlobalConfig = {
    NODE_ENV: process.env.NODE_ENV || '',
    PORT: Number(process.env.PORT),
    PRIVATE_KEY: process.env.PRIVATE_KEY || '',
    PUBLIC_KEY: process.env.PUBLIC_KEY || '',
    SECRET_IV_BUFFER: process.env.SECRET_IV_BUFFER || '',
    SECRET_KEY_BUFFER: process.env.SECRET_KEY_BUFFER || '',
    SECRET_SALT: process.env.SECRET_SALT || '',
};
