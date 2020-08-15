import { Router } from 'express'

import sessionsRouter from '@Modules/Users/Infra/Http/Routes/sessions.routes'
import usersRouter from '@Modules/Users/Infra/Http/Routes/users.routes'
import passwordRouter from '@Modules/Users/Infra/Http/Routes/password.routes'
import profileRouter from '@Modules/Users/Infra/Http/Routes/profile.routes'
import likeRouter from '@Modules/LikeDislike/Infra/Http/Routes/like.routes'
import dislikeRouter from '@Modules/LikeDislike/Infra/Http/Routes/dislike.routes'

const routes = Router()

routes.use('/sessions', sessionsRouter)
routes.use('/users', usersRouter)
routes.use('/password', passwordRouter)
routes.use('/profile', profileRouter)
routes.use('/like', likeRouter)
routes.use('/dislike', dislikeRouter)

export default routes
