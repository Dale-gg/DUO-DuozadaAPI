import FakeUsersRepository from '../Repositories/Fakes/FakeUsersRepository'
import FakeHashProvider from '../Providers/HashProvider/Fakes/FakeHashProvider'
import FakeLanesRepository from '../Repositories/Fakes/FakeLanesRepository'
import FakeChampionsRepository from '../Repositories/Fakes/FakeChampionsRepository'
import FakeElosRepository from '../Repositories/Fakes/FakeElosRepository'

import CreateUserService from './CreateUserService'
import AppError from '@Shared/Errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let fakeLanesRepository: FakeLanesRepository
let fakeChampionsRepository: FakeChampionsRepository
let fakeElosRepository: FakeElosRepository
let createUser: CreateUserService

describe('> Users [CREATE]', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    fakeLanesRepository = new FakeLanesRepository()
    fakeElosRepository = new FakeElosRepository()
    fakeChampionsRepository = new FakeChampionsRepository()
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeLanesRepository,
      fakeChampionsRepository,
      fakeElosRepository,
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

  it('should be able to create a new user with lanes, champions and one elo', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      lanes: ['TOP', 'MID'],
      champions: ['Zed', 'Yasuo', 'Riven'],
      elos: [
        {
          tier: 'Bronze',
          rank: 'II',
          season: '11',
          game_mode: 'Solo/Duo',
        },
      ],
    })

    expect(user).toHaveProperty('lanes')
    expect(user).toHaveProperty('champions')
    expect(user).toHaveProperty('elos')
  })
})
