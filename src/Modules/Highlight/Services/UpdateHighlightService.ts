import { injectable, inject } from 'tsyringe'
import AppError from '@Shared/Errors/AppError'
import IUsersRepository from '@Modules/Users/Repositories/IUsersRepository'
import IStorageProvider from '@Shared/Container/Providers/StorageProvider/Models/IStorageProvider'
import IHighlightsRepository from '../Repositories/IHighlightsRepository'
import Highlight from '../Infra/Typeorm/Entities/Highlight'

interface IRequest {
  user_id: string
  id: string
  title: string
  desc: string
  mediaFilename: string
}

@injectable()
class UpdateHighlightService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HighlightsRepository')
    private highlightsRepository: IHighlightsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    id,
    title,
    desc,
    mediaFilename,
  }: IRequest): Promise<Highlight> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found', 401)
    }

    const highlight = await this.highlightsRepository.findById(user_id, id)

    if (!highlight) {
      throw new AppError('Highlight not found', 401)
    }

    if (highlight.media) {
      await this.storageProvider.deleteFile(highlight.media)
    }

    const filename = await this.storageProvider.saveFile(mediaFilename)

    highlight.title = title
    highlight.desc = desc
    highlight.media = filename

    await this.highlightsRepository.save(highlight)

    return highlight
  }
}

export default UpdateHighlightService
