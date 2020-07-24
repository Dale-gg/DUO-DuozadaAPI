import { Request, Response, NextFunction } from 'express'
import { UnauthorizedException } from '@secjs/exceptions'
import { Guard } from '@secjs/guard'

export default async function GuardMiddleware(
  request: any,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const token = request.header('authorization' || null)

  if (!token) {
    throw new UnauthorizedException('EMPTY_TOKEN')
  }

  const guard = new Guard()
  await guard.parse(token)

  if (!guard.check()) {
    throw new UnauthorizedException('INVALID_TOKEN')
  }

  const services = request.app.get('services')
  services.register('guard', guard)
  console.log(guard.userId)
  request.user = {
    id: guard.userId,
  }
  console.log(request.user.id)

  await next()
}
