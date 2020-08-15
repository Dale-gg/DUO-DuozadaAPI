import Like from '@Modules/LikeDislike/Infra/Typeorm/Entities/Like'
import ILikesRepository from '@Modules/LikeDislike/Repositories/ILikesRepository'

import { getRepository, Repository } from 'typeorm'
import ICreateLikeDTO from '@Modules/LikeDislike/Dtos/ICreateLikeDTO'

class LikesRepository implements ILikesRepository {
  private ormRepository: Repository<Like>

  constructor() {
    this.ormRepository = getRepository(Like)
  }

  public async findByUsersIds(
    user_id: string,
    target_user_id: string,
  ): Promise<Like | undefined> {
    const like = await this.ormRepository.findOne({
      where: { user_id, target_user_id },
    })

    return like
  }

  public async create(likeData: ICreateLikeDTO): Promise<Like> {
    const like = this.ormRepository.create(likeData)

    await this.ormRepository.save(like)

    return like
  }

  public async save(like: Like): Promise<Like> {
    return this.ormRepository.save(like)
  }
}

export default LikesRepository
