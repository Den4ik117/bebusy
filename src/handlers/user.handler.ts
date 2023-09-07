import { Request, Response } from 'express'
import { Service } from '../services'

export interface UserHandler {
    getCurrentUser(req: Request, res: Response): void
}

export const NewUserHandler = async (service: Service): Promise<UserHandler> => {
    const getCurrentUser = (req: Request, res: Response) => {
        res.json({
            data: ['test', 'tefsdf'],
        })
    }

    return {
        getCurrentUser,
    }
}