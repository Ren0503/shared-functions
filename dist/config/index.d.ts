declare global {
    var GlobalConfig: {
        NODE_ENV: string;
        PORT: number;
        PRIVATE_KEY: string;
        PUBLIC_KEY: string;
        SECRET_IV_BUFFER: string;
        SECRET_KEY_BUFFER: string;
        SECRET_SALT: string;
    };
}
export {};
