import { Repository } from '../repositories'
import {IAction, IMessage, IUser} from '../models'
import { app, getCurrentDatetime } from '../utils'
import axios from 'axios'
import {CustomWebSocket} from "../handlers";

export interface MessageService {
    createMessage(message: CreateIMessage, user: IUser): Promise<IMessage>
}

interface CreateIMessage {
    text: string
    chat_id: number
    user_id: number
    actions?: IAction[][]
    resume_id?: number
}

export const NewMessageService = async (repositories: Repository): Promise<MessageService> => {
    const createMessage = async (message: CreateIMessage, user: IUser): Promise<IMessage> => {
        const createdMessage  = await repositories.MessageRepository.createMessage({
            text: message.text,
            user_id: message.user_id,
            chat_id: message.chat_id,
            resume_id: message.resume_id,
            actions: message.actions,
            updated_at: getCurrentDatetime(),
            created_at: getCurrentDatetime(),
        })

        const resumeId = createdMessage.resume_id

        if (resumeId) {
            createdMessage.resume = await repositories.ResumeRepository.getResumeById(resumeId)
        }

        createdMessage.user = user

        const users = await repositories.UserRepository.getUsersByChatId(createdMessage.chat_id)

        if (app.websocket) {
            const userIds = users.map((user) => user.id)

            app.websocket.clients.forEach((ws: CustomWebSocket) => {
                if (!ws.user) return

                if (userIds.includes(ws.user.id)) {
                    const data = {
                        event: 'message',
                        data: createdMessage,
                    }

                    ws.send(JSON.stringify(data))
                }
            })
        }

        if (!user.is_bot) {
            for (let i = 0; i < users.length; i++) {
                const user = users[i]

                if (!user.is_bot) continue

                const update = await repositories.UpdateRepository.createUpdate({
                    message_id: createdMessage.id,
                    user_id: user.id,
                })

                if (!user.webhook_url) continue

                update.message = createdMessage

                const response = await axios.post(user.webhook_url, {
                    data: update,
                })

                console.log(`Запрос отправлен боту, статус ответа: ${response.status}`)
            }
        }

        return createdMessage
    }

    return {
        createMessage,
    }
}
