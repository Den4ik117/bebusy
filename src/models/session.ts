import { RowDataPacket } from 'mysql2'

export interface ISession extends RowDataPacket {
    uuid: string
    user_id: number
    expires_at: string | null
}
