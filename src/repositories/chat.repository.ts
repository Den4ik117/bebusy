import { Connection } from 'mysql2/promise'
import { ChatType, IChat } from '../models'
import { IChatIntersect } from '../models/chat'

interface CreateChat {
    uuid: string
    name: string
    type: ChatType
    created_at: string
    updated_at: string
}

export interface ChatRepository {
    getChatsByUserId(id: number): Promise<IChat[]>
    createChat(chat: CreateChat, userIds: number[]): Promise<IChat>
    getChatIntersects(firstUserId: number, secondUserId: number): Promise<IChatIntersect[]>
    getChatById(id: number): Promise<IChat>
}

export const NewChatRepository = async (connection: Connection): Promise<ChatRepository> => {
    const getChatsByUserId = async (id: number): Promise<IChat[]> => {
        const [rows] = await connection.execute<IChat[]>(
            'SELECT c.* FROM chat_user cu INNER JOIN chats c ON c.id = cu.chat_id WHERE cu.user_id = ?',
            [id],
        )

        return rows
    }

    const createChat = async (chat: CreateChat, userIds: number[]): Promise<IChat> => {
        await connection.execute(
            'INSERT INTO `chats` (uuid, name, type, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
            [chat.uuid, chat.name, chat.type, chat.created_at, chat.updated_at],
        )

        const [row] = await connection.execute<IChat[]>(
            'SELECT * FROM `chats` WHERE id = LAST_INSERT_ID()',
        )

        const createdChat = row[0]

        for (let i = 0; i < userIds.length; i++) {
            await connection.execute(
                'INSERT INTO `chat_user` (chat_id, user_id) VALUES (?, ?)',
                [createdChat.id, userIds[i]],
            )
        }

        return createdChat
    }

    const getChatIntersects = async (firstUserId: number, secondUserId: number): Promise<IChatIntersect[]> => {
        const [row] = await connection.execute<IChatIntersect[]>(
            `SELECT cu.chat_id FROM chat_user cu JOIN chats c on cu.chat_id = c.id WHERE cu.user_id = ? AND c.type = 'PRIVATE' INTERSECT SELECT cu.chat_id FROM chat_user cu JOIN chats c on cu.chat_id = c.id WHERE cu.user_id = ? AND c.type = 'PRIVATE'`,
            [firstUserId, secondUserId],
        )

        return row
    }

    const getChatById = async (id: number): Promise<IChat> => {
        const [row] = await connection.execute<IChat[]>(
            `SELECT * FROM chats WHERE id = ? LIMIT 1`,
            [id],
        )

        return row[0]
    }

    return {
        getChatsByUserId,
        createChat,
        getChatIntersects,
        getChatById,
    }
}
