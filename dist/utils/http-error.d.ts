import { HttpStatus } from "../constants";
export interface IErrorOptions {
    module: string;
    status: HttpStatus;
    message?: string;
}
export declare class HttpError {
    error: any;
    constructor(error: any);
    throw(options: IErrorOptions): void;
}
