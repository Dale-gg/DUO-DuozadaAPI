import { Router } from 'express'
import SessionsController from '../App/Controllers/SessionsController'

const sessionsRouter = Router()
const sessionController = new SessionsController()

sessionsRouter.post('/', sessionController.store)

export default sessionsRouter
