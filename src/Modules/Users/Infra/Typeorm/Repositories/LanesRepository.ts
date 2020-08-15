import Lane from '@Modules/Users/Infra/Typeorm/Entities/Lane'
import ILanesRepository from '@Modules/Users/Repositories/ILanesRepository'

import { getRepository, Repository } from 'typeorm'

class LanesRepository implements ILanesRepository {
  private ormRepository: Repository<Lane>

  constructor() {
    this.ormRepository = getRepository(Lane)
  }

  public async findById(id: string): Promise<Lane | undefined> {
    const lane = await this.ormRepository.findOne(id)

    return lane
  }

  public async findByPrefix(prefix: string): Promise<Lane | undefined> {
    const lane = await this.ormRepository.findOne({ where: { prefix } })

    return lane
  }
}

export default LanesRepository
