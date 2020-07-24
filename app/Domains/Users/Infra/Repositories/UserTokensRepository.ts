import UserToken from '@Domain/Users/Infra/Entities/UserToken'
import IUserTokensRepository from '@Domain/Users/Infra/Repositories/IUserTokensRepository'

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
