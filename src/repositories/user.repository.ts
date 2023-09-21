import { Connection } from 'mysql2/promise'
import { IUser } from '../models'

export interface UserRepository {
    getUserByToken(token: string): Promise<IUser | undefined>
    getUsersByChatId(chatId: number): Promise<IUser[]>
    getUserByEmail(email: string): Promise<IUser | undefined>
    getUserById(id: number): Promise<IUser | undefined>
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

    const getUserByEmail = async (email: string): Promise<IUser | undefined> => {
        const [rows] = await connection.execute<IUser[]>(
            'SELECT * FROM users WHERE email = ? LIMIT 1',
            [email],
        )

        return rows[0]
    }

    const getUserById = async (id: number): Promise<IUser | undefined> => {
        const [rows] = await connection.execute<IUser[]>(
            'SELECT * FROM users WHERE id = ? LIMIT 1',
            [id],
        )

        return rows[0]
    }

    return {
        getUserByToken,
        getUsersByChatId,
        getUserByEmail,
        getUserById,
    }
}
