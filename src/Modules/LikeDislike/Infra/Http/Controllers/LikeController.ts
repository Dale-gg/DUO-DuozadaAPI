import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateLikeService from '@Modules/LikeDislike/Services/CreateLikeService'

export default class LikeController {
  public async store(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { target_user_id } = request.params

    const createLikeService = container.resolve(CreateLikeService)

    const like = await createLikeService.execute({
      user_id,
      target_user_id,
    })

    return response.status(201).json(like)
  }
}
