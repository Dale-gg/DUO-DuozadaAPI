import UserToken from '@Modules/Users/Infra/Typeorm/Entities/UserToken'
import IUserTokensRepository from '@Modules/Users/Repositories/IUserTokensRepository'

import { getRepository, Repository } from 'typeorm'

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>

  constructor() {
    this.ormRepository = getRepository(UserToken)
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    })

    await this.ormRepository.save(userToken)

    return userToken
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    })

    return userToken
  }
}

export default UserTokensRepository
