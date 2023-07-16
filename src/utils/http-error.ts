import { HttpStatus } from "../constants"

export interface IErrorOptions {
  module: string
  status: HttpStatus,
  message?: string,
}

export class HttpError {
  error: any

  constructor (error: any) {
    this.error = error
  }

  throw(options: IErrorOptions) {
    const { module, status, message } = options
    let messageError = ''
    if (!message) {
      switch (status) {
        case HttpStatus.BAD_REQUEST: {
          messageError = `Your input of ${module} is invalid`
          break
        }
        case HttpStatus.UNAUTHORIZED: {
          messageError = `Not authorized, token failed`
        }
        case HttpStatus.FORBIDDEN: {
          messageError =  `You don't have permission to do with this ${module}`
          break
        }
        case HttpStatus.NOT_FOUND: {
          messageError =  `${module} not found`
          break
        }
        case HttpStatus.METHOD_NOT_ALLOWED: {
          messageError = `${module} still binding, cant do it`
          break
        }
        case HttpStatus.CONFLICT: {
          messageError = `${module} already exists`
          break
        }
        case HttpStatus.GONE: {
          messageError = `${module} unavailable`
          break
        }
        default: {
          messageError =  `Internal server error`
        }
      }
    } else {
      messageError = message
    }
    throw new this.error(messageError, status)
  }
}
