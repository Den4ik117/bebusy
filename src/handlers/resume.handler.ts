import { Request, Response } from 'express'
import { Service } from '../services'
import { IUser } from '../models'

export interface ResumeHandler {
    getResumes(req: Request, res: Response): void
    publishResume(req: Request, res: Response): void
}

export const NewResumeHandler = async (service: Service): Promise<ResumeHandler> => {
    const getResumes = async (req: Request, res: Response) => {
        const { user }: { user: IUser } = req.body
        // const token = req.query.token
        //
        // if (!token) return res.status(400).json({
        //     message: 'Не указан токен',
        // })
        //
        // const user = await service.UserService.getUserByToken(token as string)
        //
        // if (!user) return res.status(404).json({
        //     message: 'Пользователь с таким токеном не найден',
        // })

        const resumes = await service.ResumeService.getResumesByUserId(user.id)

        res.json({
            data: resumes,
        })
    }
    const publishResume = async (req: Request, res: Response) => {
        const { user }: { user: IUser } = req.body

        // const token = req.query.token
        //
        // if (!token) return res.status(400).json({
        //     message: 'Не указан токен',
        // })
        //
        // const user = await service.UserService.getUserByToken(token as string)
        //
        // if (!user) return res.status(404).json({
        //     message: 'Пользователь с таким токеном не найден',
        // })

        const { uuid } = req.params

        if (!uuid) return res.status(400).json({
            message: 'Не указан UUID резюме',
        })

        const resume = await service.ResumeService.updateResumePublishedAtByUserIdAndUuid(user.id, uuid)

        if (!resume) return res.status(404).json({
            message: 'Не удалось найти такое резюме',
        })

        res.json({
            data: resume,
        })
    }

    return {
        getResumes,
        publishResume,
    }
}
