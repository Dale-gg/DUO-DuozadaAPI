import FakeUsersRepository from '@Modules/Users/Repositories/Fakes/FakeUsersRepository'
import FakeHighlightsRepository from '../Repositories/Fakes/FakeHighlightsRepository'
import FakeStorageProvider from '@Shared/Container/Providers/StorageProvider/Fakes/FakeStorageProvider'
import CreateHighlightService from './CreateHighlightService'
import AppError from '@Shared/Errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeHighlightsRepository: FakeHighlightsRepository
let fakeStorageProvider: FakeStorageProvider
let createHighlightService: CreateHighlightService

describe('> Highlight [CREATE]', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHighlightsRepository = new FakeHighlightsRepository()
    fakeStorageProvider = new FakeStorageProvider()

    createHighlightService = new CreateHighlightService(
      fakeUsersRepository,
      fakeHighlightsRepository,
      fakeStorageProvider,
    )
  })
  it('should be able to create an highlight', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const highlight = await createHighlightService.execute({
      title: 'zedão-estorano-maguin-lixera.mpcuatro',
      desc: 'como podemos ver a luquis naun aguento as trez chureken, luto',
      user_id: user.id,
      mediaFilename: 'media.mp4',
    })

    expect(highlight.media).toBe('media.mp4')
  })

  it('should not be able to update from non existing error', async () => {
    await expect(
      createHighlightService.execute({
        title: 'zedão-estorano-maguin-lixera.mpcuatro',
        desc: 'como podemos ver a luquis naun aguento as trez chureken, luto',
        user_id: 'non-existing-user',
        mediaFilename: 'media.mp4',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
