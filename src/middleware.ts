import { NextFunction, Request, Response } from 'express'

import { HttpError } from '@/HttpError'

interface HttpErrorMiddlewareProps {
  destructure: boolean
}

export function httpErrorMiddleware(options: Partial<HttpErrorMiddlewareProps> = {}) {
  return function (err: any, _req: Request, res: Response, next: NextFunction) {
    if (err instanceof HttpError) {
      const { message, statusCode, details } = err
      if (options.destructure) res.status(statusCode).json({ message, statusCode, ...details })
      else res.status(statusCode).json({ message, statusCode, details })
    } else {
      next(err)
    }
  }
}
