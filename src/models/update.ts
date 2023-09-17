import { RowDataPacket } from 'mysql2'
import { IMessage } from './message';

export interface IUpdate extends RowDataPacket {
    id: number
    message_id: number
    user_id: number
    processed_at?: null | string
    message?: IMessage
}
