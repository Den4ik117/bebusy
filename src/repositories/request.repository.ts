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
            'INSERT INTO requests (full_name, birthdate, about, status, direction_id, user_id, created_at, updated_at, is_mentor, data, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            ['', '', '', RequestStatus.New, 1, userId, getCurrentDatetime(), getCurrentDatetime(), 0, data, type],
        )

        const [row] = await connection.execute<IRequest[]>(
            'SELECT * FROM bebusy.requests WHERE id = LAST_INSERT_ID() LIMIT 1',
        )

        return row[0]
    }

    return {
        createRequest,
    }
}
