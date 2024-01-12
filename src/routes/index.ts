import { Router, IRouter } from 'express'
import { Handler } from '../handlers'
import { WebSocketRouter, IWebSocketRouter } from './websockets'
import { ResumeBotRouter } from './nodes'

interface Routes {
    router: IRouter,
    webSocketRouter: IWebSocketRouter,
}

export const createRouter = async (handlers: Handler): Promise<Routes> => {
    const router = Router()
    const webSocketRouter = WebSocketRouter()
    const resumeBotHandler = ResumeBotRouter(handlers)

    router.get('/',  handlers.AuthHandler.showMainPage)
    router.get('/_/:uuid',  handlers.AuthHandler.showMainPage)

    router.get('/oauth/redirect', handlers.AuthHandler.redirect)
    router.get('/oauth/callback', handlers.AuthHandler.callback)
    router.get('/logout', handlers.AuthHandler.checkAuth, handlers.AuthHandler.logout)

    router.get('/api/resumes', handlers.AuthHandler.checkAuth, handlers.ResumeHandler.getResumes)
    router.post('/api/resumes/:uuid/publish', handlers.AuthHandler.checkAuth, handlers.ResumeHandler.publishResume)

    router.get('/api/me', handlers.AuthHandler.checkAuth, handlers.UserHandler.getCurrentUser)
    router.patch('/api/me', handlers.AuthHandler.checkAuth, handlers.UserHandler.updateCurrentUser)
    // router.get('/api/token', handlers.AuthHandler.checkAuth, handlers.UserHandler.getToken)
    router.get('/api/chats', handlers.AuthHandler.checkAuth, handlers.ChatHandler.getMyChats)
    router.post('/api/chats', handlers.AuthHandler.checkAuth, handlers.ChatHandler.getOrCreateChat)

    router.get('/api/directions', handlers.AuthHandler.checkAuth, handlers.DirectionHandler.getDirections)

    router.post('/api/requests', handlers.AuthHandler.checkAuth, handlers.RequestHandler.createRequest)

    router.get('/api/mentors', handlers.AuthHandler.checkAuth, handlers.MentorHandler.getActiveMentors)

    router.get('/api/users', handlers.AuthHandler.checkAuth, handlers.UserHandler.getUsers)

    router.post('/bots/:token/sendMessage', handlers.BotHandler.sendMessage)

    // router.post('/bots/callback', handlers.ResumeBotHandler.receiveUpdate)
    router.post('/bots/callback', resumeBotHandler)

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
