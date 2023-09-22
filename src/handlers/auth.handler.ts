import { NextFunction, Request, Response } from 'express'
import { Service } from '../services'
import axios from "axios";
import fs from "fs";
import path from "path";

export interface AuthHandler {
    showMainPage(req: Request, res: Response): Promise<void>
    showLoginPage(req: Request, res: Response): Promise<void>
    login(req: Request, res: Response): Promise<void>
    checkAuth(req: Request, res: Response, next: NextFunction): Promise<void>
    redirect(req: Request, res: Response): Promise<void>
    callback(req: Request, res: Response): Promise<void>
}

export const NewAuthHandler = async (service: Service): Promise<AuthHandler> => {
    const showMainPage = async (req: Request, res: Response) => {
        const sessionUuid = req.cookies['auth-session']

        if (!sessionUuid) {
            res.render('index')
            return
        }

        const session = await service.SessionService.getSessionByUuid(sessionUuid)

        if (!session) {
            res.render('index')
            return
        }

        // req.body.user = await service.UserService.getUserById(session.user_id)

        let manifest;

        if (process.env.NODE_END === 'production') {
            manifest = fs.readFileSync(`${path.resolve()}/public/manifest.json`)
        }

        res.render('auth', {
            manifest: manifest,
        })
    }

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

    const redirect = async (req: Request, res: Response): Promise<void> => {
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

        res.cookie('auth-session', session.uuid)
        res.redirect('/login')
    }

    return {
        showMainPage,
        showLoginPage,
        login,
        checkAuth,
        redirect,
        callback,
    }
}
