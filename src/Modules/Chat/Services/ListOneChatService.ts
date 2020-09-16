import Chat from '@Modules/Chat/Infra/Typeorm/Entities/Chat'
import { injectable, inject } from 'tsyringe'
import IChatsRepository from '@Modules/Chat/Repositories/IChatsRepository'
import IUsersRepository from '@Modules/Users/Repositories/IUsersRepository'
import AppError from '@Shared/Errors/AppError'

interface IRequest {
  user_id: string
  chat_id: string
}

@injectable()
class ListOneChatService {
  constructor(
    @inject('ChatsRepository')
    private chatsRepository: IChatsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, chat_id }: IRequest): Promise<Chat> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found')
    }

    const chatWithMessages = await this.chatsRepository.findById(
      user_id,
      chat_id,
    )

    if (!chatWithMessages) {
      throw new AppError('Chat not found')
    }

    return chatWithMessages
  }
}

export default ListOneChatService
