import { Request, Response } from 'express'
import { Service } from '../services'
import { IAction } from '../models'

export interface BotHandler {
    sendMessage(req: Request, res: Response): void
}

interface MessageParams {
    chat_id?: number
    text?: string
    actions?: IAction[][]
    resume_id?: number
}

export const NewBotHandler = async (service: Service): Promise<BotHandler> => {
    const sendMessage = async (req: Request, res: Response) => {
        const { token } = req.params

        if (!token) return res.status(400).json({
            message: 'Не указан токен',
        })

        const user = await service.UserService.getUserByToken(token)

        if (!user) return res.status(404).json({
            message: 'Пользователь с таким токеном не найден',
        })

        const { chat_id, text, actions, resume_id }: MessageParams = req.body

        if (!chat_id || !text) return res.status(403).json({
            message: 'Заполнены не все данные',
        })

        const message = service.MessageService.createMessage({
            text: text,
            chat_id: chat_id,
            user_id: user.id,
            actions: actions,
            resume_id: resume_id,
        }, user)

        res.json({
            data: message,
        })
    }

    return {
        sendMessage,
    }
}
