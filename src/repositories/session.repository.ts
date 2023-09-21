import { Connection } from 'mysql2/promise'
import { ISession, IUser } from '../models'

export interface SessionRepository {
    createSession(session: Omit<ISession, 'constructor'>): Promise<Omit<ISession, 'constructor'>>
    getSessionByUuid(uuid: string): Promise<ISession | undefined>
}

export const NewSessionRepository = async (connection: Connection): Promise<SessionRepository> => {
    const createSession = async (session: Omit<ISession, 'constructor'>): Promise<Omit<ISession, 'constructor'>> => {
        await connection.execute(
            'INSERT INTO `sessions` (uuid, user_id, expires_at) VALUES (?, ?, ?)',
            [session.uuid, session.user_id, session.expires_at],
        )

        return session
    }

    const getSessionByUuid = async (uuid: string): Promise<ISession | undefined> => {
        const [rows] = await connection.execute<ISession[]>(
            'SELECT * FROM `sessions` WHERE uuid = ?',
            [uuid],
        )

        return rows[0]
    }

    return {
        createSession,
        getSessionByUuid,
    }
}
