import { Connection } from 'mysql2/promise'
import { IUpdate } from '../models'
import {getCurrentDatetime} from "../utils";

export interface UpdateRepository {
    createUpdate(message: Omit<IUpdate, 'id'>): Promise<IUpdate>
}

export const NewUpdateRepository = async (connection: Connection): Promise<UpdateRepository> => {
    const createUpdate = async (update: Omit<IUpdate, 'id' | 'processed_at'>): Promise<IUpdate> => {
        await connection.execute(
            'INSERT INTO `updates` (message_id, user_id, updated_at, created_at) VALUES (?, ?, ?, ?)',
            [update.message_id, update.user_id, getCurrentDatetime(), getCurrentDatetime()],
        )

        const [rows] = await connection.execute<IUpdate[]>('SELECT * FROM `updates` WHERE `id` = LAST_INSERT_ID() LIMIT 1')

        return rows[0]
    }

    return {
        createUpdate,
    }
}
