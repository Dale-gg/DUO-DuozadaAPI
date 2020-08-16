import FakeUsersRepository from '../Repositories/Fakes/FakeUsersRepository'
import FakeHashProvider from '../Providers/HashProvider/Fakes/FakeHashProvider'
import FakeLanesRepository from '../Repositories/Fakes/FakeLanesRepository'
import FakeChampionsRepository from '../Repositories/Fakes/FakeChampionsRepository'

import CreateUserService from './CreateUserService'
import AppError from '@Shared/Errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let fakeLanesRepository: FakeLanesRepository
let fakeChampionsRepository: FakeChampionsRepository
let createUser: CreateUserService

describe('> Users [CREATE]', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    fakeLanesRepository = new FakeLanesRepository()
    fakeChampionsRepository = new FakeChampionsRepository()
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeLanesRepository,
      fakeChampionsRepository,
      fakeHashProvider,
    )
  })

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to create a new user with lanes and champions', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      lanes: ['TOP', 'MID'],
      champions: ['Zed', 'Yasuo', 'Riven'],
    })

    expect(user).toHaveProperty('lanes')
    expect(user).toHaveProperty('champions')
  })
})
