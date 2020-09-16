import Highlight from '@Modules/Highlight/Infra/Typeorm/Entities/Highlight'
import IHighlightsRepository from '@Modules/Highlight/Repositories/IHighlightsRepository'
import ICreateHighlightDTO from '@Modules/Highlight/Dtos/ICreateHighlightDTO'
import { uuid } from 'uuidv4'

class FakeHighlightsRepository implements IHighlightsRepository {
  private highlights: Highlight[] = []

  public async all(user_id: string): Promise<Highlight[]> {
    let highlights = this.highlights

    highlights = this.highlights.filter(
      highlightObj => highlightObj.user_id === user_id,
    )

    return highlights
  }

  public async findById(
    user_id: string,
    id: string,
  ): Promise<Highlight | undefined> {
    const findHighlight = this.highlights.find(highlight => {
      return highlight.id === id && highlight.user_id === user_id
    })

    return findHighlight
  }

  public async create(highlightData: ICreateHighlightDTO): Promise<Highlight> {
    const highlight = new Highlight()

    Object.assign(highlight, { id: uuid() }, highlightData)

    this.highlights.push(highlight)

    return highlight
  }

  public async save(highlight: Highlight): Promise<Highlight> {
    const findIndex = this.highlights.findIndex(
      findHighlight => findHighlight.id === highlight.id,
    )

    this.highlights[findIndex] = highlight

    return highlight
  }
}

export default FakeHighlightsRepository
