import { NextFunction, Request, Response } from 'express'

import { HttpError } from '@/HttpError'

interface HttpErrorMiddlewareProps {
  destructure: boolean,
  statusCodeOnResponse: boolean
}

export function httpErrorMiddleware(options: Partial<HttpErrorMiddlewareProps> = {}) {
  return function (err: any, _req: Request, res: Response, next: NextFunction) {
    if (err instanceof HttpError) {
      const { destructure, statusCodeOnResponse } = options
      const { message, statusCode, details } = err

      let allData: any = { message, statusCode, details }

      if (statusCodeOnResponse !== undefined && !statusCodeOnResponse) {
        const { statusCode:_, ...restData } = allData
        allData = restData
      } 

      if (destructure) {
        const { details: destructureDetails, ...restData } = allData
        allData = { ...restData, ...destructureDetails }
      } 

      res.status(statusCode).json({ ...allData })
    } else {
      next(err)
    }
  }
}
