import { Router } from 'express'

import sessionsRouter from './sessions.routes'
import usersRouter from './users.routes'

const routes = Router()

routes.use('/duo/v1/sessions', sessionsRouter)
routes.use('/duo/v1/users', usersRouter)

export default routes
