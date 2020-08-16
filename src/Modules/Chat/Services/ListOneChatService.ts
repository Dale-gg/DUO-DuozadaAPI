import Chat from '@Modules/Chat/Infra/Typeorm/Entities/Chat'
import { injectable, inject } from 'tsyringe'
import IChatsRepository from '@Modules/Chat/Repositories/IChatsRepository'
import AppError from '@Shared/Errors/AppError'

interface IRequest {
  chat_id: string
}

@injectable()
class ListOneChatService {
  constructor(
    @inject('ChatsRepository')
    private chatsRepository: IChatsRepository,
  ) {}

  public async execute({ chat_id }: IRequest): Promise<Chat> {
    const chatWithMessages = await this.chatsRepository.findById(chat_id)

    if (!chatWithMessages) {
      throw new AppError('Chat not found')
    }

    return chatWithMessages
  }
}

export default ListOneChatService
