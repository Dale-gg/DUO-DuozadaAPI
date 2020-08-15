import Like from '@Modules/LikeDislike/Infra/Typeorm/Entities/Like'
import { injectable, inject } from 'tsyringe'

// import AppError from '@Shared/Errors/AppError'
import ILikesRepository from '@Modules/LikeDislike/Repositories/ILikesRepository'
import IDuozadasRepository from '@Modules/LikeDislike/Repositories/IDuozadasRepository'
import Duozada from '../Infra/Typeorm/Entities/Duozada'
import AppError from '@Shared/Errors/AppError'

interface IRequest {
  user_id: string
  target_user_id: string
}

@injectable()
class CreateLikeService {
  constructor(
    @inject('LikesRepository')
    private likesRepository: ILikesRepository,
    @inject('DuozadasRepository')
    private duozadasRepository: IDuozadasRepository,
  ) {}

  private async verifyLikes(like: Like): Promise<Like | undefined> {
    return this.likesRepository.findByUsersIds(
      like.target_user_id,
      like.user_id,
    )
  }

  public async execute({
    user_id,
    target_user_id,
  }: IRequest): Promise<Like | Duozada> {
    const findByUsersIds = await this.likesRepository.findByUsersIds(
      user_id,
      target_user_id,
    )

    if (findByUsersIds) {
      throw new AppError('You already have liked this user!')
    }

    const like = await this.likesRepository.create({
      user_id,
      target_user_id,
    })

    const otherLike = await this.verifyLikes(like)

    if (
      otherLike?.user_id === like.target_user_id &&
      otherLike.target_user_id === like.user_id
    ) {
      const duozada = await this.duozadasRepository.create({
        like1_id: like.id,
        like2_id: otherLike.id,
      })

      return duozada
    }

    return like
  }
}

export default CreateLikeService
