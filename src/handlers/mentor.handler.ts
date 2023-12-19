import { Request, Response } from 'express'
import { Service } from '../services'
import {Mentor, User} from '../models'
import {Op} from "@sequelize/core";

export interface MentorHandler {
    getActiveMentors(req: Request, res: Response): Promise<void>
}

export const NewMentorHandler = async (service: Service): Promise<MentorHandler> => {
    const getActiveMentors = async (req: Request, res: Response): Promise<void> => {
        const mentors = await Mentor.findAll({
            where: {
                isActive: {
                    [Op.eq]: true,
                },
            },
            include: [User],
        })

        res.json({
            data: mentors,
        })
    }

    return {
        getActiveMentors,
    }
}
