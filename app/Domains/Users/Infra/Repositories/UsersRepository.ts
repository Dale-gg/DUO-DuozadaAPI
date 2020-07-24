import User from '@Domain/Users/Infra/Entities/User'
import IUsersRepository from '@Domain/Users/Infra/Repositories/IUsersRepository'
import ICreateUserDTO from '@Domain/Users/DTO/ICreateUserDTO'

import { getRepository, Repository } from 'typeorm'
import BaseRepository from './BaseRepository'

class UsersRepository extends BaseRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    super()
    this.ormRepository = getRepository(User)
  }

  newQuery() {
    return this.ormRepository
      .createQueryBuilder('user')
      .where('user.deleted_at = false')
      .andWhere('user.status = active')
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.newQuery().andWhere(`user.id = ${id}`).getOne()
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.newQuery().andWhere(`user.email = ${email}`).getOne()
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData)

    await this.ormRepository.save(user)

    return user
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user)
  }
}

export default UsersRepository
