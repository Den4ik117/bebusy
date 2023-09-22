import { Connection } from 'mysql2/promise'
import { IChat } from '../models'

export interface ChatRepository {
    getChatsByUserId(id: number): Promise<IChat[]>
}

export const NewChatRepository = async (connection: Connection): Promise<ChatRepository> => {
    const getChatsByUserId = async (id: number): Promise<IChat[]> => {
        const [rows] = await connection.execute<IChat[]>(
            'SELECT c.* FROM chat_user cu INNER JOIN chats c ON c.id = cu.chat_id WHERE cu.user_id = ?',
            [id],
        )

        return rows
    }

    return {
        getChatsByUserId,
    }
}
