import { Request, Response } from 'express'
import { Service } from '../services'
import {IUser, User} from "../models";
import {RequestType} from "../models/request";

const Validator = require('validatorjs')

export interface UserHandler {
    getCurrentUser(req: Request, res: Response): Promise<void>
    getToken(req: Request, res: Response): Promise<void>
    getUsers(req: Request, res: Response): Promise<void>
    updateCurrentUser(req: Request, res: Response): Promise<void>
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

    const updateCurrentUser = async (req: Request, res: Response): Promise<void> => {
        const data = req.body as {
            user: IUser
            first_name: string
            last_name: string
        }

        const validation = new Validator(data, {
            'first_name': 'required|string|min:1|max:255',
            'last_name': 'required|string|min:1|max:255',
        })

        if (validation.fails()) {
            res.status(422).json({
                errors: validation.errors.all(),
            })
            return
        }

        const user = await service.UserService.updateUserById(data.user.id, {
            first_name: data.first_name,
            last_name: data.last_name,
        })

        res.json({
            data: user,
        })
    }

    return {
        getCurrentUser,
        getToken,
        getUsers,
        updateCurrentUser,
    }
}
