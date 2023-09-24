import { Connection } from 'mysql2/promise'
import { ISession, IUser } from '../models'

interface CreateSession {
    uuid: string
    user_id: number
    hh_access_token?: string
    hh_expires_at?: string
    hh_refresh_token?: string
    expires_at: string
}

export interface SessionRepository {
    createSession(session: CreateSession): Promise<ISession | undefined>
    getSessionByUuid(uuid: string): Promise<ISession | undefined>
}

export const NewSessionRepository = async (connection: Connection): Promise<SessionRepository> => {
    const getSessionByUuid = async (uuid: string): Promise<ISession | undefined> => {
        const [rows] = await connection.execute<ISession[]>(
            'SELECT * FROM `sessions` WHERE uuid = ?',
            [uuid],
        )

        return rows[0]
    }

    const createSession = async (session: CreateSession): Promise<ISession | undefined> => {
        await connection.execute(
            'INSERT INTO `sessions` (uuid, user_id, hh_access_token, hh_expires_at, hh_refresh_token, expires_at) VALUES (?, ?, ?, ?, ?, ?)',
            [session.uuid, session.user_id, session.hh_access_token || null, session.expires_at || null, session.hh_access_token || null, session.expires_at],
        )

        return getSessionByUuid(session.uuid)
    }

    return {
        getSessionByUuid,
        createSession,
    }
}
