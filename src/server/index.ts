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
    HttpError.badRequest('Bad Request', { detailsMessage: 'This are important details' })
  })

  app.get('/unauthorized', () => {
    HttpError.unauthorized('Unauthorized', { detailsMessage: 'This are important details' })
  })

  app.get('/payment-required', () => {
    HttpError.paymentRequired('Payment required', { detailsMessage: 'This are important details' })
  })

  app.get('/forbidden', () => {
    HttpError.forbidden('Forbidden', { detailsMessage: 'This are important details' })
  })

  app.get('/not-found', () => {
    HttpError.notFound('Not found', { detailsMessage: 'This are important details' })
  })

  app.get('/method-not-allowed', () => {
    HttpError.methodNotAllowed('Method not allowed', { detailsMessage: 'This are important details' })
  })

  app.get('/not-acceptable', () => {
    HttpError.notAcceptable('Not acceptable', { detailsMessage: 'This are important details' })
  })

  app.get('/proxy-authentication-requerid', () => {
    HttpError.proxyAuthenticationRequired('Proxy authentication required', { detailsMessage: 'This are important details' })
  })

  app.get('/request-timeout', () => {
    HttpError.requestTimeOut('Request timeout', { detailsMessage: 'This are important details' })
  })

  app.get('/conflict', () => {
    HttpError.conflict('Conflict', { detailsMessage: 'This are important details' })
  })
  
  app.get('/internal-server-error', () => {
    HttpError.internalServerError('Internal server error', { detailsMessage: 'This are important details' })
  })
  
  app.get('/not-implemented', () => {
    HttpError.notImplemented('Not implemented', { detailsMessage: 'This are important details' })
  })
  
  app.get('/bad-gateway', () => {
    HttpError.badGateway('Bad gateway', { detailsMessage: 'This are important details' })
  })
  
  app.get('/service-unavailable', () => {
    HttpError.serviceUnavailable('Service unavailable', { detailsMessage: 'This are important details' })
  })
  
  app.get('/gateway-timeout', () => {
    HttpError.gatewayTimeout('Gateway Timeout', { detailsMessage: 'This are important details' })
  })

  app.get('/custom', (req, _res) => {
    const { statusCode } = req.query
    HttpError.custom('Custom error', Number(statusCode), { detailsMessage: 'This are important details' })
  })

  app.use(httpErrorMiddleware({ destructure, statusCodeOnResponse }))

  return app
}

