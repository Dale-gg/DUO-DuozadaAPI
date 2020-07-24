import { Router } from 'express'

import multer from 'multer'
import uploadConfig from '@Config/upload'

import UsersController from '@Domain/Users/Infra/Controllers/UsersController'
// import ensureAuthenticated from '@Domain/Users/Infra/Middlewares/ensureAuthenticated'
import UserAvatarController from '@Domain/Users/Infra/Controllers/UserAvatarController'

const usersRouter = Router()
const upload = multer(uploadConfig)

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

usersRouter.post('/', usersController.store)
usersRouter.patch(
  '/avatar',
  // ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
)

export default usersRouter
