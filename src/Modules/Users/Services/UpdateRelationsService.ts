import User from '@Modules/Users/Infra/Typeorm/Entities/User'
import { injectable, inject } from 'tsyringe'
import IUsersRepository from '@Modules/Users/Repositories/IUsersRepository'
import AppError from '@Shared/Errors/AppError'
import ILanesRepository from '../Repositories/ILanesRepository'
import IElosRepository from '../Repositories/IElosRepository'
import IChampionsRepository from '../Repositories/IChampionsRepository'
import Elo from '../Infra/Typeorm/Entities/Elo'

interface IRequest {
  user_id: string
  lanes?: any
  champions?: any
  elos?: any
}

@injectable()
class UpdateRelationsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('LanesRepository')
    private lanesRepository: ILanesRepository,

    @inject('ChampionsRepository')
    private championsRepository: IChampionsRepository,

    @inject('ElosRepository')
    private elosRepository: IElosRepository,
  ) {}

  public async execute({
    user_id,
    lanes,
    champions,
    elos,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found')
    }

    if (lanes) {
      user.lanes = []

      await this.usersRepository.save(user)
      const promises: any = []
      lanes.map((prefix: string) => {
        return promises.push(this.lanesRepository.findByPrefix(prefix))
      })

      await Promise.all(promises).then((lanes: any) => {
        user.lanes = lanes
        this.usersRepository.save(user)
      })
    }

    if (champions) {
      user.champions = []

      await this.usersRepository.save(user)

      const promises: any = []
      champions.map((name: string) => {
        return promises.push(this.championsRepository.findByName(name))
      })

      await Promise.all(promises).then((champions: any) => {
        user.champions = champions
        this.usersRepository.save(user)
      })
    }

    if (elos) {
      const elosCreated = elos.map((elo: Elo) => {
        return this.elosRepository.create({
          user_id: user.id,
          tier: elo.tier,
          rank: elo.rank,
          season: elo.season,
          image_url: `${elo.tier}.png`,
          game_mode: elo.game_mode,
        })
      })

      await Promise.all(elosCreated)

      const allElos = await this.elosRepository.allByUserId(user.id)

      user.elos = allElos
    }

    return user
  }
}

export default UpdateRelationsService
