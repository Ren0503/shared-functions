"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
const constants_1 = require("../constants");
class HttpError {
    constructor(error) {
        this.error = error;
    }
    throw(options) {
        const { module, status, message } = options;
        let messageError = '';
        if (!message) {
            switch (status) {
                case constants_1.HttpStatus.BAD_REQUEST: {
                    messageError = `Your input of ${module} is invalid`;
                    break;
                }
                case constants_1.HttpStatus.UNAUTHORIZED: {
                    messageError = `Not authorized, token failed`;
                }
                case constants_1.HttpStatus.FORBIDDEN: {
                    messageError = `You don't have permission to do with this ${module}`;
                    break;
                }
                case constants_1.HttpStatus.NOT_FOUND: {
                    messageError = `${module} not found`;
                    break;
                }
                case constants_1.HttpStatus.METHOD_NOT_ALLOWED: {
                    messageError = `${module} still binding, cant do it`;
                    break;
                }
                case constants_1.HttpStatus.CONFLICT: {
                    messageError = `${module} already exists`;
                    break;
                }
                case constants_1.HttpStatus.GONE: {
                    messageError = `${module} unavailable`;
                    break;
                }
                default: {
                    messageError = `Internal server error`;
                }
            }
        }
        else {
            messageError = message;
        }
        throw new this.error(messageError, status);
    }
}
exports.HttpError = HttpError;
