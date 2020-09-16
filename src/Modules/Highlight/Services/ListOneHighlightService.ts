import Highlight from '@Modules/Highlight/Infra/Typeorm/Entities/Highlight'
import { injectable, inject } from 'tsyringe'
import IHighlightsRepository from '@Modules/Highlight/Repositories/IHighlightsRepository'
import AppError from '@Shared/Errors/AppError'
import IUsersRepository from '@Modules/Users/Repositories/IUsersRepository'

interface IRequest {
  user_id: string
  id: string
}

@injectable()
class ListOneHighlightService {
  constructor(
    @inject('HighlightsRepository')
    private highlightsRepository: IHighlightsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, id }: IRequest): Promise<Highlight> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found')
    }

    const highlight = await this.highlightsRepository.findById(user_id, id)

    if (!highlight) {
      throw new AppError('Highlight not found')
    }

    return highlight
  }
}

export default ListOneHighlightService
