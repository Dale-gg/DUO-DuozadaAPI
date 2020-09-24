import User from '@Modules/Users/Infra/Typeorm/Entities/User'
import IUsersRepository from '@Modules/Users/Repositories/IUsersRepository'
import ICreateUserDTO from '@Modules/Users/Dtos/ICreateUserDTO'

import { getRepository, Repository, Not } from 'typeorm'
import AppError from '@Shared/Errors/AppError'

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async all(user_id?: string, withDeleted? = false): Promise<User[]> {
    let users: User[]

    if (withDeleted) {
      if (user_id) {
        users = await this.ormRepository.find({
          where: { id: Not(user_id) },
          relations: ['lanes', 'champions', 'elos'],
        })
      } else {
        users = await this.ormRepository.find({
          relations: ['lanes', 'champions', 'elos'],
        })
      }
    } else {
      if (user_id) {
        users = await this.ormRepository.find({
          where: { id: Not(user_id), status: true },
          relations: ['lanes', 'champions', 'elos'],
        })
      } else {
        users = await this.ormRepository.find({
          where: { status: true },
          relations: ['lanes', 'champions', 'elos'],
        })
      }
    }

    return users
  }

  public async allWithLikeFilter(user_id: string): Promise<User[]> {
    let users: User[] = []

    const loggedUser = await this.ormRepository.findOne(user_id, {
      relations: ['likes', 'dislikes'],
    })

    if (!loggedUser) {
      throw new AppError('User not found')
    }

    if (loggedUser.likes[0] || loggedUser.dislikes[0]) {
      users = await this.ormRepository.find({
        join: {
          alias: 'users',
          leftJoin: { likes: 'users.likes', dislikes: 'users.dislikes' },
        },
        relations: ['lanes', 'champions', 'elos'],
        where: (qb: any) => {
          qb.where({
            id: Not(loggedUser.id),
            status: true,
          }).andWhere('users.id NOT IN (:...targetUsersIds)', {
            targetUsersIds: [
              ...loggedUser.likes.map(like => {
                return like.target_user_id
              }),
              ...loggedUser.dislikes.map(dislike => {
                return dislike.target_user_id
              }),
            ],
          })
        },
      })
    } else {
      users = await this.all(loggedUser.id)
    }

    return users
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id },
      relations: ['lanes', 'champions', 'elos'],
    })

    return user
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
      relations: ['lanes', 'champions', 'elos'],
    })

    return user
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData)

    await this.ormRepository.save(user)

    // const userWithRelations = await this.findById(user.id)

    return user
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user)
  }
}

export default UsersRepository
