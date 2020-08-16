import FakeLikesRepository from '../Repositories/Fakes/FakeLikesRepository'
import FakeDuozadasRepository from '../Repositories/Fakes/FakeDuozadasRepository'

import CreateLikeService from './CreateLikeService'
import AppError from '@Shared/Errors/AppError'
import FakeChatsRepository from '@Modules/Chat/Repositories/Fakes/FakeChatsRepository'
import FakeUsersRepository from '@Modules/Users/Repositories/Fakes/FakeUsersRepository'
import Duozada from '../Infra/Typeorm/Entities/Duozada'

let fakeLikesRepository: FakeLikesRepository
let fakeDuozadasRepository: FakeDuozadasRepository
let fakeUsersRepository: FakeUsersRepository
let fakeChatsRepository: FakeChatsRepository
let createLike: CreateLikeService

describe('> Likes [CREATE]', () => {
  beforeEach(() => {
    fakeLikesRepository = new FakeLikesRepository()
    fakeDuozadasRepository = new FakeDuozadasRepository()
    fakeUsersRepository = new FakeUsersRepository()
    fakeChatsRepository = new FakeChatsRepository()

    createLike = new CreateLikeService(
      fakeLikesRepository,
      fakeDuozadasRepository,
      fakeChatsRepository,
    )
  })

  it('should be able to create a new like', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })
    const target_user = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '123456',
    })

    const like = await createLike.execute({
      user_id: user.id,
      target_user_id: target_user.id,
    })

    expect(like).toHaveProperty('id')
  })

  it('should not be able to create a new like with the same target user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })
    const target_user = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '123456',
    })

    await createLike.execute({
      user_id: user.id,
      target_user_id: target_user.id,
    })

    await expect(
      createLike.execute({
        user_id: user.id,
        target_user_id: target_user.id,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to create a new duozada', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })
    const target_user = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '123456',
    })

    await createLike.execute({
      user_id: user.id,
      target_user_id: target_user.id,
    })

    const itsDuozada = await createLike.execute({
      user_id: target_user.id,
      target_user_id: user.id,
    })

    expect(itsDuozada).toBeInstanceOf(Duozada)
  })
})
