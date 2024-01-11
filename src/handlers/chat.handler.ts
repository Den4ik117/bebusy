import { Request, Response } from 'express'
import { Service } from '../services'
import {Chat, ChatUser, IUser, Message, User} from "../models";
import {v4} from "uuid";

const Validator = require('validatorjs')

export interface ChatHandler {
    getMyChats(req: Request, res: Response): Promise<void>
    getOrCreateChat(req: Request, res: Response): Promise<void>
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

    const getOrCreateChat = async (req: Request, res: Response): Promise<void> => {
        const { is_group = false } = req.body

        const validation = new Validator(req.body, is_group ? {
            'user.id': 'required|integer',
            'name': 'required|string|min:2|max:255',
            'user_ids': 'required|array|min:1',
            'user_ids.*': 'required|integer',
        } : {
            'user.id': 'required|integer',
            'user_id': 'required|integer',
        })

        if (validation.fails()) {
            res.status(422).json({
                errors: validation.errors.all(),
            })
            return
        }

        const data = req.body as {
            user: IUser
            is_group: boolean
            name: string
            user_id: number
            user_ids: number[]
        }

        if (data.is_group) {
            const chat = await service.ChatService.createChat(
                data.name,
                'GROUP',
                [data.user.id, ...data.user_ids]
            )

            res.json({
                data: chat,
            })
            return
        }

        const chatIntersects = await service.ChatService.getChatIntersects(data.user.id, data.user_id)

        if (chatIntersects.length > 0) {
            const chat = await service.ChatService.getChatById(chatIntersects[0].chat_id)

            res.json({
                data: chat,
            })
            return
        }

        const chat = await service.ChatService.createChat(
            `${data.user.last_name} ${data.user.first_name}`,
            'PRIVATE',
            [data.user.id, data.user_id]
        )

        res.json({
            data: chat,
        })
    }

    return {
        getMyChats,
        getOrCreateChat,
    }
}
