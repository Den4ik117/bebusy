import { Repository } from '../repositories'
import { ISession } from '../models'
import { v4 as generateUuid } from 'uuid'
import { getCurrentDatetimeFromDate } from '../utils'
import axios from "axios";

export interface SessionService {
    authenticate(email: string): Promise<Omit<ISession, 'constructor'> | null>
    getSessionByUuid(uuid: string): Promise<ISession | undefined>
    callback(code: string): Promise<Omit<ISession, 'constructor'> | null | undefined>
}

export const NewSessionService = async (repositories: Repository): Promise<SessionService> => {
    const authenticate = async (email: string): Promise<Omit<ISession, 'constructor'> | null> => {
        const user = await repositories.UserRepository.getUserByEmail(email)

        if (!user) return null

        const today = new Date()
        const tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000))

        return await repositories.SessionRepository.createSession({
            uuid: generateUuid(),
            user_id: user.id,
            expires_at: getCurrentDatetimeFromDate(tomorrow)
        })
    }

    const getSessionByUuid = async (uuid: string): Promise<ISession | undefined> => {
        return await repositories.SessionRepository.getSessionByUuid(uuid)
    }

    const callback = async (code: string): Promise<Omit<ISession, 'constructor'> | null | undefined> => {
        const params = new URLSearchParams({
            client_id: <string> process.env.HH_CLIENT_ID,
            client_secret: <string> process.env.HH_CLIENT_SECRET,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: `${process.env.APP_URL}/oauth/callback`,
        })

        const url = `https://hh.ru/oauth/token?${params.toString()}`

        const response = await axios.post(url)

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
                foreign_id: me.data.id,
                first_name: me.data.first_name,
                middle_name: me.data.middle_name,
                last_name: me.data.last_name,
                email: me.data.email,
                data: JSON.stringify(me.data),
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
            expires_at: getCurrentDatetimeFromDate(tomorrow)
        })

        // Cache::put("access_token_{$user->uuid}", $data['access_token'], $data['expires_in']);
        // Cache::forever("refresh_token_{$user->uuid}", $data['refresh_token']);
        //
        // Auth::login($user, true);
        //
        // $request->session()->regenerate();
        //
        // return to_route('index')->with('success', 'Успешная авторизация');
    }

    return {
        authenticate,
        getSessionByUuid,
        callback,
    }
}
