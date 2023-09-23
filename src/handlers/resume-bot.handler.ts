import { Request, Response } from 'express'
import { Service } from '../services'
import { IUpdate } from '../models'

export interface ResumeBotHandler {
    receiveUpdate(req: Request, res: Response): Promise<void>
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

    return {
        receiveUpdate,
    }
}
