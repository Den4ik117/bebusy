import { Router, IRouter } from 'express'
import { Handler } from '../handlers'
import { WebSocketRouter, IWebSocketRouter } from './websockets'
import fs from 'fs'
import path from 'path'

interface Routes {
    router: IRouter,
    webSocketRouter: IWebSocketRouter,
}

export const createRouter = async (handlers: Handler): Promise<Routes> => {
    const router = Router()
    const webSocketRouter = WebSocketRouter()

    router.get('/',  async (req, res) => {
        const manifest = fs.readFileSync(`${path.resolve()}/public/manifest.json`)

        // res.render('index', { manifest: JSON.parse(manifest.toString()) })
        res.render('auth', { manifest: JSON.parse(manifest.toString()) })
    })

    router.get('/login', handlers.AuthHandler.checkAuth, handlers.AuthHandler.showLoginPage)
    router.post('/login', handlers.AuthHandler.login)

    router.get('/oauth/redirect', handlers.AuthHandler.redirect)
    router.get('/oauth/callback', handlers.AuthHandler.callback)

    router.get('/api/resumes', handlers.ResumeHandler.getResumes)
    router.post('/api/resumes/:uuid/publish', handlers.ResumeHandler.publishResume)

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
