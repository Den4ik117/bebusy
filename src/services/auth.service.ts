import { Repository } from '../repositories'
import { ISession } from '../models'
import { v4 as generateUuid } from 'uuid'
import { getCurrentDatetimeFromDate } from '../utils'

export interface SessionService {
    authenticate(email: string): Promise<Omit<ISession, 'constructor'> | null>
    getSessionByUuid(uuid: string): Promise<ISession | undefined>
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

    return {
        authenticate,
        getSessionByUuid,
    }
}
