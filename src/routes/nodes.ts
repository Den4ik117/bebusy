import { Handler } from '../handlers'
import { Request, Response } from 'express'
import {BotRequest, BotResponse, INode} from './utils'

export const ResumeBotRouter = (handlers: Handler) => {
    const nodes: INode[] = [
        {
            id: 1,
            middleware: (req, res) => req.update.message?.text === '/start' ? res.next(2) : res.text('Неизвестная команда'),
            handler: (req, res) => res.text('Привет, я многофункциональный бот'),
        },
        {
            id: 2,
            middleware: (req, res) => req.update.message?.text === '/back' ? res.next(1) : res.text('Неизвестная команда'),
            handler: (req, res) => res.text('Новый этап'),
        }
    ]

    return async (req: Request, res: Response) => {
        await handlers.ResumeBotHandler.handleUpdate(req, res, nodes)
    }
}
