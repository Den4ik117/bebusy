import { Request, Response } from 'express'
import { Service } from '../services'
import { IUpdate } from '../models'
import {BotRequest, BotResponse, INode} from '../routes/utils';

export interface ResumeBotHandler {
    receiveUpdate(req: Request, res: Response): Promise<void>
    handleUpdate(req: Request, res: Response, nodes: INode[]): Promise<void>
    sendMessage(req: BotRequest, res: BotResponse): BotResponse
    sendResume(req: BotRequest, res: BotResponse): Promise<BotResponse>
    approveResumeOpinion(req: BotRequest, res: BotResponse): Promise<BotResponse>
    handlePhotoOpinion(req: BotRequest, res: BotResponse): Promise<BotResponse>
    handleReadableOpinion(req: BotRequest, res: BotResponse): Promise<BotResponse>
    handleCapacityOpinion(req: BotRequest, res: BotResponse): Promise<BotResponse>
    handleExperienceOpinion(req: BotRequest, res: BotResponse): Promise<BotResponse>
    handleTotalOpinion(req: BotRequest, res: BotResponse): Promise<BotResponse>
    handleCommentOpinion(req: BotRequest, res: BotResponse): Promise<BotResponse>
}

const scale = [
    '1. Очень плохо',
    '2. Плохо',
    '3. Удовлетворительно',
    '4. Хорошо',
    '5. Отлично',
]

const scaleValue: Record<string, number> = {
    [scale[0]]: 1,
    [scale[1]]: 2,
    [scale[2]]: 3,
    [scale[3]]: 4,
    [scale[4]]: 5,
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

        let response = node.middleware(botRequest, botResponse)

        if (response instanceof Promise) {
            response = await response
        }

        const nextNode = response.run()

        if (nextNode) {
            botResponse = new BotResponse(service, nodeChat, nodes)

            let result = nextNode.handler(botRequest, botResponse)

            if (result instanceof Promise) {
                result = await result
            }

            result.run()
        }

        res.status(204).end()
    }

    const sendMessage = (req: BotRequest, res: BotResponse): BotResponse => {
        return res.text('привет мир')
    }

    const sendResume = async (req: BotRequest, res: BotResponse): Promise<BotResponse> => {
        const resume = await service.ResumeBotService.getRandomResume(req.update.user_id)

        if (!resume) return res.text('Доступных для оценки резюме пока что нет').next(10)

        await service.ResumeBotService.applyResumeOpinion(resume.id, req.update.user_id)

        return res
            .text('Чтобы твоё резюме попало в выдачу, необходимо оценить резюме трех других участников приложения.\nРезюме присылаю ниже.')
            .resume(resume.id)
            .actions('Я прочитал резюме и готов его оценить!')
    }

    const approveResumeOpinion = async (req: BotRequest, res: BotResponse): Promise<BotResponse> => {
        if (req.message !== 'Я прочитал резюме и готов его оценить!') {
            return res.text('Неизвестная команда').actions('Я прочитал резюме и готов его оценить!')
        }

        return res.next(3)
    }

    const handlePhotoOpinion = async (req: BotRequest, res: BotResponse): Promise<BotResponse> => {
        if (scale.includes(req.message)) {
            const opinion = await service.ResumeBotService.getUncompletedOpinion(req.update.user_id)

            if (!opinion) return res.next(10)

            await service.ResumeBotService.updateOptionPhoto(opinion.id, scaleValue[req.message])

            return res.next(4)
        }

        return res.text('Пожалуйста, оцени фото по шкале от 1 до 5').actions(scale)
    }

    const handleReadableOpinion = async (req: BotRequest, res: BotResponse): Promise<BotResponse> => {
        if (scale.includes(req.message)) {
            const opinion = await service.ResumeBotService.getUncompletedOpinion(req.update.user_id)

            if (!opinion) return res.next(10)

            await service.ResumeBotService.updateOptionReadable(opinion.id, scaleValue[req.message])

            return res.next(5)
        }

        return res.text('Пожалуйста, оцени читабельность резюме по шкале от 1 до 5').actions(scale)
    }

    const handleCapacityOpinion = async (req: BotRequest, res: BotResponse): Promise<BotResponse> => {
        if (scale.includes(req.message)) {
            const opinion = await service.ResumeBotService.getUncompletedOpinion(req.update.user_id)

            if (!opinion) return res.next(10)

            await service.ResumeBotService.updateOptionCapacity(opinion.id, scaleValue[req.message])

            return res.next(6)
        }

        return res.text('Пожалуйста, оцени наводненность по шкале от 1 до 5').actions(scale)
    }

    const handleExperienceOpinion = async (req: BotRequest, res: BotResponse): Promise<BotResponse> => {
        if (scale.includes(req.message)) {
            const opinion = await service.ResumeBotService.getUncompletedOpinion(req.update.user_id)

            if (!opinion) return res.next(10)

            await service.ResumeBotService.updateOptionExperience(opinion.id, scaleValue[req.message])

            return res.next(7)
        }

        return res.text('Пожалуйста, оцени опыт по шкале от 1 до 5').actions(scale)
    }

    const handleTotalOpinion = async (req: BotRequest, res: BotResponse): Promise<BotResponse> => {
        if (scale.includes(req.message)) {
            const opinion = await service.ResumeBotService.getUncompletedOpinion(req.update.user_id)

            if (!opinion) return res.next(10)

            await service.ResumeBotService.updateOptionTotal(opinion.id, scaleValue[req.message])

            return res.next(8)
        }

        return res.text('Пожалуйста, сделай общую оценку резюме по шкале от 1 до 5').actions(scale)
    }

    const handleCommentOpinion = async (req: BotRequest, res: BotResponse): Promise<BotResponse> => {
        const opinion = await service.ResumeBotService.getUncompletedOpinion(req.update.user_id)

        if (!opinion) return res.next(10)

        await service.ResumeBotService.updateOptionCommentAndCompletedAt(opinion.id, req.message)

        return res.next(9)
    }

    // const sendMessage = (req: BotRequest, res: BotResponse): BotResponse => {
    //     return res.text('привет мир')
    // }
    //
    // const sendMessage = (req: BotRequest, res: BotResponse): BotResponse => {
    //     return res.text('привет мир')
    // }
    //
    // const sendMessage = (req: BotRequest, res: BotResponse): BotResponse => {
    //     return res.text('привет мир')
    // }

    return {
        receiveUpdate,
        handleUpdate,
        sendMessage,
        sendResume,
        approveResumeOpinion,
        handlePhotoOpinion,
        handleReadableOpinion,
        handleCapacityOpinion,
        handleExperienceOpinion,
        handleTotalOpinion,
        handleCommentOpinion,
    }
}
