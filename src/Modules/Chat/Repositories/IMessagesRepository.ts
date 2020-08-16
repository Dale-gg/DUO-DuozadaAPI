import Message from '@Modules/Chat/Infra/Typeorm/Entities/Message'
import ICreateMessageDTO from '@Modules/Chat/Dtos/ICreateMessageDTO'

export default interface IChatsRepository {
  all(): Promise<Message[]>
  create(data: ICreateMessageDTO): Promise<Message>
  save(message: Message): Promise<Message>
}
