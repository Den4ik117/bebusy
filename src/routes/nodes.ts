import { Handler } from '../handlers'
import { Request, Response } from 'express'
import {BotRequest, BotResponse, INode} from './utils'

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
            middleware: (req, res) => {
                if (req.message === 'Я готов!') return res.next(3)

                return res.text('Неизвестная команда').actions('Я готов!')
            },
            handler: (req, res) => {
                return res
                    .text('Чтобы твоё резюме попало в выдачу, необходимо оценить резюме трех других участников приложения.\n\nВот тебе первое резюме: *резюме*.\n\nКак будешь готов оценить, дай знать')
                    .actions('Я готов!')
            },
        },
        {
            id: 3,
            middleware: (req, res) => {
                if (scale.includes(req.message)) {
                    return res.next(4)
                }

                return res.text('Пожалуйста, оцени фото по шкале от 1 до 5').actions(scale)
            },
            handler: (req, res) => {
                return res.text('Оцени фото от 1 до 5').actions(scale)
            },
        },
        {
            id: 4,
            middleware: (req, res) => {
                if (scale.includes(req.message)) {
                    return res.next(5)
                }

                return res.text('Пожалуйста, оцени читабельность резюме по шкале от 1 до 5').actions(scale)
            },
            handler: (req, res) => {
                return res.text('Оцени читабельность резюме от 1 до 5').actions(scale)
            },
        },
        {
            id: 5,
            middleware: (req, res) => {
                if (scale.includes(req.message)) {
                    return res.next(6)
                }

                return res.text('Пожалуйста, оцени наводненность по шкале от 1 до 5').actions(scale)
            },
            handler: (req, res) => {
                return res.text('Оцени наводненность от 1 до 5').actions(scale)
            },
        },
        {
            id: 6,
            middleware: (req, res) => {
                if (scale.includes(req.message)) {
                    return res.next(7)
                }

                return res.text('Пожалуйста, оцени опыт по шкале от 1 до 5').actions(scale)
            },
            handler: (req, res) => {
                return res.text('Оцени опыт от 1 до 5').actions(scale)
            },
        },
        {
            id: 7,
            middleware: (req, res) => {
                if (scale.includes(req.message)) {
                    return res.next(8)
                }

                return res.text('Пожалуйста, сделай общую оценку резюме по шкале от 1 до 5').actions(scale)
            },
            handler: (req, res) => {
                return res.text('Твоя общая оценка резюме от 1 до 5').actions(scale)
            },
        },
        {
            id: 8,
            middleware: (req, res) => {
                return res.next(9)
            },
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
                if (req.message === oneMore[0]) return res.next(2)

                return res.text('Неизвестная команда').actions(oneMore[0])
            },
            handler: (req, res) => {
                return res.text('Ваше меню: *меню*').actions(oneMore[0])
            },
        },
        // {
        //     id: 6,
        //     middleware: (req, res) => {
        //
        //     },
        //     handler: (req, res) => {
        //
        //     },
        // },
        // {
        //     id: 7,
        //     middleware: (req, res) => {
        //
        //     },
        //     handler: (req, res) => {
        //
        //     },
        // },
        // {
        //     id: 8,
        //     middleware: (req, res) => {
        //
        //     },
        //     handler: (req, res) => {
        //
        //     },
        // },
        // {
        //     id: 9,
        //     middleware: (req, res) => {
        //
        //     },
        //     handler: (req, res) => {
        //
        //     },
        // },
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
        await handlers.ResumeBotHandler.handleUpdate(req, res, nodes)
    }
}
