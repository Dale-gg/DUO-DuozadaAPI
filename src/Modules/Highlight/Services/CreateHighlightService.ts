import Highlight from '@Modules/Highlight/Infra/Typeorm/Entities/Highlight'
import { injectable, inject } from 'tsyringe'
import AppError from '@Shared/Errors/AppError'
import IHighlightsRepository from '@Modules/Highlight/Repositories/IHighlightsRepository'
import IStorageProvider from '@Shared/Container/Providers/StorageProvider/Models/IStorageProvider'
import IUsersRepository from '@Modules/Users/Repositories/IUsersRepository'

interface IRequest {
  title: string
  desc: string
  mediaFilename: string
  user_id: string
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HighlightsRepository')
    private highlightsRepository: IHighlightsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    title,
    desc,
    mediaFilename,
    user_id,
  }: IRequest): Promise<Highlight> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found, cant create a highlight', 403)
    }

    const filename = await this.storageProvider.saveFile(mediaFilename)
    const highlight = await this.highlightsRepository.create({
      title,
      desc,
      media: filename,
      user_id,
    })

    return highlight
  }
}

export default UpdateUserAvatarService
