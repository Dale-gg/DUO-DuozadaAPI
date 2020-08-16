import Chat from '@Modules/Chat/Infra/Typeorm/Entities/Chat'
import ICreateChatDTO from '@Modules/Chat/Dtos/ICreateChatDTO'

export default interface IChatsRepository {
  all(user_id: string): Promise<Chat[]>
  findById(id: string): Promise<Chat | undefined>
  create(data: ICreateChatDTO): Promise<Chat>
  save(chat: Chat): Promise<Chat>
}
