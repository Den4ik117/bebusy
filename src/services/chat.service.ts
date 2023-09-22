import { Repository } from '../repositories'
import {IChat, IUser} from '../models'

export interface ChatService {
    getChatsByUserId(id: number): Promise<IChat[]>
}

export const NewChatService = async (repositories: Repository): Promise<ChatService> => {
    const getChatsByUserId = async (id: number): Promise<IChat[]> => {
        const chats = await repositories.ChatRepository.getChatsByUserId(id)

        for (let i = 0; i < chats.length; i++) {
            const userIds: number[] = []

            const messages = await repositories.MessageRepository.getMessagesByChatId(chats[i].id)

            for (let j = 0; j < messages.length; j++) {
                const id = messages[j].user_id

                id && !userIds.includes(id) && userIds.push(id)
            }

            const users = await repositories.UserRepository.getUsersByIds(userIds)

            const usersObj: {
                [key: number]: IUser
            } = {}

            for (let j = 0; j < users.length; j++) {
                usersObj[users[j].id] = users[j]
            }

            for (let j = 0; j < messages.length; j++) {
                const userId = messages[j].user_id

                if (!userId) continue

                messages[j].user = usersObj[userId]
            }

            chats[i].messages = messages
        }

        return chats
    }

    return {
        getChatsByUserId,
    }
}
