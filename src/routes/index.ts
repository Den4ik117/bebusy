import { Router, IRouter } from 'express'
import { Handler } from '../handlers'
import { WebSocketRouter, IWebSocketRouter } from './websockets';

interface Routes {
    router: IRouter,
    webSocketRouter: IWebSocketRouter,
}

export const createRouter = async (handlers: Handler): Promise<Routes> => {
    const router = Router()
    const webSocketRouter = WebSocketRouter()

    router.get('/', handlers.UserHandler.getCurrentUser)

    router.post('/bots/:token/sendMessage', handlers.BotHandler.sendMessage)

    webSocketRouter.receive('connection', handlers.WebSocketHandler.onConnection)
    webSocketRouter.receive('message', handlers.WebSocketHandler.onMessage)

    return {
        router,
        webSocketRouter,
    }
}

export {
    IWebSocketRouter,
}
