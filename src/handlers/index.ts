import { Service } from '../services'
import { Server } from 'http'
import { WebSocketServer, WebSocket, Server as IWebSocketServer } from 'ws'
import { NewUserHandler, UserHandler } from './user.handler'
import { IUser } from '../models'
import { IWebSocketRouter } from '../routes'
import { NewWebSocketHandler, WebSocketHandler } from './websocket.handler'
import { NewBotHandler, BotHandler } from './bot.handler'
import { NewResumeHandler, ResumeHandler } from './resume.handler'
import { NewAuthHandler, AuthHandler } from './auth.handler'
import { NewChatHandler, ChatHandler } from './chat.handler'
import { NewResumeBotHandler, ResumeBotHandler } from './resume-bot.handler'
import { NewDirectionHandler, DirectionHandler } from './direction.handler'
import { NewRequestHandler, RequestHandler } from './request.handler'
import { NewMentorHandler, MentorHandler } from './mentor.handler'
import { app } from '../utils'

export interface Handler {
    UserHandler: UserHandler
    WebSocketHandler: WebSocketHandler
    BotHandler: BotHandler
    ResumeHandler: ResumeHandler
    AuthHandler: AuthHandler
    ChatHandler: ChatHandler
    ResumeBotHandler: ResumeBotHandler
    DirectionHandler: DirectionHandler
    RequestHandler: RequestHandler
    MentorHandler: MentorHandler
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
    chat_id: number
}

export const createHandlers = async (service: Service): Promise<Handler> => ({
    UserHandler: await NewUserHandler(service),
    WebSocketHandler: await NewWebSocketHandler(service),
    BotHandler: await NewBotHandler(service),
    ResumeHandler: await NewResumeHandler(service),
    AuthHandler: await NewAuthHandler(service),
    ChatHandler: await NewChatHandler(service),
    ResumeBotHandler: await NewResumeBotHandler(service),
    DirectionHandler: await NewDirectionHandler(service),
    RequestHandler: await NewRequestHandler(service),
    MentorHandler: await NewMentorHandler(service),
})

export const createWebsocketHandlers = async (server: Server, webSocketsRouter: IWebSocketRouter): Promise<IWebSocketServer> => {
    const websocket = new WebSocketServer({
        server: server,
    })

    websocket.on('connection', (ws: CustomWebSocket) => {
        ws.on('message', async (data) => {
            const message: WebsocketMessage = JSON.parse(data.toString())

            webSocketsRouter.routes[message.event](ws, message)
        })
    })

    app.websocket = websocket

    return websocket
}
