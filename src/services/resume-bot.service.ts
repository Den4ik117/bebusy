import { Repository } from '../repositories'
import { IUpdate } from '../models'
import axios from 'axios'

type BotRequestConfig = {
    method: 'sendMessage',
    data: {
        chat_id: number,
        text: string,
    },
}

const botRequest = (config: BotRequestConfig) => axios.post(
    `${process.env.APP_URL}/bots/${process.env.RESUME_BOT_TOKEN}/${config.method}`,
    config.data,
)

export interface ResumeBotService {
    processUpdate(update: IUpdate): Promise<void>
}

export const NewResumeBotService = async (repositories: Repository): Promise<ResumeBotService> => {
    const processUpdate = async (update: IUpdate): Promise<void> => {
        if (!update.message || !update.message.user) return

        if (['Чат создан', '/start'].includes(update.message.text)) {
            await botRequest({
                method: 'sendMessage',
                data: {
                    chat_id: update.message.chat_id,
                    text: 'Привет! Я бот, который принимает твои оценки резюме других пользователей.\nВ списке может быть и твоё резюме, смотри инструкцию, как опубликовать своё резюме с hh.ru',
                }
            })
        } else {
            await botRequest({
                method: 'sendMessage',
                data: {
                    chat_id: update.message.chat_id,
                    text: 'Неизвестная команда',
                }
            })
        }
    }

    return {
        processUpdate,
    }
}
