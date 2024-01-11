import { RowDataPacket } from 'mysql2'
import { IMessage } from './message'

export type ChatType = 'PRIVATE' | 'GROUP'

export interface IChat extends RowDataPacket {
    id: number
    uuid: string
    name: string
    type: ChatType
    messages?: IMessage[]
    updated_at: string
    created_at: string
}

export interface IChatIntersect extends RowDataPacket {
    chat_id: number
}
