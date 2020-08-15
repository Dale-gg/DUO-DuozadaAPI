import Dislike from '@Modules/LikeDislike/Infra/Typeorm/Entities/Dislike'
import IDislikesRepository from '@Modules/LikeDislike/Repositories/IDislikesRepository'

import { getRepository, Repository } from 'typeorm'
import ICreateDislikeDTO from '@Modules/LikeDislike/Dtos/ICreateDislikeDTO'

class DislikesRepository implements IDislikesRepository {
  private ormRepository: Repository<Dislike>

  constructor() {
    this.ormRepository = getRepository(Dislike)
  }

  public async findByUsersIds(
    user_id: string,
    target_user_id: string,
  ): Promise<Dislike | undefined> {
    const dislike = await this.ormRepository.findOne({
      where: { user_id, target_user_id },
    })

    return dislike
  }

  public async create(dislikeData: ICreateDislikeDTO): Promise<Dislike> {
    const dislike = this.ormRepository.create(dislikeData)

    await this.ormRepository.save(dislike)

    return dislike
  }

  public async save(dislike: Dislike): Promise<Dislike> {
    return this.ormRepository.save(dislike)
  }
}

export default DislikesRepository
