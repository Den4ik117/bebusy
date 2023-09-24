import { RowDataPacket } from 'mysql2'

export interface ISession extends RowDataPacket {
    uuid: string
    user_id: number
    hh_access_token?: string | null
    hh_expires_at?: string | null
    hh_refresh_token?: string | null
    expires_at: string
}
