export interface IPayload {
    [k: string]: any;
}
export declare function generateToken(input: IPayload, expiresIn: number): string;
export declare function verifyToken(token: string): {
    payload: string;
    isVerified: true;
};
export declare function decodeToken(token: string): string;
