import Lane from '@Modules/Users/Infra/Typeorm/Entities/Lane'

export default interface ILanesRepository {
  findById(id: string): Promise<Lane | undefined>
  findByPrefix(email: string): Promise<Lane | undefined>
}
