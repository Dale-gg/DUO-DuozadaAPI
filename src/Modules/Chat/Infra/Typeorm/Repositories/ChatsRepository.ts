import Chat from '@Modules/Chat/Infra/Typeorm/Entities/Chat'
import IChatsRepository from '@Modules/Chat/Repositories/IChatsRepository'
import ICreateChatDTO from '@Modules/Chat/Dtos/ICreateChatDTO'

import { getRepository, Repository } from 'typeorm'

class ChatsRepository implements IChatsRepository {
  private ormRepository: Repository<Chat>

  constructor() {
    this.ormRepository = getRepository(Chat)
  }

  public async all(user_id: string): Promise<Chat[]> {
    const chats = await this.ormRepository.find({
      where: { user1_id: user_id },
    })

    return chats
  }

  public async findById(id: string): Promise<Chat | undefined> {
    const chat = await this.ormRepository.findOne({
      where: { id },
      relations: ['messages'],
    })

    return chat
  }

  public async create(chatData: ICreateChatDTO): Promise<Chat> {
    const chat = this.ormRepository.create(chatData)

    await this.ormRepository.save(chat)

    return chat
  }

  public async save(chat: Chat): Promise<Chat> {
    return this.ormRepository.save(chat)
  }
}

export default ChatsRepository
