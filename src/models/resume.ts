import { RowDataPacket } from 'mysql2'

export interface IHHResume {
    updated_at: string
    title: string
    formatted_updated_at?: string
}

export interface IResume extends RowDataPacket {
    id: number
    uuid: string
    user_id: number
    data: IHHResume
    published_at: string | null
    updated_at: string
    created_at: string
}
