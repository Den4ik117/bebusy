import { Connection } from 'mysql2/promise'
import { IMessage } from '../models'
import {getShortDate} from "../utils";

export interface MessageRepository {
    createMessage(message: Omit<IMessage, 'id'>): Promise<IMessage>
    getMessagesByChatId(id: number): Promise<IMessage[]>
}

export const NewMessageRepository = async (connection: Connection): Promise<MessageRepository> => {
    const createMessage = async (message: Omit<IMessage, 'id'>): Promise<IMessage> => {
        await connection.execute(
            'INSERT INTO `messages` (text, user_id, chat_id, resume_id, actions, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [message.text, message.user_id || null, message.chat_id, message.resume_id || null, message.actions ? JSON.stringify(message.actions) : null, message.created_at, message.updated_at],
        )

        const [rows] = await connection.execute<IMessage[]>('SELECT * FROM `messages` WHERE `id` = LAST_INSERT_ID() LIMIT 1')

        for (let i = 0; i < rows.length; i++) {
            rows[i].human_created_at = getShortDate(rows[i].created_at)
        }

        return rows[0]
    }

    const getMessagesByChatId = async (id: number): Promise<IMessage[]> => {
        const [rows] = await connection.execute<IMessage[]>(
            'SELECT * FROM `messages` WHERE chat_id = ?',
            [id],
        )

        for (let i = 0; i < rows.length; i++) {
            rows[i].human_created_at = getShortDate(rows[i].created_at)
        }

        return rows
    }

    return {
        createMessage,
        getMessagesByChatId,
    }
}
