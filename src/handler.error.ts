import { Request, Response, NextFunction } from 'express'
import AppError from './App/Errors/AppError'
import { SecResponse } from '@jlenon7/dedsec/build/Responses'
import IHandler from './App/Interfaces/IHandler'

const env = process.env.NODE_ENV

class Handler implements IHandler {
  public createHandler(
    err: Error | AppError,
    request: Request,
    response: Response,
    _: NextFunction,
  ): Response<Error | AppError> {
    const dedSec = new SecResponse()

    if (err instanceof AppError) {
      const res = dedSec.withError({}, err.message, '', err.statusCode)

      return response.status(err.statusCode).json(res)
    } else if (
      env === 'testing' ||
      env === 'development' ||
      env === 'unitTesting'
    ) {
      const res = dedSec.withError(err, err.message)

      return response.status(500).json(res)
    } else {
      const res = dedSec.withError({}, 'Internal server error')

      return response.status(500).json(res)
    }
  }
}

export default Handler
