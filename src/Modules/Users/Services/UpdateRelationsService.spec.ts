import FakeUsersRepository from '../Repositories/Fakes/FakeUsersRepository'
import FakeLanesRepository from '../Repositories/Fakes/FakeLanesRepository'
import FakeChampionsRepository from '../Repositories/Fakes/FakeChampionsRepository'
import FakeElosRepository from '../Repositories/Fakes/FakeElosRepository'

import UpdateRelationsService from './UpdateRelationsService'
import AppError from '@Shared/Errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeLanesRepository: FakeLanesRepository
let fakeChampionsRepository: FakeChampionsRepository
let fakeElosRepository: FakeElosRepository
let updateRelations: UpdateRelationsService

describe('> Update Relations', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeLanesRepository = new FakeLanesRepository()
    fakeElosRepository = new FakeElosRepository()
    fakeChampionsRepository = new FakeChampionsRepository()
    updateRelations = new UpdateRelationsService(
      fakeUsersRepository,
      fakeLanesRepository,
      fakeChampionsRepository,
      fakeElosRepository,
    )
  })

  it('should be able to create a new user with lanes, champions and one elo', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const userUpdated = await updateRelations.execute({
      user_id: user.id,
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

    expect(userUpdated).toHaveProperty('lanes')
    expect(userUpdated).toHaveProperty('champions')
    expect(userUpdated).toHaveProperty('elos')
  })

  it('should not be able to update the profile from non-existing user', async () => {
    await expect(
      updateRelations.execute({
        user_id: 'non-existing-user-id',
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
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
