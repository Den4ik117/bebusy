import { Connection } from 'mysql2/promise'
import { ChatType, IChat } from '../models'

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

    return {
        getChatsByUserId,
        createChat,
    }
}
