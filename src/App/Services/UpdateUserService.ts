/* eslint-disable prettier/prettier */
import { getRepository } from 'typeorm'

import User from '../Models/User'
import AppError from '../Errors/AppError'

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
        media }: IRequest, id: string): Promise<User> {
 
        const userRepository = getRepository(User)
        let user = await userRepository.findOne(id)
        if (!user) {
            throw new AppError('User not found')
        }

        user.name = name
        user.email = email
        user.password = password
        user.avatar = avatar
        user.champions = champions
        user.lanes = lanes
        user.media = media

        await userRepository.save(user)
        
        return user

        /*await getConnection()
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
            .execute()*/

        
    }
}

export default UpdateUserService
