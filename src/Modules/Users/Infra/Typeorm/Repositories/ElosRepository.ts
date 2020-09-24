import Elo from '@Modules/Users/Infra/Typeorm/Entities/Elo'
import IElosRepository from '@Modules/Users/Repositories/IElosRepository'
import ICreateEloDTO from '@Modules/Users/Dtos/ICreateEloDTO'

import { getRepository, Repository } from 'typeorm'

class ElosRepository implements IElosRepository {
  private ormRepository: Repository<Elo>

  constructor() {
    this.ormRepository = getRepository(Elo)
  }

  public async allByUserId(user_id): Promise<Elo[]> {
    const elos = await this.ormRepository.find({
      where: { user_id },
    })

    return elos
  }

  public async create(eloData: ICreateEloDTO): Promise<Elo> {
    const elo = this.ormRepository.create(eloData)

    await this.ormRepository.save(elo)

    return elo
  }

  public async save(elo: Elo): Promise<Elo> {
    return this.ormRepository.save(elo)
  }
}

export default ElosRepository
