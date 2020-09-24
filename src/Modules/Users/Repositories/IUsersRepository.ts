import User from '@Modules/Users/Infra/Typeorm/Entities/User'
import ICreateUserDTO from '@Modules/Users/Dtos/ICreateUserDTO'

export default interface IUsersRepository {
  all(user_id?: string, withDeleted?: boolean): Promise<User[]>
  allWithLikeFilter(user_id: string): Promise<User[]>
  findById(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  create(data: ICreateUserDTO): Promise<User>
  save(user: User): Promise<User>
}
