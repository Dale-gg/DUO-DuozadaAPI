import FakeHighlightsRepository from '../Repositories/Fakes/FakeHighlightsRepository'
import FakeUsersRepository from '@Modules/Users/Repositories/Fakes/FakeUsersRepository'
import ListOneHighlightService from './ListOneHighlightService'
import CreateHighlightService from './CreateHighlightService'
import AppError from '@Shared/Errors/AppError'
import FakeStorageProvider from '@Shared/Container/Providers/StorageProvider/Fakes/FakeStorageProvider'

let fakeUsersRepository: FakeUsersRepository
let fakeHighlightsRepository: FakeHighlightsRepository
let listOneHighlights: ListOneHighlightService
let createHighlightService: CreateHighlightService
let fakeStorageProvider: FakeStorageProvider

describe('> ListOneHighlightService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHighlightsRepository = new FakeHighlightsRepository()
    fakeStorageProvider = new FakeStorageProvider()

    createHighlightService = new CreateHighlightService(
      fakeUsersRepository,
      fakeHighlightsRepository,
      fakeStorageProvider,
    )

    listOneHighlights = new ListOneHighlightService(
      fakeHighlightsRepository,
      fakeUsersRepository,
    )
  })

  it('should be able to list one highlight of user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const highlightStored = await createHighlightService.execute({
      title: 'zedão-estorano-maguin-lixera.mpcuatro',
      desc: 'como podemos ver a luquis naun aguento as trez chureken, luto',
      user_id: user.id,
      mediaFilename: 'media.mp4',
    })

    const highlight = await listOneHighlights.execute({
      user_id: user.id,
      id: highlightStored.id,
    })

    expect(highlight).toMatchObject(highlightStored)
  })

  it('should not be able to list one highlight without a valid user_id', async () => {
    await expect(
      listOneHighlights.execute({ user_id: 'non-existing-user-id', id: 'any' }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to list one highlight without a valid id', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await expect(
      listOneHighlights.execute({ user_id: user.id, id: 'any' }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
