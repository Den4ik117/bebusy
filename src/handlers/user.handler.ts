import { Request, Response } from 'express'
import { Service } from '../services'
import {IUser, User} from "../models";

export interface UserHandler {
    getCurrentUser(req: Request, res: Response): Promise<void>
    getToken(req: Request, res: Response): Promise<void>
    getUsers(req: Request, res: Response): Promise<void>
}

export const NewUserHandler = async (service: Service): Promise<UserHandler> => {
    const getCurrentUser = async (req: Request, res: Response) => {
        const { id: userId } = req.body.user

        if (!userId) {
            res.status(400).json({
                message: 'Вы не авторизованы!',
            })
            return
        }

        const user = await service.UserService.getUserById(<number> userId)

        res.json({
            data: user,
        })
    }

    const getToken = async (req: Request, res: Response) => {
        const { id: userId } = req.body.user

        if (!userId) {
            res.status(400).json({
                message: 'Вы не авторизованы!',
            })
            return
        }

        const user = await service.UserService.getUserById(<number> userId)

        res.json({
            data: user?.token,
        })
    }

    const getUsers = async (req: Request, res: Response) => {
        const { id } = req.body.user as IUser

        const users = await service.UserService.getUsersExceptSelfAndBots(id)

        res.json({
            data: users,
        })
    }

    return {
        getCurrentUser,
        getToken,
        getUsers,
    }
}
