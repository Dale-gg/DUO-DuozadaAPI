import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import ensureAuthenticated from '@Modules/Users/Infra/Http/Middlewares/ensureAuthenticated'

import LikeController from '@Modules/LikeDislike/Infra/Http/Controllers/LikeController'

const likeRouter = Router()
const likeController = new LikeController()

likeRouter.use(ensureAuthenticated)

likeRouter.post(
  '/:target_user_id',
  celebrate({
    [Segments.PARAMS]: {
      target_user_id: Joi.string().uuid().required(),
    },
  }),
  likeController.store,
)

export default likeRouter
