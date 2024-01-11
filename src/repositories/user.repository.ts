import { Connection } from 'mysql2/promise'
import { IUser } from '../models'

export interface UserRepository {
    getUserByToken(token: string): Promise<IUser | undefined>
    getUsersByChatId(chatId: number): Promise<IUser[]>
    getUserByEmail(email: string): Promise<IUser | undefined>
    getUserById(id: number): Promise<IUser | undefined>
    getUserByForeignId(foreignId: number): Promise<IUser | undefined>
    createUser(user: Omit<IUser, 'id' | 'constructor'>): Promise<IUser>
    updateUser(user: Pick<IUser, 'id' | 'first_name' | 'middle_name' | 'last_name' | 'email' | 'data'>): Promise<IUser>
    getUsersByIds(ids: number[]): Promise<IUser[]>
    getUsersExceptSelfAndBots(selfIf: number): Promise<IUser[]>
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

    const getUserByForeignId = async (foreignId: number): Promise<IUser | undefined> => {
        const [rows] = await connection.execute<IUser[]>(
            'SELECT * FROM users WHERE foreign_id = ? LIMIT 1',
            [foreignId],
        )

        return rows[0]
    }

    const createUser = async (user: Omit<IUser, 'id' | 'constructor'>): Promise<IUser> => {
        await connection.execute(
            'INSERT INTO `users` (uuid, foreign_id, first_name, middle_name, last_name, email, is_bot, data, token, webhook_url, remember_token, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [user.uuid || null, user.foreign_id || null, user.foreign_id || null, user.middle_name || null, user.last_name || null, user.email || null, user.is_bot || false, user.data || null, user.token || null, user.webhook_url || null, user.remember_token || null, user.created_at || null, user.updated_at || null],
        )

        const [rows] = await connection.execute<IUser[]>(
            'SELECT * FROM `users` WHERE id = LAST_INSERT_ID() LIMIT 1',
        )

        return rows[0]
    }

    const updateUser = async (user: Pick<IUser, 'id' | 'first_name' | 'middle_name' | 'last_name' | 'email' | 'data'>): Promise<IUser> => {
        await connection.execute(
            'UPDATE `users` SET first_name = ?, middle_name = ?, last_name = ?, email = ?, data = ? WHERE id = ?',
            [user.first_name || null, user.middle_name || null, user.last_name || null, user.email || null, user.data || null, user.id || null],
        )

        const [rows] = await connection.execute<IUser[]>(
            'SELECT * FROM `users` WHERE id = ? LIMIT 1',
            [user.id],
        )

        return rows[0]
    }

    const getUsersByIds = async (ids: number[]): Promise<IUser[]> => {
        if (ids.length === 0) return []

        const [rows] = await connection.execute<IUser[]>(
            `SELECT *, CONCAT(last_name, ' ', first_name) as full_name FROM \`users\` WHERE id IN (${ids.join(',')})`,
        )

        return rows
    }

    const getUsersExceptSelfAndBots = async (selfIf: number): Promise<IUser[]> => {
        const [rows] = await connection.execute<IUser[]>(
            `SELECT *, CONCAT(last_name, ' ', first_name) as full_name FROM users WHERE id != ? AND is_bot = 0`,
            [selfIf],
        )

        return rows
    }

    return {
        getUserByToken,
        getUsersByChatId,
        getUserByEmail,
        getUserById,
        getUserByForeignId,
        createUser,
        updateUser,
        getUsersByIds,
        getUsersExceptSelfAndBots,
    }
}
