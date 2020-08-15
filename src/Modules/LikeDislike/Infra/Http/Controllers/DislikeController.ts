import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateDislikeService from '@Modules/LikeDislike/Services/CreateDislikeService'

export default class DislikeController {
  public async store(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { target_user_id } = request.params

    const createDislikeService = container.resolve(CreateDislikeService)

    const dislike = await createDislikeService.execute({
      user_id,
      target_user_id,
    })

    return response.status(201).json(dislike)
  }
}
