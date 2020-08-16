import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import ensureAuthenticated from '@Modules/Users/Infra/Http/Middlewares/ensureAuthenticated'

import ChatsController from '@Modules/Chat/Infra/Http/Controllers/ChatsController'

const chatRouter = Router()
const chatsController = new ChatsController()

chatRouter.use(ensureAuthenticated)

chatRouter.get('/', chatsController.index)
chatRouter.get(
  '/:chat_id',
  celebrate({
    [Segments.PARAMS]: {
      chat_id: Joi.string().required(),
    },
  }),
  chatsController.show,
)

export default chatRouter
