import { Connection } from 'mysql2/promise'
import { IUser } from '../models'

export interface UserRepository {
    getUserByToken(token: string): Promise<IUser | undefined>
    getUsersByChatId(chatId: number): Promise<IUser[]>
}

export const NewUserRepository = async (connection: Connection): Promise<UserRepository> => {
    const getUserByToken = async (token: string): Promise<IUser | undefined> => {
        const [rows] = await connection.execute<IUser[]>('SELECT * FROM `users` WHERE token = ? LIMIT 1', [token])

        return rows[0]
    }

    const getUsersByChatId = async (chatId: number): Promise<IUser[]> => {
        const [rows] = await connection.execute<IUser[]>(
            'SELECT u.* FROM chat_user cu INNER JOIN users u ON u.id = cu.user_id WHERE cu.chat_id = ?',
            [chatId],
        )

        return rows
    }

    return {
        getUserByToken,
        getUsersByChatId,
    }
}
