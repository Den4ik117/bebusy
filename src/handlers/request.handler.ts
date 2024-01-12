import { Request, Response } from 'express'
import { Service } from '../services'
import {IUser} from '../models'
import {RequestType} from "../models/request";

const Validator = require('validatorjs')

export interface RequestHandler {
    createRequest(req: Request, res: Response): Promise<void>
}

const storeRules: Record<RequestType, Record<string, string>> = {
    [RequestType.FindMentor]: {
        'full_name': 'required|string|min:2|max:255',
        'birthdate': 'required|string|min:10|max:12',
        'about': 'required|string|min:10|max:1024',
        'direction_id': 'required|integer|min:1',
    },
    [RequestType.BecomeMentor]: {
        'full_name': 'required|string|min:2|max:255',
        'birthdate': 'required|string|min:10|max:12',
        'about': 'required|string|min:10|max:1024',
        'direction_id': 'required|integer|min:1',
    },
    [RequestType.RequestCodeReview]: {
        'full_name': 'required|string|min:2|max:255',
        'about': 'required|string|min:10|max:1024',
        'direction_id': 'required|integer|min:1',
    },
    [RequestType.IndividualInterview]: {
        'full_name': 'required|string|min:2|max:255',
        'birthdate': 'required|string|min:10|max:12',
        'about': 'required|string|min:10|max:1024',
        'direction_id': 'required|integer|min:1',
    },
    [RequestType.GroupInterview]: {
        'full_name': 'required|string|min:2|max:255',
        'birthdate': 'required|string|min:10|max:12',
        'about': 'required|string|min:10|max:1024',
        'direction_id': 'required|integer|min:1',
    },
}

export const NewRequestHandler = async (service: Service): Promise<RequestHandler> => {
    const getData = (data: Object, rules: Object) => {
        const newData = {}

        for (const key in rules) {
            // @ts-ignore
            newData[key] = data[key]
        }

        return newData
    }

    const createRequest = async (req: Request, res: Response): Promise<void> => {
        const { type = RequestType.FindMentor, user } = req.body as { type: RequestType; user: IUser }

        const rules = storeRules[type]

        const validation = new Validator(req.body, {
            'type': `required|string|in:${Object.values(RequestType).join(',')}`,
            ...rules,
        })

        if (validation.fails()) {
            res.status(422).json({
                errors: validation.errors.all(),
            })
            return
        }

        const request = await service.RequestService.createRequest(
            user.id,
            JSON.stringify(getData(req.body, rules)),
            type,
        )

        res.json({
            data: request,
        })
    }

    return {
        createRequest,
    }
}
