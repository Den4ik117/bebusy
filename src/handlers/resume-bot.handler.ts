import { Request, Response } from 'express'
import { Service } from '../services'
import { IUpdate } from '../models'
import {BotRequest, BotResponse, INode} from '../routes/utils';

export interface ResumeBotHandler {
    receiveUpdate(req: Request, res: Response): Promise<void>
    handleUpdate(req: Request, res: Response, nodes: INode[]): Promise<void>
    sendMessage(req: BotRequest, res: BotResponse): BotResponse
}

export const NewResumeBotHandler = async (service: Service): Promise<ResumeBotHandler> => {
    const receiveUpdate = async (req: Request, res: Response) => {
        const { data: update }: { data: IUpdate | undefined } = req.body

        if (!update) {
            res.status(400).json({
                message: 'Отсутствует тело',
            })
            return
        }

        await service.ResumeBotService.processUpdate(update)

        res.status(204).end()
    }

    const handleUpdate = async (req: Request, res: Response, nodes: INode[]) => {
        const { data: update }: { data: IUpdate | undefined } = req.body

        if (!update) {
            res.status(400).json({
                message: 'Отсутствует тело',
            })
            return
        }

        const chatId = update.message?.chat_id

        if (!chatId) {
            res.status(400).json({
                message: 'Отсутствует chat_id',
            })
            return
        }

        const nodeChat = await service.ResumeBotService.getOrCreateNodeChatByChatIdAndUserId(chatId, 2)

        const node = nodes.find(node => node.id === nodeChat.node_id)

        if (!node) {
            res.status(400).json({
                message: `Node с таким ID (${nodeChat.node_id}) не существует`,
            })
            return
        }

        const botRequest = new BotRequest(update, node)
        let botResponse = new BotResponse(service, nodeChat, nodes)

        const response = node.middleware(botRequest, botResponse)

        const nextNode = response.run()

        if (nextNode) {
            botResponse = new BotResponse(service, nodeChat, nodes)

            nextNode.handler(botRequest, botResponse).run()
        }

        res.status(204).end()
    }

    const sendMessage = (req: BotRequest, res: BotResponse): BotResponse => {
        return res.text('привет мир')
    }

    return {
        receiveUpdate,
        handleUpdate,
        sendMessage,
    }
}
