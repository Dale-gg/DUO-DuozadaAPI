import Duozada from '@Modules/LikeDislike/Infra/Typeorm/Entities/Duozada'
import IDuozadasRepository from '@Modules/LikeDislike/Repositories/IDuozadasRepository'
import ICreateDuozadaDTO from '@Modules/LikeDislike/Dtos/ICreateDuozadaDTO'
import { uuid } from 'uuidv4'

class FakeDuozadasRepository implements IDuozadasRepository {
  private duozadas: Duozada[] = []

  public async create(duozadaData: ICreateDuozadaDTO): Promise<Duozada> {
    const duozada = new Duozada()

    Object.assign(duozada, { id: uuid() }, duozadaData)

    this.duozadas.push(duozada)

    return duozada
  }

  public async save(duozada: Duozada): Promise<Duozada> {
    const findIndex = this.duozadas.findIndex(
      findDuozada => findDuozada.id === duozada.id,
    )

    this.duozadas[findIndex] = duozada

    return duozada
  }
}

export default FakeDuozadasRepository
