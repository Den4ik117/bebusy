import { Connection } from 'mysql2/promise'
import { IResume } from '../models'

export interface ResumeRepository {
    getResumesByUserId(userId: number): Promise<IResume[]>
    getResumeByUserIdAndUuid(userId: number, uuid: string): Promise<IResume | undefined>
    updateResumePublishedAtById(id: number, publishedAt: string): Promise<void>
    getResumeById(id: number): Promise<IResume | undefined>
}

export const NewResumeRepository = async (connection: Connection): Promise<ResumeRepository> => {
    const getResumesByUserId = async (userId: number): Promise<IResume[]> => {
        const [rows] = await connection.execute<IResume[]>(
            'SELECT * FROM `resumes` WHERE user_id = ?',
            [userId],
        )

        return rows
    }

    const getResumeByUserIdAndUuid = async (userId: number, uuid: string): Promise<IResume | undefined> => {
        const [rows] = await connection.execute<IResume[]>(
            'SELECT * FROM `resumes` WHERE user_id = ? AND uuid = ? LIMIT 1',
            [userId, uuid],
        )

        return rows[0]
    }

    const updateResumePublishedAtById = async (id: number, publishedAt: string): Promise<void> => {
        await connection.execute(
            'UPDATE `resumes` SET published_at = ? WHERE id = ?',
            [publishedAt, id],
        )
    }

    const getResumeById = async (id: number): Promise<IResume | undefined> => {
        const [rows] = await connection.execute<IResume[]>(
            'SELECT * FROM `resumes` WHERE id = ? LIMIT 1',
            [id],
        )

        return rows[0]
    }

    return {
        getResumesByUserId,
        getResumeByUserIdAndUuid,
        updateResumePublishedAtById,
        getResumeById,
    }
}
