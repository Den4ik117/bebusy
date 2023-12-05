import { Request, Response } from 'express'
import { Service } from '../services'
import {IUser, Request as RequestModel, RequestStatus} from '../models'

export interface RequestHandler {
    createRequest(req: Request, res: Response): Promise<void>
}

export const NewRequestHandler = async (service: Service): Promise<RequestHandler> => {
    const createRequest = async (req: Request, res: Response): Promise<void> => {
        const user = req.body.user as IUser

        const request = await RequestModel.create({
            full_name: req.body.full_name,
            birthdate: req.body.birthdate,
            about: req.body.about,
            status: RequestStatus.New,
            isMentor: req.body.is_mentor,
            directionId: req.body.direction_id,
            userId: user.id,
        })

        res.json({
            data: request,
        })
    }

    return {
        createRequest,
    }
}
