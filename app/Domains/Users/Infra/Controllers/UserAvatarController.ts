import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UpdateUserAvatarService from '@Domain/Users/Infra/Services/UpdateUserAvatarService'

export default class UserAvatarController {
  public async update(request: any, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService)

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    })

    delete user.password

    return response.json(user)
  }
}
