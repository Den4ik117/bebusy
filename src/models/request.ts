import { RowDataPacket } from 'mysql2'

export interface IRequest extends RowDataPacket {
    id: number
    full_name: string
    birthdate: string
    about: string
    status: string
    direction_id: number
    user_id: number
    created_at: string
    updated_at: string
    is_mentor: number
    data: string
    type: string
}
