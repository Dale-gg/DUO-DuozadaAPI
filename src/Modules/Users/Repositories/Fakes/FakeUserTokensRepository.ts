import IUserTokensRepository from '@Modules/Users/Repositories/IUserTokensRepository'
import { uuid } from 'uuidv4'
import UserToken from '@Modules/Users/Infra/Typeorm/Entities/UserToken'

class UserTokensRepository implements IUserTokensRepository {
  private userToken: UserToken[] = []

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken()

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    })

    this.userToken.push(userToken)

    return userToken
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userToken.find(
      findToken => findToken.token === token,
    )

    return userToken
  }
}

export default UserTokensRepository
