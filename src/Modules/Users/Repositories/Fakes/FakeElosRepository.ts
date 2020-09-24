import Elo from '@Modules/Users/Infra/Typeorm/Entities/Elo'
import IElosRepository from '@Modules/Users/Repositories/IElosRepository'
import ICreateEloDTO from '@Modules/Users/Dtos/ICreateEloDTO'
import { uuid } from 'uuidv4'

class FakeElosRepository implements IElosRepository {
  private elos: Elo[] = []

  public async allByUserId(user_id: string): Promise<Elo[]> {
    return this.elos.filter(eloObj => eloObj.user_id === user_id)
  }

  public async create(eloData: ICreateEloDTO): Promise<Elo> {
    const elo = new Elo()

    Object.assign(elo, { id: uuid() }, eloData)

    this.elos.push(elo)

    return elo
  }

  public async save(elo: Elo): Promise<Elo> {
    const findIndex = this.elos.findIndex(findElo => findElo.id === elo.id)

    this.elos[findIndex] = elo

    return elo
  }
}

export default FakeElosRepository
