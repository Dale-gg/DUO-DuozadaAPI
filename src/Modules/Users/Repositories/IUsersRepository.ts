import User from '@Modules/Users/Infra/Typeorm/Entities/User'
import ICreateUserDTO from '@Modules/Users/Dtos/ICreateUserDTO'

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  create(data: ICreateUserDTO): Promise<User>
  save(user: User): Promise<User>
}
