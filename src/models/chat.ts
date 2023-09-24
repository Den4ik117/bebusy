import { RowDataPacket } from 'mysql2'
import { IMessage } from './message'

export type ChatType = 'PRIVATE'

export interface IChat extends RowDataPacket {
    id: number
    uuid: string
    name: string
    type: ChatType
    messages?: IMessage[]
    updated_at: string
    created_at: string
}
