import { Router } from 'express'

import sessionsRouter from './sessions.routes'
import usersRouter from './users.routes'

const routes = Router()

routes.use('/api/v1/sessions', sessionsRouter)
routes.use('/api/v1/users', usersRouter)

export default routes
