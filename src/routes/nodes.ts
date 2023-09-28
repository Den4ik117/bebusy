import { Handler } from '../handlers'
import { Request, Response } from 'express'
import {BotRequest, BotResponse, INode} from './utils'
import { logger } from '../utils'

const scale = [
    '1. Очень плохо',
    '2. Плохо',
    '3. Удовлетворительно',
    '4. Хорошо',
    '5. Отлично',
]

const oneMore = [
    'Оценить ещё одно резюме',
    'Перейти в меню',
]

const menuButtons = [
    'Мои резюме',
    'Оценить ещё одно резюме',
]

const resumeActionButtons = [
    'Опубликовать резюме для оценок',
    // 'Актуализировать',
    'Статистика по резюме',
    'Назад',
]

const resumes = [
    '1. Full-stack разработчик на Laravel',
    '2. Middle web-разработчик',
]

export const ResumeBotRouter = (handlers: Handler) => {
    const nodes: INode[] = [
        {
            id: 1,
            middleware: (req, res) => {
                const yes = 'Мне интересно!'

                if (req.message === yes) return res.next(2)

                return res.text('Неизвестная команда').actions(yes)
            },
            handler: (req, res) => {
                return res.text('Привет, я многофункциональный бот').actions('Мне интересно!')
            },
        },
        {
            id: 2,
            middleware: handlers.ResumeBotHandler.approveResumeOpinion,
            handler: handlers.ResumeBotHandler.sendResume,
        },
        {
            id: 3,
            middleware: handlers.ResumeBotHandler.handlePhotoOpinion,
            handler: (req, res) => {
                return res.text('Оцени фото от 1 до 5').actions(scale)
            },
        },
        {
            id: 4,
            middleware: handlers.ResumeBotHandler.handleReadableOpinion,
            handler: (req, res) => {
                return res.text('Оцени читабельность резюме от 1 до 5').actions(scale)
            },
        },
        {
            id: 5,
            middleware: handlers.ResumeBotHandler.handleCapacityOpinion,
            handler: (req, res) => {
                return res.text('Оцени наводненность от 1 до 5').actions(scale)
            },
        },
        {
            id: 6,
            middleware: handlers.ResumeBotHandler.handleExperienceOpinion,
            handler: (req, res) => {
                return res.text('Оцени опыт от 1 до 5').actions(scale)
            },
        },
        {
            id: 7,
            middleware: handlers.ResumeBotHandler.handleTotalOpinion,
            handler: (req, res) => {
                return res.text('Твоя общая оценка резюме от 1 до 5').actions(scale)
            },
        },
        {
            id: 8,
            middleware: handlers.ResumeBotHandler.handleCommentOpinion,
            handler: (req, res) => {
                return res.text('Как ты прокомментируешь это резюме? (свободный ввод)')
            },
        },
        {
            id: 9,
            middleware: (req, res) => {
                if (req.message === oneMore[0]) return res.next(2)
                else if(req.message === oneMore[1]) return res.next(10)

                return res.text('Неизвестная команда').actions(oneMore)
            },
            handler: (req, res) => {
                return res.text('Спасибо за оценку!').actions(oneMore)
            },
        },
        {
            id: 10,
            middleware: (req, res) => {
                if (req.message === menuButtons[0]) return res.next(11)
                else if (req.message === menuButtons[1]) return res.next(2)

                return res.text('Неизвестная команда').actions(menuButtons)
            },
            handler: handlers.ResumeBotHandler.handleMenu,
        },
        {
            id: 11,
            middleware: handlers.ResumeBotHandler.middlewareYourResumes,
            handler: handlers.ResumeBotHandler.handleYourResumes,
        },
        {
            id: 12,
            middleware: handlers.ResumeBotHandler.handlePublishResume,
            handler: handlers.ResumeBotHandler.chooseResumeForPublishing,
        },
        {
            id: 13,
            middleware: handlers.ResumeBotHandler.handleStatsOfResume,
            handler: handlers.ResumeBotHandler.chooseResumeForViewStats,
        },
        {
            id: 14,
            middleware: (req, res) => {
                if (req.message === 'Назад') return res.next(10)

                return res.text('Неизвестная команда').actions('Назад')
            },
            handler: handlers.ResumeBotHandler.viewResumeStats,
        },
        {
            id: 15,
            name: 'Скрыть резюме от публикации',
            middleware: handlers.ResumeBotHandler.unpublishResumeMiddleware,
            handler: handlers.ResumeBotHandler.unpublishResumeHandler
        },
        // {
        //     id: 10,
        //     middleware: (req, res) => {
        //
        //     },
        //     handler: (req, res) => {
        //
        //     },
        // }
    ]

    return async (req: Request, res: Response) => {
        try {
            await handlers.ResumeBotHandler.handleUpdate(req, res, nodes)
        } catch (e) {
            if (e instanceof Error) {
                logger.error(`При обработке сообщения произошла ошибка: ${e.message}`)
            } else {
                logger.info('При обработке сообщения произошла неизвестная ошибка')
            }
        }
    }
}
