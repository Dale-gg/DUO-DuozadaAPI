import FakeHighlightsRepository from '../Repositories/Fakes/FakeHighlightsRepository'
import FakeUsersRepository from '@Modules/Users/Repositories/Fakes/FakeUsersRepository'
import ListAllHighlightsService from './ListAllHighlightsService'
import CreateHighlightService from './CreateHighlightService'
import AppError from '@Shared/Errors/AppError'
import FakeStorageProvider from '@Shared/Container/Providers/StorageProvider/Fakes/FakeStorageProvider'

let fakeUsersRepository: FakeUsersRepository
let fakeHighlightsRepository: FakeHighlightsRepository
let listAllHighlights: ListAllHighlightsService
let createHighlightService: CreateHighlightService
let fakeStorageProvider: FakeStorageProvider

describe('> ListAllHighlightsService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHighlightsRepository = new FakeHighlightsRepository()
    fakeStorageProvider = new FakeStorageProvider()

    createHighlightService = new CreateHighlightService(
      fakeUsersRepository,
      fakeHighlightsRepository,
      fakeStorageProvider,
    )

    listAllHighlights = new ListAllHighlightsService(
      fakeHighlightsRepository,
      fakeUsersRepository,
    )
  })

  it('should be able to list all highlights of user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await createHighlightService.execute({
      title: 'zedão-estorano-maguin-lixera.mpcuatro',
      desc: 'como podemos ver a luquis naun aguento as trez chureken, luto',
      user_id: user.id,
      mediaFilename: 'media.mp4',
    })

    await createHighlightService.execute({
      title: 'zedão-estorano-maguin-lixera.mpcuatro',
      desc: 'como podemos ver a luquis naun aguento as trez chureken, luto',
      user_id: user.id,
      mediaFilename: 'media.mp4',
    })

    const highlights = await listAllHighlights.execute({ user_id: user.id })

    expect(highlights).toHaveLength(2)
  })

  it('should not be able to list all highlights without a valid user_id', async () => {
    await expect(
      listAllHighlights.execute({ user_id: 'non-existing-user-id' }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
