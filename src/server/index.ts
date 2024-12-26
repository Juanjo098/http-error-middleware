import express from 'express'
import type { Express } from 'express'

import { httpErrorMiddleware } from '@/middleware'
import { HttpError } from '@/HttpError'

export default function app(destructure: boolean): Express {
  const app = express()

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

  app.use(httpErrorMiddleware({ destructure }))

  return app
}

