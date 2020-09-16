import Highlight from '@Modules/Highlight/Infra/Typeorm/Entities/Highlight'
import { injectable, inject } from 'tsyringe'
import IHighlightsRepository from '@Modules/Highlight/Repositories/IHighlightsRepository'
import IUsersRepository from '@Modules/Users/Repositories/IUsersRepository'
import AppError from '@Shared/Errors/AppError'

interface IRequest {
  user_id: string
}

@injectable()
class ListAllHighlightsService {
  constructor(
    @inject('HighlightsRepository')
    private highlightsRepository: IHighlightsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Highlight[]> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found')
    }

    const highlights = await this.highlightsRepository.all(user_id)

    return highlights
  }
}

export default ListAllHighlightsService
