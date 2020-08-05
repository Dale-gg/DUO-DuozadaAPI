import { Router } from 'express'

import appointmentsRouter from '@Modules/Appointments/Infra/Http/Routes/appointments.routes'
import providersRouter from '@Modules/Appointments/Infra/Http/Routes/providers.routes'
import sessionsRouter from '@Modules/Users/Infra/Http/Routes/sessions.routes'
import usersRouter from '@Modules/Users/Infra/Http/Routes/users.routes'
import passwordRouter from '@Modules/Users/Infra/Http/Routes/password.routes'
import profileRouter from '@Modules/Users/Infra/Http/Routes/profile.routes'

const routes = Router()

routes.use('/appointments', appointmentsRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/users', usersRouter)
routes.use('/password', passwordRouter)
routes.use('/profile', profileRouter)
routes.use('/providers', providersRouter)

export default routes
