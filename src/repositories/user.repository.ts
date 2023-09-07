import { Connection } from 'mysql2/promise'
import { IUser } from '../models/user'

export interface UserRepository {
    getUserByToken(token: string): Promise<IUser | undefined>
}

export const NewUserRepository = async (connection: Connection): Promise<UserRepository> => {
    const getUserByToken = async (token: string): Promise<IUser | undefined> => {
        const [rows] = await connection.execute<IUser[]>('SELECT * FROM `users` WHERE token = ? LIMIT 1', [token])

        return rows[0]
    }

    return {
        getUserByToken,
    }
}
