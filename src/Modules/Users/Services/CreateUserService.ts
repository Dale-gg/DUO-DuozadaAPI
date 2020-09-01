import User from '@Modules/Users/Infra/Typeorm/Entities/User'
import { injectable, inject } from 'tsyringe'

import AppError from '@Shared/Errors/AppError'
import IUsersRepository from '@Modules/Users/Repositories/IUsersRepository'
import IHashProvider from '@Modules/Users/Providers/HashProvider/Models/IHashProvider'
import ILanesRepository from '../Repositories/ILanesRepository'
import IChampionsRepository from '../Repositories/IChampionsRepository'
import IElosRepository from '../Repositories/IElosRepository'

interface IRequest {
  name: string
  email: string
  password: string
  lanes?: any
  champions?: any
  elo?: any
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

    @inject('ElosRepository')
    private elosRepository: IElosRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    lanes,
    champions,
    elo,
  }: IRequest): Promise<User> {
    const checkUsersExists = await this.usersRepository.findByEmail(email)

    if (checkUsersExists) {
      throw new AppError('Email address already used.')
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    if (lanes) {
      await lanes.map(async (prefix: string) => {
        const lane = await this.lanesRepository.findByPrefix(prefix)

        if (lane) {
          user.lanes = [lane]
          await this.usersRepository.save(user)
        }
      })
    }

    if (champions) {
      await champions.map(async (name: string) => {
        const champion = await this.championsRepository.findByName(name)

        if (champion) {
          user.champions = [champion]
          await this.usersRepository.save(user)
        }
      })
    }

    if (elo) {
      await this.elosRepository.create({
        tier: elo.tier,
        rank: elo.rank,
        season: elo.season,
        image_url: `${elo.tier}.png`,
        game_mode: elo.game_mode,
        user_id: user.id,
      })
    }

    return user
  }
}

export default CreateUserService
