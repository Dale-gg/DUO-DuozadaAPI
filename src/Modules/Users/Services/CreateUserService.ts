import User from '@Modules/Users/Infra/Typeorm/Entities/User'
import { injectable, inject } from 'tsyringe'

import AppError from '@Shared/Errors/AppError'
import IUsersRepository from '@Modules/Users/Repositories/IUsersRepository'
import IHashProvider from '@Modules/Users/Providers/HashProvider/Models/IHashProvider'
import ILanesRepository from '../Repositories/ILanesRepository'
import IChampionsRepository from '../Repositories/IChampionsRepository'

interface IRequest {
  name: string
  email: string
  password: string
  lanes?: any
  champions?: any
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('LanesRepository')
    private lanesRepository: ILanesRepository,

    @inject('ChampionsRepository')
    private championsRepository: IChampionsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    lanes,
    champions,
  }: IRequest): Promise<User> {
    const checkUsersExists = await this.usersRepository.findByEmail(email)

    if (checkUsersExists) {
      throw new AppError('Email address already used.')
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    if (lanes) {
      lanes = await lanes.map((prefix: string) => {
        return this.lanesRepository.findByPrefix(prefix)
      })
    }

    if (champions) {
      champions = await champions.map((name: string) => {
        return this.championsRepository.findByName(name)
      })
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      lanes,
      champions,
    })

    return user
  }
}

export default CreateUserService
