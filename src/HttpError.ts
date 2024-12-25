import { ClientErrorCodes, ServerErrorCodes } from './enums'

export class HttpError extends Error {
  private constructor(message: string, public statusCode: number, public details?: object) {
    super(message)
  }

  // Client errors
  static badRequest(message: string, details?: object) {
    return new HttpError(message, ClientErrorCodes.badRequest, details)
  }

  static unauthorized(message: string, details?: object) {
    return new HttpError(message, ClientErrorCodes.unauthorized, details)
  }

  static paymentRequired(message: string, details?: object) {
    return new HttpError(message, ClientErrorCodes.paymentRequired, details)
  }

  static forbidden(message: string, details?: object) {
    return new HttpError(message, ClientErrorCodes.forbidden, details)
  }

  static notFound(message: string, details?: object) {
    return new HttpError(message, ClientErrorCodes.notFound, details)
  }

  static methodNotAllowed(message: string, details?: object) {
    return new HttpError(message, ClientErrorCodes.methodNotAllowed, details)
  }

  static notAcceptable(message: string, details?: object) {
    return new HttpError(message, ClientErrorCodes.notAcceptable, details)
  }

  static proxyAuthenticationRequired(message: string, details?: object) {
    return new HttpError(message, ClientErrorCodes.proxyAuthenticationRequired, details)
  }

  static requestTimeOut(message: string, details?: object) {
    return new HttpError(message, ClientErrorCodes.requestTimeOut, details)
  }

  static conflict(message: string, details?: object) {
    return new HttpError(message, ClientErrorCodes.conflict, details)
  }
  
  // Server errors
  static internalServerError(message: string, details?: object) {
    return new HttpError(message, ServerErrorCodes.internalServerError, details)
  }

  static notImplemented(message: string, details?: object) {
    return new HttpError(message, ServerErrorCodes.notImplemented, details)
  }

  static badGateway(message: string, details?: object) {
    return new HttpError(message, ServerErrorCodes.badGateway, details)
  }

  static serviceUnavailable(message: string, details?: object) {
    return new HttpError(message, ServerErrorCodes.serviceUnavailable, details)
  }

  static gatewayTimeOut(message: string, details?: object) {
    return new HttpError(message, ServerErrorCodes.gatewayTimeOut, details)
  }

  /**
   * Throw an error with status code not implemented yet in the package
   */
  static custom(message: string, statusCode: number, details?: object) {
    return new HttpError(message, statusCode, details)
  }
}
