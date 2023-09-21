import { NextFunction, Request, Response } from 'express'
import { Service } from '../services'

export interface AuthHandler {
    showLoginPage(req: Request, res: Response): Promise<void>
    login(req: Request, res: Response): Promise<void>
    checkAuth(req: Request, res: Response, next: NextFunction): Promise<void>
}

export const NewAuthHandler = async (service: Service): Promise<AuthHandler> => {
    const showLoginPage = async (req: Request, res: Response) => {
        res.render('login')
    }

    const login = async (req: Request, res: Response) => {
        const { login } = req.body

        if (!login) {
            res.status(403).json({
                message: 'Не заполнены данные: login',
            })
            return
        }

        const session = await service.SessionService.authenticate(login)

        if (!session) {
            res.status(403).json({
                message: 'Не удалось авторизоваться',
            })
            return
        }

        res.cookie('auth-session', session.uuid)
        res.redirect('/login')
    }

    const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
        const sessionUuid = req.cookies['auth-session']

        if (!sessionUuid) {
            res.status(403).json({
                message: 'Вы не авторизованы',
            }).end()
            return
        }

        const session = await service.SessionService.getSessionByUuid(sessionUuid)

        if (!session) {
            res.status(403).json({
                message: 'Сессия истекла',
            }).end()
            return
        }

        req.body.user = await service.UserService.getUserById(session.user_id)

        return next()
    }

    return {
        showLoginPage,
        login,
        checkAuth,
    }
}
