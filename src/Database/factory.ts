import User from '../App/Models/User'
import { getRepository } from 'typeorm'
import faker from 'faker'

interface IUser {
  champions?: string
}

class Factory {
  public async user(data: IUser): Promise<void> {
    const userRepository = getRepository(User)
    const user = await userRepository.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      champions: data.champions,
      lanes: 'Offlane',
      avatar: 'teste.png',
      media: 'teste.mp4',
    })
    await userRepository.save(user)
  }

  public async manyUsers(value: number): Promise<void> {
    const userRepository = getRepository(User)

    for (let i = 0; i < value; i++) {
      const user = await userRepository.create({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        champions: faker.name.firstName(),
        lanes: 'mid',
        avatar: faker.internet.avatar(),
        media: faker.internet.avatar(),
      })
      await userRepository.save(user)
    }
  }
}

export default Factory
