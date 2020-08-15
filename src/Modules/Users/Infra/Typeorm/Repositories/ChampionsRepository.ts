import Champion from '@Modules/Users/Infra/Typeorm/Entities/Champion'
import IChampionsRepository from '@Modules/Users/Repositories/IChampionsRepository'

import { getRepository, Repository } from 'typeorm'

class ChampionsRepository implements IChampionsRepository {
  private ormRepository: Repository<Champion>

  constructor() {
    this.ormRepository = getRepository(Champion)
  }

  public async findById(id: string): Promise<Champion | undefined> {
    const champion = await this.ormRepository.findOne(id)

    return champion
  }

  public async findByName(name: string): Promise<Champion | undefined> {
    const champion = await this.ormRepository.findOne({ where: { name } })

    return champion
  }
}

export default ChampionsRepository
