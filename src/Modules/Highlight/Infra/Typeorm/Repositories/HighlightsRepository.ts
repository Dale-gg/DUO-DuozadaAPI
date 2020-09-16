import Highlight from '@Modules/Highlight/Infra/Typeorm/Entities/Highlight'
import IHighlightsRepository from '@Modules/Highlight/Repositories/IHighlightsRepository'
import ICreateHighlightDTO from '@Modules/Highlight/Dtos/ICreateHighlightDTO'

import { getRepository, Repository } from 'typeorm'

class HighlightsRepository implements IHighlightsRepository {
  private ormRepository: Repository<Highlight>

  constructor() {
    this.ormRepository = getRepository(Highlight)
  }

  public async all(user_id: string): Promise<Highlight[]> {
    return this.ormRepository.find({
      where: { user_id },
    })
  }

  public async findById(
    user_id: string,
    id: string,
  ): Promise<Highlight | undefined> {
    return this.ormRepository.findOne({
      where: { id, user_id },
    })
  }

  public async create(highlightData: ICreateHighlightDTO): Promise<Highlight> {
    const highlight = this.ormRepository.create(highlightData)

    await this.ormRepository.save(highlight)

    return highlight
  }

  public async save(highlight: Highlight): Promise<Highlight> {
    return this.ormRepository.save(highlight)
  }
}

export default HighlightsRepository
