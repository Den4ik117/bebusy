import { Request, Response } from 'express'
import { Service } from '../services'
import {IUser, Request as RequestModel, RequestStatus} from '../models'

const Validator = require('validatorjs')

export interface RequestHandler {
    createRequest(req: Request, res: Response): Promise<void>
    storeRequest(req: Request, res: Response): Promise<void>
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

    const storeRequest = async (req: Request, res: Response): Promise<void> => {
        // const user = req.body.user as IUser

        const validation = new Validator(req.body, {
            'user.id': 'required|integer',
            'name': 'required|string|min:2|max:255',
            'user_ids': 'required|array|min:1',
            'user_ids.*': 'required|integer',
        })

        if (validation.fails()) {
            res.status(422).json({
                errors: validation.errors.all(),
            })
            return
        }

        // const request = await RequestModel.create({
        //     full_name: req.body.full_name,
        //     birthdate: req.body.birthdate,
        //     about: req.body.about,
        //     status: RequestStatus.New,
        //     isMentor: req.body.is_mentor,
        //     directionId: req.body.direction_id,
        //     userId: user.id,
        // })

        // res.json({
        //     data: request,
        // })
    }

    return {
        createRequest,
        storeRequest,
    }
}
