/* eslint-disable prettier/prettier */
import { getConnection } from 'typeorm'

import User from '../Models/User'

interface IRequest {
    name: string
    email: string
    password: string
    avatar: string
    champions: string
    lanes: string
    media: string
}

class UpdateUserService {
    public async execute({ 
        name, 
        email, 
        password, 
        avatar, 
        champions, 
        lanes, 
        media }: IRequest, id: string): Promise<void> {
 
        await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({
                name,
                email,
                password,
                avatar,
                champions,
                lanes,
                media
            })
            .where('id = :id', { id })
            .execute()
    }
}

export default UpdateUserService
