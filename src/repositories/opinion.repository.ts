import { Connection } from 'mysql2/promise'
import { IOpinion } from '../models'

type CreateOpinion = Pick<IOpinion, 'resume_id' | 'user_id' | 'created_at' | 'updated_at'>
type UpdateOpinion = Omit<IOpinion, 'constructor'>

export interface OpinionRepository {
    getOpinionsByUserId(userId: number): Promise<IOpinion[]>
    createOpinion(opinion: CreateOpinion): Promise<IOpinion | undefined>
    updateOpinion(opinion: UpdateOpinion): Promise<IOpinion | undefined>
    getUncompletedOpinion(userId: number): Promise<IOpinion | undefined>
    updateOptionPhoto(opinionId: number, photo: number): Promise<IOpinion | undefined>
    updateOptionReadable(opinionId: number, readable: number): Promise<IOpinion | undefined>
    updateOptionCapacity(opinionId: number, capacity: number): Promise<IOpinion | undefined>
    updateOptionExperience(opinionId: number, experience: number): Promise<IOpinion | undefined>
    updateOptionTotal(opinionId: number, total: number): Promise<IOpinion | undefined>
    updateOptionCommentAndCompletedAt(opinionId: number, completedAt: string, comment: string): Promise<IOpinion | undefined>
    getOpinionsByResumeIds(resumeIds: number[]): Promise<IOpinion[]>
    getOpinionsByResumeId(resumeId: number): Promise<IOpinion[]>
}

export const NewOpinionRepository = async (connection: Connection): Promise<OpinionRepository> => {
    const getOpinionsByUserId = async (userId: number): Promise<IOpinion[]> => {
        const [rows] = await connection.execute<IOpinion[]>(
            'SELECT * FROM `opinions` WHERE user_id = ?',
            [userId],
        )

        return rows
    }

    const createOpinion = async (opinion: CreateOpinion): Promise<IOpinion | undefined> => {
        await connection.execute(
            'INSERT INTO `opinions` (resume_id, user_id, created_at, updated_at) VALUES (?, ?, ?, ?)',
            [opinion.resume_id, opinion.user_id, opinion.created_at, opinion.updated_at],
        )

        const [rows] = await connection.execute<IOpinion[]>(
            'SELECT * FROM `opinions` WHERE id = LAST_INSERT_ID() LIMIT 1',
        )

        return rows[0]
    }

    const updateOpinion = async (opinion: UpdateOpinion): Promise<IOpinion | undefined> => {
        await connection.execute(
            'UPDATE `opinions` SET user_id = ? WHERE id = ?',
            [opinion.user_id, opinion.id],
        )

        const [rows] = await connection.execute<IOpinion[]>(
            'SELECT * FROM `opinions` WHERE id = ? LIMIT 1',
            [opinion.id],
        )

        return rows[0]
    }

    const getUncompletedOpinion = async (userId: number): Promise<IOpinion | undefined> => {
        const [rows] = await connection.execute<IOpinion[]>(
            'SELECT * FROM `opinions` WHERE user_id = ? AND completed_at IS NULL ORDER BY id DESC LIMIT 1',
            [userId],
        )

        return rows[0]
    }

    const updateOptionPhoto = async (opinionId: number, photo: number): Promise<IOpinion | undefined> => {
        await connection.execute(
            'UPDATE `opinions` SET photo = ? WHERE id = ?',
            [photo, opinionId],
        )

        const [rows] = await connection.execute<IOpinion[]>(
            'SELECT * FROM `opinions` WHERE id = ? LIMIT 1',
            [opinionId],
        )

        return rows[0]
    }

    const updateOptionReadable = async (opinionId: number, readable: number): Promise<IOpinion | undefined> => {
        await connection.execute(
            'UPDATE `opinions` SET readable = ? WHERE id = ?',
            [readable, opinionId],
        )

        const [rows] = await connection.execute<IOpinion[]>(
            'SELECT * FROM `opinions` WHERE id = ? LIMIT 1',
            [opinionId],
        )

        return rows[0]
    }

    const updateOptionCapacity = async (opinionId: number, capacity: number): Promise<IOpinion | undefined> => {
        await connection.execute(
            'UPDATE `opinions` SET capacity = ? WHERE id = ?',
            [capacity, opinionId],
        )

        const [rows] = await connection.execute<IOpinion[]>(
            'SELECT * FROM `opinions` WHERE id = ? LIMIT 1',
            [opinionId],
        )

        return rows[0]
    }

    const updateOptionExperience = async (opinionId: number, experience: number): Promise<IOpinion | undefined> => {
        await connection.execute(
            'UPDATE `opinions` SET experience = ? WHERE id = ?',
            [experience, opinionId],
        )

        const [rows] = await connection.execute<IOpinion[]>(
            'SELECT * FROM `opinions` WHERE id = ? LIMIT 1',
            [opinionId],
        )

        return rows[0]
    }

    const updateOptionTotal = async (opinionId: number, total: number): Promise<IOpinion | undefined> => {
        await connection.execute(
            'UPDATE `opinions` SET total = ? WHERE id = ?',
            [total, opinionId],
        )

        const [rows] = await connection.execute<IOpinion[]>(
            'SELECT * FROM `opinions` WHERE id = ? LIMIT 1',
            [opinionId],
        )

        return rows[0]
    }

    const updateOptionCommentAndCompletedAt = async (opinionId: number, completedAt: string, comment: string): Promise<IOpinion | undefined> => {
        await connection.execute(
            'UPDATE `opinions` SET comment = ?, completed_at = ? WHERE id = ?',
            [comment, completedAt, opinionId],
        )

        const [rows] = await connection.execute<IOpinion[]>(
            'SELECT * FROM `opinions` WHERE id = ? LIMIT 1',
            [opinionId],
        )

        return rows[0]
    }

    const getOpinionsByResumeIds = async (resumeIds: number[]): Promise<IOpinion[]> => {
        if (resumeIds.length === 0) return []

        const [rows] = await connection.execute<IOpinion[]>(
            `SELECT * FROM opinions WHERE resume_id IN (${resumeIds.join(',')})`
        )

        return rows
    }

    const getOpinionsByResumeId = async (resumeId: number): Promise<IOpinion[]> => {
        const [rows] = await connection.execute<IOpinion[]>(
            `SELECT * FROM opinions WHERE resume_id = ?`,
            [resumeId],
        )

        return rows
    }

    return {
        getOpinionsByUserId,
        createOpinion,
        updateOpinion,
        getUncompletedOpinion,
        updateOptionPhoto,
        updateOptionReadable,
        updateOptionCapacity,
        updateOptionExperience,
        updateOptionTotal,
        updateOptionCommentAndCompletedAt,
        getOpinionsByResumeIds,
        getOpinionsByResumeId,
    }
}
