/* eslint-disable prettier/prettier */
import { Router } from 'express'

import multer from 'multer'
import uploadConfig from '../Config/upload'
import ensureAuthenticated from '../Middleware/ensureAuthenticated'
import UpdateUserAvatarService from '../Services/UpdateUserAvatarService'
import UsersController from '../Controllers/UsersController'

const usersRouter = Router()
const upload = multer(uploadConfig)

const userController = new UsersController()

usersRouter.post('/', userController.store)
usersRouter.get('/', userController.index)
usersRouter.get('/:id', userController.show)
usersRouter.put('/:id', userController.update)
usersRouter.delete('/:id', userController.destroy)

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService()

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    })

    delete user.password

    return response.json(user)
  },
)

export default usersRouter
