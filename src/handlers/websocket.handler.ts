import { Service } from '../services'
import { CustomWebSocket, WebsocketMessage } from './index';

export interface WebSocketHandler {
    onConnection(ws: CustomWebSocket, message: WebsocketMessage): void
    onMessage(ws: CustomWebSocket, message: WebsocketMessage): void
}

export const NewWebSocketHandler = async (services: Service): Promise<WebSocketHandler> => {
    const onConnection = async (ws: CustomWebSocket, message: WebsocketMessage): Promise<void> => {
        if (message.event !== 'connection') return

        const session = await services.SessionService.getSessionByUuid(message.token)

        if (!session) {
            ws.send(JSON.stringify({
                error: 'Сессия истекла',
            }))

            return
        }

        const user = await services.UserService.getUserById(session.user_id)

        if (!user) {
            ws.send(JSON.stringify({
                error: 'User not found',
            }))

            return
        }

        ws.send(JSON.stringify({
            data: user,
        }))

        ws.user = user
    }

    const onMessage = async (ws: CustomWebSocket, message: WebsocketMessage): Promise<void> => {
        if (message.event !== 'message' || !ws.user) return

        await services.MessageService.createMessage({
            text: message.text,
            chat_id: message.chat_id,
            user_id: ws.user.id,
        }, ws.user)

        // const response = {
        //     event: 'message',
        //     data: createdMessage,
        // }
        //
        // ws.send(JSON.stringify(response))
    }

    return {
        onConnection,
        onMessage,
    }
}
