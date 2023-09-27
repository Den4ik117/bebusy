import {Repository} from '../repositories'
import {IAction, INodeChat, IOpinion, IResume, IUpdate} from '../models'
import axios from 'axios'
import {getCurrentDatetime, getRandomInteger} from '../utils'

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
    sendMessage(chatId: number, text: string, actions?: IAction[][], resumeId?: number): void
    updateNodeIdByChatIdAndUserId(chatId: number, userId: number, nodeId: number): Promise<void>
    getRandomResume(userId: number): Promise<IResume | undefined>
    applyResumeOpinion(resumeId: number, userId: number): Promise<IOpinion | undefined>
    getUncompletedOpinion(userId: number): Promise<IOpinion | undefined>
    updateOptionPhoto(opinionId: number, photo: number): Promise<IOpinion | undefined>
    updateOptionReadable(opinionId: number, readable: number): Promise<IOpinion | undefined>
    updateOptionCapacity(opinionId: number, capacity: number): Promise<IOpinion | undefined>
    updateOptionExperience(opinionId: number, experience: number): Promise<IOpinion | undefined>
    updateOptionTotal(opinionId: number, total: number): Promise<IOpinion | undefined>
    updateOptionCommentAndCompletedAt(opinionId: number, comment: string): Promise<IOpinion | undefined>
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

    const sendMessage = async (chatId: number, text: string, actions?: IAction[][], resumeId?: number) => {
        await botRequest({
            method: 'sendMessage',
            data: {
                chat_id: chatId,
                text,
                actions,
                resume_id: resumeId,
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

    const getRandomResume = async (userId: number): Promise<IResume | undefined> => {
        const opinions = await repositories.OpinionRepository.getOpinionsByUserId(userId)

        const resumeIds = opinions.map(opinion => opinion.resume_id)

        const resumes = await repositories.ResumeRepository.getAvailableResumesExcludeIds(resumeIds)

        if (resumes.length === 0) return undefined

        const index = getRandomInteger(0, resumes.length - 1)

        return resumes[index]
    }

    const applyResumeOpinion = async (resumeId: number, userId: number): Promise<IOpinion | undefined> => {
        return await repositories.OpinionRepository.createOpinion({
            resume_id: resumeId,
            user_id: userId,
            updated_at: getCurrentDatetime(),
            created_at: getCurrentDatetime(),
        })
    }

    const getUncompletedOpinion = async (userId: number): Promise<IOpinion | undefined> => {
        return await repositories.OpinionRepository.getUncompletedOpinion(userId)
    }

    const updateOptionPhoto = async (opinionId: number, photo: number): Promise<IOpinion | undefined> => {
        return await repositories.OpinionRepository.updateOptionPhoto(opinionId, photo)
    }

    const updateOptionReadable = async (opinionId: number, readable: number): Promise<IOpinion | undefined> => {
        return await repositories.OpinionRepository.updateOptionReadable(opinionId, readable)
    }

    const updateOptionCapacity = async (opinionId: number, capacity: number): Promise<IOpinion | undefined> => {
        return await repositories.OpinionRepository.updateOptionCapacity(opinionId, capacity)
    }

    const updateOptionExperience = async (opinionId: number, experience: number): Promise<IOpinion | undefined> => {
        return await repositories.OpinionRepository.updateOptionExperience(opinionId, experience)
    }

    const updateOptionTotal = async (opinionId: number, total: number): Promise<IOpinion | undefined> => {
        return await repositories.OpinionRepository.updateOptionTotal(opinionId, total)
    }

    const updateOptionCommentAndCompletedAt = async (opinionId: number, comment: string): Promise<IOpinion | undefined> => {
        return await repositories.OpinionRepository.updateOptionCommentAndCompletedAt(
            opinionId,
            getCurrentDatetime(),
            comment,
        )
    }

    return {
        processUpdate,
        getOrCreateNodeChatByChatIdAndUserId,
        sendMessage,
        updateNodeIdByChatIdAndUserId,
        getRandomResume,
        applyResumeOpinion,
        getUncompletedOpinion,
        updateOptionPhoto,
        updateOptionReadable,
        updateOptionCapacity,
        updateOptionExperience,
        updateOptionTotal,
        updateOptionCommentAndCompletedAt,
    }
}
