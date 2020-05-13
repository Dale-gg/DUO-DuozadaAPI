/* eslint-disable prettier/prettier */
import { getConnection } from 'typeorm'
import User from '../Models/User'

class DeleteUserService {
    public async execute(id: string): Promise<void> {
        await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({ status: false })
            .where('id = :id', { id })
            .execute()
    }
}

export default DeleteUserService
