import FakeDislikesRepository from '../Repositories/Fakes/FakeDislikesRepository'

import CreateDislikeService from './CreateDislikeService'
import AppError from '@Shared/Errors/AppError'
import FakeUsersRepository from '@Modules/Users/Repositories/Fakes/FakeUsersRepository'

let fakeDislikesRepository: FakeDislikesRepository
let fakeUsersRepository: FakeUsersRepository
let createDislike: CreateDislikeService

describe('> Dislikes [CREATE]', () => {
  beforeEach(() => {
    fakeDislikesRepository = new FakeDislikesRepository()
    fakeUsersRepository = new FakeUsersRepository()
    createDislike = new CreateDislikeService(fakeDislikesRepository)
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

    const dislike = await createDislike.execute({
      user_id: user.id,
      target_user_id: target_user.id,
    })

    expect(dislike).toHaveProperty('id')
  })

  it('should not be able to create a new dislike with same user_id', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await expect(
      createDislike.execute({
        user_id: user.id,
        target_user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new dislike with the same target user', async () => {
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

    await createDislike.execute({
      user_id: user.id,
      target_user_id: target_user.id,
    })

    await expect(
      createDislike.execute({
        user_id: user.id,
        target_user_id: target_user.id,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
