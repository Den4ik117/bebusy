import { Request, Response } from 'express'
import { Service } from '../services'
import {Chat, ChatUser, Message, User} from "../models";
import {v4} from "uuid";

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
        const { user: currentUser, user_id, name = '', is_group = false, user_ids = [] } = req.body

        // if (user.chats && user.chats.some(chat => {
        //     if ('ChatUser' in chat && typeof chat.ChatUser === 'object' && chat.ChatUser !== null && 'userId' in chat.ChatUser) {
        //         return chat.ChatUser.userId == currentUser.id
        //     }
        //     return false
        // })) {
        //     res.json({
        //         data: 'already exists',
        //     })
        //     return
        // }

        if (is_group) {
            const chat = await Chat.create({
                uuid: v4(),
                name: name,
                type: 'GROUP',
            })

            for (const userId of user_ids) {
                await ChatUser.sequelize.queryRaw(`INSERT INTO chat_user (chat_id, user_id) VALUES (${chat.id}, ${userId})`)
            }

            await Message.create({
                text: 'Чат создан',
                chatId: chat.id,
            })

            res.json({
                data: chat,
            })
            return
        }

        const user = await User.findByPk(user_id, {
            include: [Chat],
        })

        if (!user) {
            res.json({
                data: null,
                message: 'User not found',
            })
            return
        }

        try {
            const chat = await Chat.create({
                uuid: v4(),
                name: user.firstName + ' ' + user.lastName,
                type: 'PRIVATE',
            })

            await ChatUser.create({
                chatId: chat.id,
                userId: user.id,
            })

            await ChatUser.create({
                chatId: chat.id,
                userId: currentUser.id,
            })

            await Message.create({
                text: 'Чат создан',
                chatId: chat.id,
            })

            res.json({
                data: chat,
            })
        } catch (e) {
            console.log(e)
        }

        res.json({
            data: null,
        })
    }

    return {
        getMyChats,
        getOrCreateChat,
    }
}
