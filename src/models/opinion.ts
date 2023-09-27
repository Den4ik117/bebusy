import { RowDataPacket } from 'mysql2'

export interface IOpinion extends RowDataPacket {
    id: number
    resume_id: number
    user_id: number
    photo: string | null
    readable: string | null
    capacity: string | null
    experience: string | null
    total: string | null
    comment: string | null
    completed_at: string | null
    updated_at: string | null
    created_at: string | null
}
