import FakeChatsRepository from '../Repositories/Fakes/FakeChatsRepository'
import FakeUsersRepository from '@Modules/Users/Repositories/Fakes/FakeUsersRepository'
import ListAllChatsService from './ListAllChatsService'
import AppError from '@Shared/Errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeChatsRepository: FakeChatsRepository
let listAllChats: ListAllChatsService

describe('> ListAllChatsService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeChatsRepository = new FakeChatsRepository()

    listAllChats = new ListAllChatsService(
      fakeChatsRepository,
      fakeUsersRepository,
    )
  })

  it('should be able to list all chats of user', async () => {
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

    const user3 = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '123456',
    })

    await fakeChatsRepository.create({
      user1_id: user1.id,
      user2_id: user2.id,
    })

    await fakeChatsRepository.create({
      user1_id: user1.id,
      user2_id: user3.id,
    })

    const chats = await listAllChats.execute({ user_id: user1.id })

    expect(chats).toHaveLength(2)
  })

  it('should not be able to list all chats without a valid user_id', async () => {
    await expect(
      listAllChats.execute({ user_id: 'non-existing-user-id' }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
