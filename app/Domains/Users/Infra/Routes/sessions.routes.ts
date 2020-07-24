import { Router } from 'express'

import SessionsController from '@Domain/Users/Infra/Controllers/SessionsController'

const sessionsRouter = Router()
const sessionsController = new SessionsController()

sessionsRouter.post('/', sessionsController.store)

export default sessionsRouter
