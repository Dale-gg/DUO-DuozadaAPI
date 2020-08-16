import FakeUsersRepository from '../Repositories/Fakes/FakeUsersRepository'
import FakeLikesRepository from '../../LikeDislike/Repositories/Fakes/FakeLikesRepository'
import FakeDislikesRepository from '../../LikeDislike/Repositories/Fakes/FakeDislikesRepository'
import ListAllUsersByFilters from './ListAllUsersByFilters'

let fakeUsersRepository: FakeUsersRepository
let fakeLikesRepository: FakeLikesRepository
let fakeDislikesRepository: FakeDislikesRepository
let listAllUsersByFilters: ListAllUsersByFilters

describe('> Users [ALL/FILTERS]', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeLikesRepository = new FakeLikesRepository()
    fakeDislikesRepository = new FakeDislikesRepository()

    listAllUsersByFilters = new ListAllUsersByFilters(fakeUsersRepository)
  })

  it('should be able to list only one user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })
    const target_user = await fakeUsersRepository.create({
      name: 'Target User [CANT LOG]',
      email: 'johntre@example.com',
      password: '123456',
    })
    const userFor = await fakeUsersRepository.create({
      name: 'John For',
      email: 'johnfor@example.com',
      password: '123456',
    })
    const userFive = await fakeUsersRepository.create({
      name: 'John Fiv',
      email: 'johnfiv@example.com',
      password: '123456',
    })

    const likeOne = await fakeLikesRepository.create({
      user_id: user.id,
      target_user_id: target_user.id,
    })

    const dislikeOne = await fakeDislikesRepository.create({
      user_id: user.id,
      target_user_id: userFive.id,
    })

    user.likes = [likeOne]
    user.dislikes = [dislikeOne]
    await fakeUsersRepository.save(user)

    const users = await listAllUsersByFilters.execute({ user_id: user.id })

    expect(users[0].id).toEqual(userFor.id)
    expect(users[1]).toBeUndefined()
  })
})
