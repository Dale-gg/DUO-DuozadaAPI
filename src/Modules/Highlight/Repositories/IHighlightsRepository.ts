import Highlight from '@Modules/Highlight/Infra/Typeorm/Entities/Highlight'
import ICreateHighlightDTO from '@Modules/Highlight/Dtos/ICreateHighlightDTO'

export default interface IHighlightsRepository {
  all(user_id: string): Promise<Highlight[]>
  findById(user_id: string, id: string): Promise<Highlight | undefined>
  create(data: ICreateHighlightDTO): Promise<Highlight>
  save(highlight: Highlight): Promise<Highlight>
}
