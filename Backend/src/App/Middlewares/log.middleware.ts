import { Request, Response } from 'express'

const myMiddleware = (req: Request, res: Response, next: any) => {
  console.log('Middleware working')
  next()
}

export default myMiddleware
