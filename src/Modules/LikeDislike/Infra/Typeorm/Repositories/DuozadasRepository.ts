import Duozada from '@Modules/LikeDislike/Infra/Typeorm/Entities/Duozada'
import IDuozadasRepository from '@Modules/LikeDislike/Repositories/IDuozadasRepository'

import { getRepository, Repository } from 'typeorm'
import ICreateDuozadaDTO from '@Modules/LikeDislike/Dtos/ICreateDuozadaDTO'

class DuozadasRepository implements IDuozadasRepository {
  private ormRepository: Repository<Duozada>

  constructor() {
    this.ormRepository = getRepository(Duozada)
  }

  public async create(duozadaData: ICreateDuozadaDTO): Promise<Duozada> {
    const duozada = this.ormRepository.create(duozadaData)

    await this.ormRepository.save(duozada)

    return duozada
  }

  public async save(duozada: Duozada): Promise<Duozada> {
    return this.ormRepository.save(duozada)
  }
}

export default DuozadasRepository
