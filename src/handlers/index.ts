import { Service } from '../services'
import { Server } from 'http'
import { WebSocketServer, WebSocket } from 'ws'
import { NewUserHandler, UserHandler } from './user.handler'
import { IUser } from '../models/user'

export interface Handler {
    UserHandler: UserHandler
}

export interface ConnectionWebsocketMessage {
    event: 'connection'
    token: string
}

export interface CustomWebSocket extends WebSocket {
    user?: IUser
}

export type WebsocketMessage = {
    id: number
    event: 'connection'
    token: string
} | {
    id: number
    event: 'message'
    text: string
}

export const createHandlers = async (service: Service): Promise<Handler> => ({
    UserHandler: await NewUserHandler(service),
})

export const createWebsocketHandlers = async (server: Server, service: Service) => {
    const websocket = new WebSocketServer({
        server: server,
    })

    websocket.on('connection', (ws: CustomWebSocket) => {
        ws.on('message', async (data) => {
            const message: WebsocketMessage = JSON.parse(data.toString())

            switch (message.event) {
                case 'connection':
                    const user = await service.UserService.getUserByToken(message.token)

                    if (!user) {
                        ws.send(JSON.stringify({
                            error: 'User not found',
                        }))
                        break
                    }

                    ws.send(JSON.stringify({
                        data: user,
                    }))

                    ws.user = user

                    break
                case 'message':
                    
                    ws.send(JSON.stringify({
                        ...message,
                        user: ws.user,
                    }))
                    break
            }
        })
    })
}

