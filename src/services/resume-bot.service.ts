import {Repository} from '../repositories'
import {IAction, INodeChat, IUpdate} from '../models'
import axios from 'axios'

type BotRequestConfig = {
    method: 'sendMessage',
    data: {
        chat_id: number,
        text: string,
        actions?: IAction[][],
        resume_id?: number,
    },
}

const botRequest = (config: BotRequestConfig) => axios.post(
    `${process.env.APP_URL}/bots/${process.env.RESUME_BOT_TOKEN}/${config.method}`,
    config.data,
)

export interface ResumeBotService {
    processUpdate(update: IUpdate): Promise<void>
    getOrCreateNodeChatByChatIdAndUserId(chatId: number, userId: number): Promise<INodeChat>
    sendMessage(chatId: number, text: string, actions?: IAction[][]): void
    updateNodeIdByChatIdAndUserId(chatId: number, userId: number, nodeId: number): Promise<void>
}

export const NewResumeBotService = async (repositories: Repository): Promise<ResumeBotService> => {
    const processUpdate = async (update: IUpdate): Promise<void> => {
        if (!update.message || !update.message.user) return

        if (['Чат создан', '/start', 'Начать'].includes(update.message.text)) {
            await botRequest({
                method: 'sendMessage',
                data: {
                    chat_id: update.message.chat_id,
                    text: 'Привет! Я бот, который принимает твои оценки резюме других пользователей.\nВ списке может быть и твоё резюме, смотри инструкцию, как опубликовать своё резюме с hh.ru',
                    actions: [
                        [{ text: 'Мне интересно!' }],
                    ],
                }
            })
        } else if (update.message.text === 'Мне интересно!') {
            await botRequest({
                method: 'sendMessage',
                data: {
                    chat_id: update.message.chat_id,
                    text: 'Рад видеть такой ответ! Присылаю резюме на оценку ниже 👇',
                }
            })
            await botRequest({
                method: 'sendMessage',
                data: {
                    chat_id: update.message.chat_id,
                    text: 'Резюме:',
                    actions: [
                        [{ text: '1. Говно/какашка/удали резюме' }],
                        [{ text: '2. Ну такое... надо работать' }],
                        [{ text: '3. Фу-фу, чудо, если тебе хоть кто-то ответит' }],
                        [{ text: '4. Ну хорошо' }],
                        [{ text: '5. Что за имба' }],
                    ],
                    resume_id: 1,
                }
            })
        } else {
            await botRequest({
                method: 'sendMessage',
                data: {
                    chat_id: update.message.chat_id,
                    text: 'Неизвестная команда',
                    actions: [
                        [{ text: 'Начать' }]
                    ],
                }
            })
        }
    }

    const getOrCreateNodeChatByChatIdAndUserId = async (chatId: number, userId: number): Promise<INodeChat> => {
        let nodeChat = await repositories.NodeChatRepository.getNodeChatByChatIdAndUserId(chatId, userId)

        if (!nodeChat) {
            nodeChat = <INodeChat> await repositories.NodeChatRepository.createNodeChat({
                chat_id: chatId,
                user_id: userId,
                node_id: 1,
            })
        }

        return nodeChat
    }

    const sendMessage = async (chatId: number, text: string, actions?: IAction[][]) => {
        await botRequest({
            method: 'sendMessage',
            data: {
                chat_id: chatId,
                text,
                actions,
            },
        })
    }

    const updateNodeIdByChatIdAndUserId = async (chatId: number, userId: number, nodeId: number): Promise<void> => {
        await repositories.NodeChatRepository.updateNodeChat({
            chat_id: chatId,
            user_id: userId,
            node_id: nodeId,
        })
    }

    return {
        processUpdate,
        getOrCreateNodeChatByChatIdAndUserId,
        sendMessage,
        updateNodeIdByChatIdAndUserId,
    }
}
