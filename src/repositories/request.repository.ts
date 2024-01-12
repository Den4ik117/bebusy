import { Connection } from 'mysql2/promise'
import { RequestStatus} from '../models'
import {getCurrentDatetime} from "../utils";
import {IRequest} from "../models/request";

export interface RequestRepository {
    createRequest(userId: number, data: string, type: string): Promise<IRequest>
}

export const NewRequestRepository = async (connection: Connection): Promise<RequestRepository> => {
    const createRequest = async (userId: number, data: string, type: string): Promise<IRequest> => {
        await connection.execute(
            'INSERT INTO requests (status, user_id, created_at, updated_at, data, type) VALUES (?, ?, ?, ?, ?, ?)',
            [RequestStatus.New, userId, getCurrentDatetime(), getCurrentDatetime(), data, type],
        )

        const [row] = await connection.execute<IRequest[]>(
            'SELECT * FROM requests WHERE id = LAST_INSERT_ID() LIMIT 1',
        )

        return row[0]
    }

    return {
        createRequest,
    }
}
