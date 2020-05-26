import User from '../App/Models/User'
import Champion from '../App/Models/Champion'
import IUser from '../App/Interfaces/IUser'
import { getRepository } from 'typeorm'
import faker from 'faker'
import Lane from '../App/Models/Lane'
import { ILaneObject } from '../App/Interfaces/ILane'
import { IChampionObject } from '../App/Interfaces/IChampion'

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

  public async manyUsers(value: number, data: IUser = {}): Promise<void> {
    const repository = getRepository(User)
    const lane = await this.lanes()

    for (let i = 1; i <= value; i++) {
      const user = repository.create({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        champions:
      })

      // const user = userRepository.create({
      //   name: faker.name.firstName(),
      //   email: faker.internet.email(),
      //   password: faker.internet.password(),
      //   champions: faker.name.firstName(),
      //   lanes: lane,
      //   avatar: faker.internet.avatar(),
      //   media: faker.internet.avatar(),
      //   like: '1',
      //   dislike: '1',
      //   ...data,
      // })

      await userRepository.save(user)
    }
  }

  public async lanes(): Promise<ILaneObject> {
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

    return mid
  }

  public async champion(): Promise<IChampionObject> {
    const repository = getRepository(Champion)


  }
}

export default Factory
