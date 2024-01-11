import { Repository } from '../repositories'
import {ChatType, IChat, IUser} from '../models'
import {v4 as generateUuid} from "uuid";
import {getCurrentDatetime} from "../utils";
import {IChatIntersect} from "../models/chat";

export interface ChatService {
    getChatsByUserId(id: number): Promise<IChat[]>
    createChat(name: string, type: ChatType, userIds: number[]): Promise<IChat>
    getChatIntersects(firstUserId: number, secondUserId: number): Promise<IChatIntersect[]>
    getChatById(id: number): Promise<IChat>
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

            if (userIds.length > 0) {
                const users = await repositories.UserRepository.getUsersByIds(userIds)

                const usersObj: {
                    [key: number]: IUser
                } = {}

                for (let j = 0; j < users.length; j++) {
                    usersObj[users[j].id] = users[j]
                }

                for (let j = 0; j < messages.length; j++) {
                    const userId = messages[j].user_id
                    const resumeId = messages[j].resume_id

                    if (resumeId) {
                        messages[j].resume = await repositories.ResumeRepository.getResumeById(resumeId)
                    }

                    if (!userId) continue

                    messages[j].user = usersObj[userId]
                }
            }

            chats[i].messages = messages

            if (chats[i].type === 'PRIVATE') {
                const chatUsers = await repositories.UserRepository.getUsersByChatId(chats[i].id)

                for (let j = 0; j < chatUsers.length; j++) {
                    if (chatUsers[j].id === id) continue

                    chats[i].name = chatUsers[j].last_name + ' ' + chatUsers[j].first_name
                }
            }
        }

        return chats
    }

    const createChat = async (name: string, type: ChatType, userIds: number[]): Promise<IChat> => {
        const chat = await repositories.ChatRepository.createChat({
            uuid: generateUuid(),
            name: name,
            type: type,
            created_at: getCurrentDatetime(),
            updated_at: getCurrentDatetime(),
        }, userIds)

        await repositories.MessageRepository.createMessage({
            text: 'Чат создан',
            user_id: null,
            chat_id: chat.id,
            resume_id: null,
            updated_at: getCurrentDatetime(),
            created_at: getCurrentDatetime(),
        })

        return chat
    }

    const getChatIntersects = async (firstUserId: number, secondUserId: number): Promise<IChatIntersect[]> => {
        return await repositories.ChatRepository.getChatIntersects(firstUserId, secondUserId)
    }

    const getChatById = async (id: number): Promise<IChat> => {
        return await repositories.ChatRepository.getChatById(id)
    }

    return {
        getChatsByUserId,
        createChat,
        getChatIntersects,
        getChatById,
    }
}
