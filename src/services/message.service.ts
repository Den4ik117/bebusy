import { Repository } from '../repositories'
import { IMessage, IUser } from '../models'
import { app, getCurrentDatetime } from '../utils'
import axios from 'axios'
import {CustomWebSocket} from "../handlers";

export interface MessageService {
    createMessage(message: Pick<IMessage, 'text' | 'chat_id' | 'user_id'>, user: IUser): Promise<IMessage>
}

export const NewMessageService = async (repositories: Repository): Promise<MessageService> => {
    const createMessage = async (message: Pick<IMessage, "text" | "chat_id" | "user_id">, user: IUser): Promise<IMessage> => {
        const createdMessage  = await repositories.MessageRepository.createMessage({
            text: message.text,
            user_id: message.user_id,
            chat_id: message.chat_id,
            updated_at: getCurrentDatetime(),
            created_at: getCurrentDatetime(),
        })

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
