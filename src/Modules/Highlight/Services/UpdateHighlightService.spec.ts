import FakeUsersRepository from '@Modules/Users/Repositories/Fakes/FakeUsersRepository'
import FakeHighlightsRepository from '../Repositories/Fakes/FakeHighlightsRepository'
import FakeStorageProvider from '@Shared/Container/Providers/StorageProvider/Fakes/FakeStorageProvider'
import UpdateHighlightService from './UpdateHighlightService'
import AppError from '@Shared/Errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeHighlightsRepository: FakeHighlightsRepository
let fakeStorageProvider: FakeStorageProvider
let updateHighlightService: UpdateHighlightService

describe('> Highlight [UPDATE]', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHighlightsRepository = new FakeHighlightsRepository()
    fakeStorageProvider = new FakeStorageProvider()

    updateHighlightService = new UpdateHighlightService(
      fakeUsersRepository,
      fakeHighlightsRepository,
      fakeStorageProvider,
    )
  })
  it('should be able to update an highlight', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const highlight = await fakeHighlightsRepository.create({
      title: 'aaa',
      desc: 'aaaaaa',
      media: 'aaaa.mp3',
      user_id: user.id,
    })

    await updateHighlightService.execute({
      user_id: user.id,
      title: 'aaa',
      desc: 'aaaaaa',
      id: highlight.id,
      mediaFilename: 'media.mp4',
    })

    const highlightUpdated = await fakeHighlightsRepository.findById(
      user.id,
      highlight.id,
    )

    if (highlightUpdated) {
      expect(highlightUpdated.media).toBe('media.mp4')
    }
  })

  it('should not be able to update from non existing user error', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const highlight = await fakeHighlightsRepository.create({
      title: 'aaa',
      desc: 'aaaaaa',
      media: 'aaaa.mp3',
      user_id: user.id,
    })

    await expect(
      updateHighlightService.execute({
        user_id: 'non-existing-user',
        title: 'aaa',
        desc: 'aaaaaa',
        id: highlight.id,
        mediaFilename: 'media.mp4',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update from non existing highlight error', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await expect(
      updateHighlightService.execute({
        user_id: user.id,
        title: 'aaa',
        desc: 'aaaaaa',
        id: 'non-existing-highlight',
        mediaFilename: 'media.mp4',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should delete old highlight when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const highlight = await fakeHighlightsRepository.create({
      title: 'aaa',
      desc: 'aaaaaa',
      media: 'aaaa.mp3',
      user_id: user.id,
    })

    await updateHighlightService.execute({
      user_id: user.id,
      title: 'aaa',
      desc: 'aaaaaa',
      id: highlight.id,
      mediaFilename: 'media1.mp4',
    })

    const highlightUpdated = await fakeHighlightsRepository.findById(
      user.id,
      highlight.id,
    )

    expect(deleteFile).toHaveBeenCalledWith('aaaa.mp3')
    if (highlightUpdated) {
      expect(highlightUpdated.media).toBe('media1.mp4')
    }
  })
})
