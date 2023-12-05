import { Request, Response } from 'express'
import { Service } from '../services'
import {Direction, IUser} from '../models'

export interface DirectionHandler {
    getDirections(req: Request, res: Response): Promise<void>
}

export const NewDirectionHandler = async (service: Service): Promise<DirectionHandler> => {
    const getDirections = async (req: Request, res: Response): Promise<void> => {
        const directions = await Direction.findAll()

        res.json({
            data: directions,
        })
    }

    return {
        getDirections,
    }
}
