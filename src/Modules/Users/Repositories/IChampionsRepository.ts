import Champion from '@Modules/Users/Infra/Typeorm/Entities/Champion'

export default interface IChampionsRepository {
  findById(id: string): Promise<Champion | undefined>
  findByName(email: string): Promise<Champion | undefined>
}
