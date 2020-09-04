import Dislike from '@Modules/LikeDislike/Infra/Typeorm/Entities/Dislike'
import { injectable, inject } from 'tsyringe'

import AppError from '@Shared/Errors/AppError'
import IDislikesRepository from '@Modules/LikeDislike/Repositories/IDislikesRepository'

interface IRequest {
  user_id: string
  target_user_id: string
}

@injectable()
class CreateDislikeService {
  constructor(
    @inject('DislikesRepository')
    private dislikesRepository: IDislikesRepository,
  ) {}

  public async execute({
    user_id,
    target_user_id,
  }: IRequest): Promise<Dislike> {
    const findByUsersIds = await this.dislikesRepository.findByUsersIds(
      user_id,
      target_user_id,
    )

    if (user_id === target_user_id) {
      throw new AppError('You can not dislike yourself!')
    }

    if (findByUsersIds) {
      throw new AppError('You already have disliked this user!')
    }

    const dislike = await this.dislikesRepository.create({
      user_id,
      target_user_id,
    })

    return dislike
  }
}

export default CreateDislikeService
