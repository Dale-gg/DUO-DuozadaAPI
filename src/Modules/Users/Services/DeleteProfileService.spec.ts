import FakeUsersRepository from '../Repositories/Fakes/FakeUsersRepository'
import DeleteProfileService from './DeleteProfileService'
import AppError from '@Shared/Errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let deleteProfile: DeleteProfileService

describe('> Delete Profile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()

    deleteProfile = new DeleteProfileService(fakeUsersRepository)
  })

  it('should be able to update an user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await deleteProfile.execute(user.id)

    const userDeleted = await fakeUsersRepository.findById(user.id)

    if (userDeleted) {
      expect(userDeleted.status).toBe(false)
    }
  })

  it('should not be able to update an user that does not exists', async () => {
    await expect(
      deleteProfile.execute('non-existing-user-id'),
    ).rejects.toBeInstanceOf(AppError)
  })
})
