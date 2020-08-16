import Message from '@Modules/Chat/Infra/Typeorm/Entities/Message'
import IMessagesRepository from '@Modules/Chat/Repositories/IMessagesRepository'
import ICreateMessageDTO from '@Modules/Chat/Dtos/ICreateMessageDTO'

import { getRepository, Repository } from 'typeorm'

class MessagesRepository implements IMessagesRepository {
  private ormRepository: Repository<Message>

  constructor() {
    this.ormRepository = getRepository(Message)
  }

  public async all(chat_id: string): Promise<Message[]> {
    const messages = await this.ormRepository.find({
      where: { chat_id },
    })

    return messages
  }

  public async create(messageData: ICreateMessageDTO): Promise<Message> {
    const message = this.ormRepository.create(messageData)

    await this.ormRepository.save(message)

    return message
  }

  public async save(message: Message): Promise<Message> {
    return this.ormRepository.save(message)
  }
}

export default MessagesRepository
