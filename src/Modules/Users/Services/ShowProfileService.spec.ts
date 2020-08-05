import FakeUsersRepository from '../Repositories/Fakes/FakeUsersRepository'
import ShowProfileService from './ShowProfileService'
import AppError from '@Shared/Errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let showProfile: ShowProfileService

describe('> ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()

    showProfile = new ShowProfileService(fakeUsersRepository)
  })

  it('should be able to show an user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const profile = await showProfile.execute({
      user_id: user.id,
    })

    expect(profile.name).toBe('John Doe')
    expect(profile.email).toBe('johndoe@example.com')
  })

  it('should not be able to show an user profile that does not exists', async () => {
    await expect(
      showProfile.execute({ user_id: 'non-existing-user-id' }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
