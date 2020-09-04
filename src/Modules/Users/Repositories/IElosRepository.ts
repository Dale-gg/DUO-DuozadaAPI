import Elo from '@Modules/Users/Infra/Typeorm/Entities/Elo'
import ICreateEloDTO from '@Modules/Users/Dtos/ICreateEloDTO'

export default interface IElosRepository {
  create(data: ICreateEloDTO): Promise<Elo>
  save(user: Elo): Promise<Elo>
}
