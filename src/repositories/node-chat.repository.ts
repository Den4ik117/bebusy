import { Connection } from 'mysql2/promise'
import { INodeChat } from '../models'

type CreateNodeChat = Pick<INodeChat, 'chat_id' | 'user_id' | 'node_id'>
type UpdateNodeChat = Pick<INodeChat, 'chat_id' | 'user_id' | 'node_id'>

export interface NodeChatRepository {
    getNodeChatByChatIdAndUserId(chatId: number, userId: number): Promise<INodeChat | undefined>
    createNodeChat(nodeChat: CreateNodeChat): Promise<CreateNodeChat>
    updateNodeChat(nodeChat: UpdateNodeChat): Promise<UpdateNodeChat>
}

export const NewNodeChatRepository = async (connection: Connection): Promise<NodeChatRepository> => {
    const getNodeChatByChatIdAndUserId = async (chatId: number, userId: number): Promise<INodeChat | undefined> => {
        const [rows] = await connection.execute<INodeChat[]>(
            'SELECT * FROM `node_chat` WHERE chat_id = ? and user_id = ? LIMIT 1',
            [chatId, userId],
        )

        return rows[0]
    }

    const createNodeChat = async (nodeChat: CreateNodeChat): Promise<CreateNodeChat> => {
        await connection.execute(
            'INSERT INTO `node_chat` (chat_id, user_id, node_id) VALUES (?, ?, ?)',
            [nodeChat.chat_id, nodeChat.user_id, nodeChat.node_id],
        )

        return nodeChat
    }

    const updateNodeChat = async (nodeChat: UpdateNodeChat): Promise<UpdateNodeChat> => {
        await connection.execute(
            'UPDATE `node_chat` SET node_id = ? WHERE chat_id = ? AND user_id = ?',
            [nodeChat.node_id, nodeChat.chat_id, nodeChat.user_id],
        )

        return nodeChat
    }

    return {
        getNodeChatByChatIdAndUserId,
        createNodeChat,
        updateNodeChat,
    }
}
