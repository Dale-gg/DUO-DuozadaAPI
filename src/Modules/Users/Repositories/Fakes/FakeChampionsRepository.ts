import Champion from '@Modules/Users/Infra/Typeorm/Entities/Champion'
import IChampionsRepository from '@Modules/Users/Repositories/IChampionsRepository'
import { uuid } from 'uuidv4'

class FakeChampionsRepository implements IChampionsRepository {
  private champions: Champion[] = []

  constructor() {
    this.champions.push(
      {
        id: uuid(),
        name: 'Zed',
        key: 'Zed',
        title: 'The master of shadows',
        tags: ['Fighter'],
        version: '8',
        image_full_url: 'https://images.unsplash.com/Zed',
        image_loading_url: 'https://images.unsplash.com/Zed',
        image_splash_url: 'https://images.unsplash.com/Zed',
        image_sprite_url: 'https://images.unsplash.com/Zed',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: 'Yasuo',
        key: 'Yasuo',
        title: 'The king of wind',
        tags: ['Fighter'],
        version: '8',
        image_full_url: 'https://images.unsplash.com/Zed',
        image_loading_url: 'https://images.unsplash.com/Zed',
        image_splash_url: 'https://images.unsplash.com/Zed',
        image_sprite_url: 'https://images.unsplash.com/Zed',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: 'Riven',
        key: 'Riven',
        title: 'The broken wings',
        tags: ['Fighter'],
        version: '8',
        image_full_url: 'https://images.unsplash.com/Zed',
        image_loading_url: 'https://images.unsplash.com/Zed',
        image_splash_url: 'https://images.unsplash.com/Zed',
        image_sprite_url: 'https://images.unsplash.com/Zed',
        created_at: new Date(),
        updated_at: new Date(),
      },
    )
  }

  public async findById(id: string): Promise<Champion | undefined> {
    const findChampion = this.champions.find(champion => champion.id === id)

    return findChampion
  }

  public async findByName(name: string): Promise<Champion | undefined> {
    const findChampion = this.champions.find(champion => champion.name === name)

    return findChampion
  }
}

export default FakeChampionsRepository
