import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import ensureAuthenticated from '@Modules/Users/Infra/Http/Middlewares/ensureAuthenticated'

import DislikeController from '@Modules/LikeDislike/Infra/Http/Controllers/DislikeController'

const dislikeRouter = Router()
const dislikeController = new DislikeController()

dislikeRouter.use(ensureAuthenticated)

dislikeRouter.post(
  '/:target_user_id',
  celebrate({
    [Segments.PARAMS]: {
      target_user_id: Joi.string().uuid().required(),
    },
  }),
  dislikeController.store,
)

export default dislikeRouter
