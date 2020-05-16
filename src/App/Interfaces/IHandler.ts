import AppError from '../Errors/AppError'
import { Request, Response, NextFunction } from 'express'

export default interface IHandler {
  createHandler(
    err: Error | AppError,
    request: Request,
    response: Response,
    _: NextFunction,
  ): Response<Error | AppError>
}
