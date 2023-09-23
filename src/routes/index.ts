import { Router, IRouter } from 'express'
import { Handler } from '../handlers'
import { WebSocketRouter, IWebSocketRouter } from './websockets'

interface Routes {
    router: IRouter,
    webSocketRouter: IWebSocketRouter,
}

export const createRouter = async (handlers: Handler): Promise<Routes> => {
    const router = Router()
    const webSocketRouter = WebSocketRouter()

    router.get('/',  handlers.AuthHandler.showMainPage)
    router.get('/_/:uuid',  handlers.AuthHandler.showMainPage)

    router.get('/oauth/redirect', handlers.AuthHandler.redirect)
    router.get('/oauth/callback', handlers.AuthHandler.callback)

    router.get('/api/resumes', handlers.ResumeHandler.getResumes)
    router.post('/api/resumes/:uuid/publish', handlers.ResumeHandler.publishResume)

    router.get('/api/me', handlers.AuthHandler.checkAuth, handlers.UserHandler.getCurrentUser)
    router.get('/api/token', handlers.AuthHandler.checkAuth, handlers.UserHandler.getToken)
    router.get('/api/chats', handlers.AuthHandler.checkAuth, handlers.ChatHandler.getMyChats)

    router.post('/bots/:token/sendMessage', handlers.BotHandler.sendMessage)

    router.post('/bots/callback', handlers.ResumeBotHandler.receiveUpdate)

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
