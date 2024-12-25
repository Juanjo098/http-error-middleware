import { NextFunction, Request, Response } from 'express'

import { HttpError } from '@/HttpError'

export function httpErrorMiddleware(err: any, _req: Request, res: Response, next: NextFunction) {
  if (err instanceof HttpError) {
    const { message, statusCode, details } = err
    res.status(statusCode).json({ message, statusCode, details })
  } else {
    next(err)
  }
}
