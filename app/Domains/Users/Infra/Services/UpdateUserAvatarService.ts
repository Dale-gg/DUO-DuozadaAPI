import User from '@Domain/Users/Infra/Entities/User'
import { injectable, inject } from 'tsyringe'
import AppError from '@Exceptions/AppError'
import IUsersRepository from '@Domain/Users/Infra/Repositories/IUsersRepository'
import IStorageHelper from '@Utils/Helpers/Storage/Models/IStorageHelper'

interface IRequest {
  user_id: string
  avatarFilename: string
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageHelper')
    private storageHelper: IStorageHelper,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401)
    }

    if (user.avatar) {
      await this.storageHelper.deleteFile(user.avatar)
    }

    const filename = await this.storageHelper.saveFile(avatarFilename)

    user.avatar = filename

    await this.usersRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
