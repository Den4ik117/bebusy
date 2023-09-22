import { Connection } from 'mysql2/promise'
import { IMessage } from '../models'

export interface MessageRepository {
    createMessage(message: Omit<IMessage, 'id'>): Promise<IMessage>
    getMessagesByChatId(id: number): Promise<IMessage[]>
}

export const NewMessageRepository = async (connection: Connection): Promise<MessageRepository> => {
    const createMessage = async (message: Omit<IMessage, 'id'>): Promise<IMessage> => {
        await connection.execute(
            'INSERT INTO `messages` (text, user_id, chat_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
            [message.text, message.user_id, message.chat_id, message.created_at, message.updated_at],
        )

        const [rows] = await connection.execute<IMessage[]>('SELECT * FROM `messages` WHERE `id` = LAST_INSERT_ID() LIMIT 1')

        return rows[0]
    }

    const getMessagesByChatId = async (id: number): Promise<IMessage[]> => {
        const [rows] = await connection.execute<IMessage[]>(
            'SELECT * FROM `messages` WHERE chat_id = ?',
            [id],
        )

        return rows
    }

    return {
        createMessage,
        getMessagesByChatId,
    }
}
