import { RowDataPacket } from 'mysql2'
import { IUser } from './user';

export interface IMessage extends RowDataPacket {
    id: number
    text: string
    user_id: number | null
    chat_id: number
    updated_at: string
    created_at: string
    user?: IUser
}


export class Message {

}
