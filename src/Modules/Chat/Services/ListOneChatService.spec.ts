import FakeChatsRepository from '../Repositories/Fakes/FakeChatsRepository'
import FakeMessagesRepository from '../Repositories/Fakes/FakeMessagesRepository'
import FakeUsersRepository from '@Modules/Users/Repositories/Fakes/FakeUsersRepository'
import ListOneChatService from './ListOneChatService'
import AppError from '@Shared/Errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeChatsRepository: FakeChatsRepository
let fakeMessagesRepository: FakeMessagesRepository
let listOneChat: ListOneChatService

describe('> ListOneChatService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeChatsRepository = new FakeChatsRepository()
    fakeMessagesRepository = new FakeMessagesRepository()

    listOneChat = new ListOneChatService(fakeChatsRepository)
  })

  it('should be able to list one chat of user with messages', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const user2 = await fakeUsersRepository.create({
      name: 'John Two',
      email: 'johntwo@example.com',
      password: '123456',
    })

    const chat = await fakeChatsRepository.create({
      user1_id: user1.id,
      user2_id: user2.id,
    })

    const message1 = await fakeMessagesRepository.create({
      user_id: user1.id,
      chat_id: chat.id,
      body: 'Mano, ANÁLISE',
    })

    const message2 = await fakeMessagesRepository.create({
      user_id: user2.id,
      chat_id: chat.id,
      body: 'NÃO JOÃO VOCÊ TA CERTO',
    })

    chat.messages = [message1, message2]
    await fakeChatsRepository.save(chat)

    const oneChat = await listOneChat.execute({ chat_id: chat.id })

    expect(oneChat).toMatchObject(chat)
    expect(oneChat).toHaveProperty('messages')
  })

  it('should not be able to list one chat without a valid chat_id', async () => {
    await expect(
      listOneChat.execute({ chat_id: 'non-existing-chat-id' }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
