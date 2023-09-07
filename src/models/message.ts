import { RowDataPacket } from 'mysql2'

export interface IMessage extends RowDataPacket {
    id: number
    text: string
    user_id: number | null
    chat_id: number
    updated_at: string
    created_at: string
}


export class Message {
    
}