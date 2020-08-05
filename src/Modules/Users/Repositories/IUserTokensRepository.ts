import UserToken from '../Infra/Typeorm/Entities/UserToken'

export default interface IUserTokensRepository {
  generate(user_id: string): Promise<UserToken>
  findByToken(token: string): Promise<UserToken | undefined>
}
