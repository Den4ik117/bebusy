import { Request, Response } from 'express'
import { Service } from '../services'

export interface ChatHandler {
    getMyChats(req: Request, res: Response): Promise<void>
}

export const NewChatHandler = async (service: Service): Promise<ChatHandler> => {
    const getMyChats = async (req: Request, res: Response) => {
        const { id: userId } = req.body.user

        if (!userId) {
            res.status(400).json({
                message: 'Вы не авторизованы!',
            })
            return
        }

        const chats = await service.ChatService.getChatsByUserId(<number> userId)

        res.json({
            data: chats,
        })
    }

    return {
        getMyChats,
    }
}
