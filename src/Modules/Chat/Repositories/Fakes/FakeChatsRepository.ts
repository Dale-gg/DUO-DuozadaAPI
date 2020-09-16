import Chat from '@Modules/Chat/Infra/Typeorm/Entities/Chat'
import IChatsRepository from '@Modules/Chat/Repositories/IChatsRepository'
import ICreateChatDTO from '@Modules/Chat/Dtos/ICreateChatDTO'
import { uuid } from 'uuidv4'

class FakeChatsRepository implements IChatsRepository {
  private chats: Chat[] = []

  public async all(user_id: string): Promise<Chat[]> {
    const findChat = this.chats.filter(chat => chat.user1_id === user_id)

    return findChat
  }

  public async findById(
    user_id: string,
    id: string,
  ): Promise<Chat | undefined> {
    const findChat = this.chats.find(
      chat => chat.id === id && chat.user1_id === user_id,
    )

    return findChat
  }

  public async create(chatData: ICreateChatDTO): Promise<Chat> {
    const chat = new Chat()

    Object.assign(chat, { id: uuid() }, chatData)

    this.chats.push(chat)

    return chat
  }

  public async save(chat: Chat): Promise<Chat> {
    const findIndex = this.chats.findIndex(findChat => findChat.id === chat.id)

    this.chats[findIndex] = chat

    return chat
  }
}

export default FakeChatsRepository
