import { Request, Response } from 'express'
import { Service } from '../services'

export interface BotHandler {
    sendMessage(req: Request, res: Response): void
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

        const { chat_id, text }: { chat_id?: number, text?: string } = req.body

        if (!chat_id || !text) return res.status(403).json({
            message: 'Заполнены не все данные',
        })

        const message = service.MessageService.createMessage({
            text: text,
            chat_id: chat_id,
            user_id: user.id,
        }, user)

        res.json({
            data: message,
        })
    }

    return {
        sendMessage,
    }
}
