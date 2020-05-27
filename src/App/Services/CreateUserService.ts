/* eslint-disable prettier/prettier */
import { getRepository } from 'typeorm'

import User from '../Models/User'
import AppError from '../Errors/AppError'
import Champion from '../Models/Champion'

interface IRequest {
  name: string
  email: string
  password: string
  avatar: string
  champions: IRChamp
  lanes: IRLane
  media: string
}

interface IRChamp {
  championKey1: number
  championKey2: number
  championKey3: number
}

interface IRLane {
  laneId1: number
  laneId2: number
  laneId3: number
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    avatar,
    champions,
    lanes,
    media,
  }: IRequest): Promise<User> {
    const repository = getRepository(User)

    const checkUsersExists = await repository.findOne({
      where: { email },
    })

    if (checkUsersExists) {
      throw new AppError('Email address already used.')
    }

    const championsFounded = await this.findChampions(champions)
    const lanesFounded = await this.findLanes(lanes)

    const user = repository.create({
      name: name,
      email: email,
      password: password,
      avatar: avatar,
      champions: championsFounded,
      lanes: lanesFounded,
      media: media,
    })

    await repository.save(user)

    return user
  }

  private async findChampions({ championKey1, championKey2, championKey3 }: IRChamp): Promise<[] | any> {
    const repository = getRepository(Champion)

    const champion1 = await repository.findOne({
      where: {
        key: championKey1,
      }
    })

    const champion2 = await repository.findOne({
      where: {
        key: championKey2,
      }
    })

    const champion3 = await repository.findOne({
      where: {
        key: championKey3,
      }
    })

    return [
      champion1 || null,
      champion2 || null,
      champion3 || null
    ]
  }

  private async findLanes({ laneId1, laneId2, laneId3 }: IRLane): Promise<[] | any> {
    const repository = getRepository(Champion)

    const lane1 = await repository.findOne({
      where: {
        id: laneId1,
      }
    })

    const lane2 = await repository.findOne({
      where: {
        id: laneId2,
      }
    })

    const lane3 = await repository.findOne({
      where: {
        id: laneId3,
      }
    })

    return [
      lane1 || null,
      lane2 || null,
      lane3 || null
    ]
  }
}

export default CreateUserService
