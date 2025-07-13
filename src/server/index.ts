import express from 'express'
import type { Express } from 'express'

import { httpErrorMiddleware } from '@/middleware'
import { HttpError } from '@/HttpError'

interface AppProps {
  destructure: boolean
  statusCodeOnResponse: boolean
}

export default function app(options: Partial<AppProps> = {}): Express {
  const app = express()

  const { destructure, statusCodeOnResponse } = options

  app.get('/bad-request', () => {
    throw HttpError.badRequest('Bad Request', { detailsMessage: 'This are important details' })
  })

  app.get('/unauthorized', () => {
    throw HttpError.unauthorized('Unauthorized', { detailsMessage: 'This are important details' })
  })

  app.get('/payment-required', () => {
    throw HttpError.paymentRequired('Payment required', { detailsMessage: 'This are important details' })
  })

  app.get('/forbidden', () => {
    throw HttpError.forbidden('Forbidden', { detailsMessage: 'This are important details' })
  })

  app.get('/not-found', () => {
    throw HttpError.notFound('Not found', { detailsMessage: 'This are important details' })
  })

  app.get('/method-not-allowed', () => {
    throw HttpError.methodNotAllowed('Method not allowed', { detailsMessage: 'This are important details' })
  })

  app.get('/not-acceptable', () => {
    throw HttpError.notAcceptable('Not acceptable', { detailsMessage: 'This are important details' })
  })

  app.get('/proxy-authentication-requerid', () => {
    throw HttpError.proxyAuthenticationRequired('Proxy authentication required', { detailsMessage: 'This are important details' })
  })

  app.get('/request-timeout', () => {
    throw HttpError.requestTimeOut('Request timeout', { detailsMessage: 'This are important details' })
  })

  app.get('/conflict', () => {
    throw HttpError.conflict('Conflict', { detailsMessage: 'This are important details' })
  })
  
  app.get('/internal-server-error', () => {
    throw HttpError.internalServerError('Internal server error', { detailsMessage: 'This are important details' })
  })
  
  app.get('/not-implemented', () => {
    throw HttpError.notImplemented('Not implemented', { detailsMessage: 'This are important details' })
  })
  
  app.get('/bad-gateway', () => {
    throw HttpError.badGateway('Bad gateway', { detailsMessage: 'This are important details' })
  })
  
  app.get('/service-unavailable', () => {
    throw HttpError.serviceUnavailable('Service unavailable', { detailsMessage: 'This are important details' })
  })
  
  app.get('/gateway-timeout', () => {
    throw HttpError.gatewayTimeout('Gateway Timeout', { detailsMessage: 'This are important details' })
  })

  app.get('/custom', (req, _res) => {
    const { statusCode } = req.query
    throw HttpError.custom('Custom error', Number(statusCode), { detailsMessage: 'This are important details' })
  })

  app.use(httpErrorMiddleware({ destructure, statusCodeOnResponse }))

  return app
}

