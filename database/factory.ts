import User from '../App/Models/User'
import Champion from '../App/Models/Champion'
import IUser from '../App/Interfaces/IUser'
import { getRepository } from 'typeorm'
import faker from 'faker'
import Lane from '../App/Models/Lane'
import { ILaneObject } from '../App/Interfaces/ILane'
import IChampion, { IChampionObject } from '../App/Interfaces/IChampion'
import { LolApi } from '@jlenon7/zedjs'

interface IResponseLane {
  top: ILaneObject
  mid: ILaneObject
  jg: ILaneObject
  adc: ILaneObject
  sup: ILaneObject
}

class Factory {
  public async user(data: IUser): Promise<void> {
    const userRepository = getRepository(User)

    const user = userRepository.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      champions: data.champions,
      lanes: data.lanes,
      avatar: 'teste.png',
      media: 'teste.mp4',
    })

    await userRepository.save(user)
  }

  public async manyUsers(value: number): Promise<void> {
    const repository = getRepository(User)
    const lanes = await this.lanes()

    const api = new LolApi()
    const { data: championsDto } = await api.DataDragon.getChampion()

    const champion0 = await this.champion(championsDto.Zed)
    const champion1 = await this.champion(championsDto.Yasuo)
    const champion2 = await this.champion(championsDto.Riven)

    for (let i = 1; i <= value; i++) {
      const user = repository.create({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        champions: [champion0, champion1, champion2],
        lanes: [lanes.mid, lanes.top],
        avatar: 'http://localhost:3333/files/image.png',
        media: 'http://localhost:3333/files/image.mp4',
        dislike: '30',
        like: '30',
      })

      await repository.save(user)
    }
  }

  public async lanes(): Promise<IResponseLane> {
    const repository = getRepository(Lane)

    const top = repository.create({
      name: 'TOP',
      icons: [
        'iron',
        'silver',
        'gold',
        'platine',
        'diamond',
        'master',
        'grandmaster',
        'challenger',
      ],
    })

    await repository.save(top)

    const mid = repository.create({
      name: 'MID',
      icons: [
        'iron',
        'silver',
        'gold',
        'platine',
        'diamond',
        'master',
        'grandmaster',
        'challenger',
      ],
    })

    await repository.save(mid)

    const jg = repository.create({
      name: 'JUNGLE',
      icons: [
        'iron',
        'silver',
        'gold',
        'platine',
        'diamond',
        'master',
        'grandmaster',
        'challenger',
      ],
    })

    await repository.save(jg)

    const adc = repository.create({
      name: 'ADC',
      icons: [
        'iron',
        'silver',
        'gold',
        'platine',
        'diamond',
        'master',
        'grandmaster',
        'challenger',
      ],
    })

    await repository.save(adc)

    const sup = repository.create({
      name: 'SUPPORT',
      icons: [
        'iron',
        'silver',
        'gold',
        'platine',
        'diamond',
        'master',
        'grandmaster',
        'challenger',
      ],
    })

    await repository.save(sup)

    return {
      top,
      mid,
      jg,
      adc,
      sup,
    }
  }

  public async champion(data: IChampion): Promise<IChampionObject> {
    const repository = getRepository(Champion)

    const champion = repository.create({
      name: data.name,
      key: data.key,
      title: data.title,
      tags: data.tags,
      version: '10.10.3208608',
      image_full_url: 'http://localhost:3333',
      image_loading_url: 'http://localhost:3333',
      image_splash_url: 'http://localhost:3333',
      image_sprite_url: 'http://localhost:3333',
    })

    await repository.save(champion)

    return champion
  }
}

export default Factory
