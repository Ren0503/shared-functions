export declare const saltRing = 24;
export declare function encrypt(text: string): string;
export declare function decrypt(text: string): string;
export declare function generateSecretSalt(): number[];
export declare function randomSalt(): string;
export declare function hash(plain: string): string;
export declare function compare(hashed: string, plain: string): boolean;
