import { RowDataPacket } from 'mysql2'

export interface IHHResume {
    updated_at: string
    formatted_updated_at?: string
}

export interface IResume extends RowDataPacket {
    id: number
    user_id: number
    data: IHHResume
    updated_at: string
    created_at: string
}
