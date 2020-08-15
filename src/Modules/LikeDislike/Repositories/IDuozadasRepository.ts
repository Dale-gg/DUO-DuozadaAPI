import Duozada from '@Modules/LikeDislike/Infra/Typeorm/Entities/Duozada'
import ICreateDuozadaDTO from '@Modules/LikeDislike/Dtos/ICreateDuozadaDTO'

export default interface IDuozadasRepository {
  create(duozadaData: ICreateDuozadaDTO): Promise<Duozada>
  save(duozada: Duozada): Promise<Duozada>
}
