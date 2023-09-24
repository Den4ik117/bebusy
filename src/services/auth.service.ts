import { Repository } from '../repositories'
import { IHHResume, ISession } from '../models'
import { v4 as generateUuid } from 'uuid'
import { getCurrentDatetime, getCurrentDatetimeFromDate } from '../utils'
import axios, { AxiosError } from 'axios'

export interface SessionService {
    getSessionByUuid(uuid: string): Promise<ISession | undefined>
    callback(code: string): Promise<ISession | null | undefined>
    getDevelopmentSession(): Promise<ISession | undefined>
}

export const NewSessionService = async (repositories: Repository): Promise<SessionService> => {
    const getSessionByUuid = async (uuid: string): Promise<ISession | undefined> => {
        return await repositories.SessionRepository.getSessionByUuid(uuid)
    }

    const callback = async (code: string): Promise<ISession | null | undefined> => {
        const params = new URLSearchParams({
            client_id: <string> process.env.HH_CLIENT_ID,
            client_secret: <string> process.env.HH_CLIENT_SECRET,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: `${process.env.APP_URL}/oauth/callback`,
        })

        const url = `https://hh.ru/oauth/token?${params.toString()}`

        let response
        try {
            response = await axios.post(url)
            // @ts-ignore
        } catch (e: AxiosError) {
            console.log(e.response?.data)
            return null
        }

        // @ts-ignore
        const { access_token, expires_in, refresh_token } = response.data

        if (!access_token) {
            return null
            // res.status(response.status).json({
            //     message: 'Произошла ошибка',
            // })
            // return
        }

        const me = await axios.get('https://api.hh.ru/me', {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        })

        if (!me.data.id) {
            return null
            // res.status(me.status).json({
            //     message: 'При получении пользователя произошла ошибка',
            // })
        }

        let user = await repositories.UserRepository.getUserByForeignId(me.data.id);

        if (!user) {
            user = await repositories.UserRepository.createUser({
                uuid: generateUuid(),
                foreign_id: me.data.id,
                first_name: me.data.first_name,
                middle_name: me.data.middle_name,
                last_name: me.data.last_name,
                email: me.data.email,
                data: JSON.stringify(me.data),
                created_at: getCurrentDatetime(),
                updated_at: getCurrentDatetime(),
            })

            const resumes = await axios.get('https://api.hh.ru/resumes/mine', {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                },
            })

            const myResumes: Array<{ id: number }> = resumes.data?.items || []

            for (let i = 0; i < myResumes.length; i++) {
                const resume = await axios.get<IHHResume>(`https://api.hh.ru/resumes/${myResumes[i].id}`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                    },
                })

                await repositories.ResumeRepository.createResume({
                    uuid: generateUuid(),
                    user_id: user.id,
                    data: resume.data,
                    updated_at: getCurrentDatetime(),
                    created_at: getCurrentDatetime(),
                })
            }

            const chat = await repositories.ChatRepository.createChat({
                uuid: generateUuid(),
                name: user.last_name + ' ' + user.first_name,
                type: 'PRIVATE',
                created_at: getCurrentDatetime(),
                updated_at: getCurrentDatetime(),
            }, [2, user.id])

            await repositories.MessageRepository.createMessage({
                text: 'Чат создан',
                user_id: null,
                chat_id: chat.id,
                resume_id: null,
                updated_at: getCurrentDatetime(),
                created_at: getCurrentDatetime(),
            })
        } else {
            user = await repositories.UserRepository.updateUser({
                id: user.id,
                first_name: me.data.first_name,
                middle_name: me.data.middle_name,
                last_name: me.data.last_name,
                email: me.data.email,
                data: JSON.stringify(me.data),
            })
        }

        const today = new Date()
        const tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000))

        return await repositories.SessionRepository.createSession({
            uuid: generateUuid(),
            user_id: user.id,
            hh_access_token: access_token,
            hh_expires_at: getCurrentDatetimeFromDate(new Date(Date.now() + expires_in)),
            hh_refresh_token: refresh_token,
            expires_at: getCurrentDatetimeFromDate(tomorrow)
        })
    }

    const getDevelopmentSession = async (): Promise<ISession | undefined> => {
        const today = new Date()
        const tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000))

        return await repositories.SessionRepository.createSession({
            uuid: generateUuid(),
            user_id: 1,
            expires_at: getCurrentDatetimeFromDate(tomorrow)
        })
    }

    return {
        getSessionByUuid,
        callback,
        getDevelopmentSession,
    }
}
