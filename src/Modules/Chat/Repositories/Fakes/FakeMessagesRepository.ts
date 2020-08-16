import Message from '@Modules/Chat/Infra/Typeorm/Entities/Message'
import IMessagesRepository from '@Modules/Chat/Repositories/IMessagesRepository'
import ICreateMessageDTO from '@Modules/Chat/Dtos/ICreateMessageDTO'
import { uuid } from 'uuidv4'

class FakeMessagesRepository implements IMessagesRepository {
  private messages: Message[] = []

  public async all(): Promise<Message[]> {
    return this.messages
  }

  public async create(messageData: ICreateMessageDTO): Promise<Message> {
    const message = new Message()

    Object.assign(message, { id: uuid() }, messageData)

    this.messages.push(message)

    return message
  }

  public async save(message: Message): Promise<Message> {
    const findIndex = this.messages.findIndex(
      findMessage => findMessage.id === message.id,
    )

    this.messages[findIndex] = message

    return message
  }
}

export default FakeMessagesRepository
