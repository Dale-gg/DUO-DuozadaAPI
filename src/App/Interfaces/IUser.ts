import { IChampionObject } from './IChampion'
import { ILaneObject } from './ILane'

export default interface IUser {
  name?: string
  email?: string
  password?: string
  avatar?: string
  champions?: IChampionObject[]
  lanes?: ILaneObject[]
  media?: string
  like?: string
  dislike?: string
  status?: boolean
}

export interface IUserObject {
  id: string
  name: string
  email: string
  password: string
  avatar: string
  champions: IChampionObject[]
  lanes: ILaneObject[]
  media: string
  like: string
  dislike: string
  status: boolean
  created_at: Date
  updated_at: Date
}
