export enum SuccessfulCodes {
  ok = 200,
  created = 201,
  accepted = 202,
  NonAuthoritativeInformation = 203,
  noContent = 204,
}

export enum ClientErrorCodes {
  badRequest = 400,
  unauthorized = 401,
  paymentRequired = 402,
  forbidden = 403,
  notFound = 404,
  methodNotAllowed = 405,
  notAcceptable = 406,
  proxyAuthenticationRequired = 407,
  requestTimeOut = 408,
  conflict = 409,
}

export enum ServerErrorCodes {
  internalServerError = 500,
  notImplemented = 501,
  badGateway = 502,
  serviceUnavailable = 503,
  gatewayTimeOut = 504,
}
