import { NextFunction, Request, Response } from 'express'
import { Service } from '../services'
import fs from 'fs'
import path from 'path'

export interface AuthHandler {
    showMainPage(req: Request, res: Response): Promise<void>
    checkAuth(req: Request, res: Response, next: NextFunction): Promise<void>
    redirect(req: Request, res: Response): Promise<void>
    callback(req: Request, res: Response): Promise<void>
    logout(req: Request, res: Response): Promise<void>
}

export const NewAuthHandler = async (service: Service): Promise<AuthHandler> => {
    const showMainPage = async (req: Request, res: Response) => {
        const sessionUuid = req.cookies['auth-session']

        let manifest;

        if (process.env.NODE_ENV === 'production') {
            manifest = fs.readFileSync(`${path.resolve()}/public/manifest.json`)
            manifest = JSON.parse(manifest.toString())
        }

        if (!sessionUuid) {
            res.render('index', {
                manifest: manifest,
            })
            return
        }

        const session = await service.SessionService.getSessionByUuid(sessionUuid)

        if (!session) {
            res.render('index', {
                manifest: manifest,
            })
            return
        }

        // req.body.user = await service.UserService.getUserById(session.user_id)

        res.render('auth', {
            manifest: manifest,
        })
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

    const redirect = async (req: Request, res: Response): Promise<void> => {
        if (process.env.NODE_ENV === 'development') {
            const session = await service.SessionService.getDevelopmentSession()

            if (session) {
                res.cookie('auth-session', session.uuid, {
                    expires: new Date(session.expires_at),
                })
                res.redirect('/')
                return
            }
        }

        const params = new URLSearchParams({
            response_type: 'code',
            client_id: <string> process.env.HH_CLIENT_ID,
            redirect_uri: `${process.env.APP_URL}/oauth/callback`,
        })

        const url = `https://hh.ru/oauth/authorize?${params.toString()}`

        return res.redirect(url)
    }

    const callback = async (req: Request, res: Response): Promise<void> => {
        const { code } = req.query

        if (!code) {
            res.status(403).json({
                message: 'Нет кода',
            })
            return
        }

        const session = await service.SessionService.callback(<string> code)

        if (!session) {
            res.status(403).json({
                message: 'Незвестная ошибка',
            })
            return
        }

        res.cookie('auth-session', session.uuid, {
            expires: new Date(session.expires_at),
        })
        res.redirect('/')
    }

    const logout = async (req: Request, res: Response): Promise<void> => {
        res.cookie('auth-session', '', {
            expires: new Date(),
        })
        res.redirect('/')
    }

    return {
        showMainPage,
        checkAuth,
        redirect,
        callback,
        logout,
    }
}
