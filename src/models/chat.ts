import { RowDataPacket } from 'mysql2'
import { IMessage } from './message'

export interface IChat extends RowDataPacket {
    id: number
    uuid: string
    name: string
    type: string
    messages?: IMessage[]
    updated_at: string
    created_at: string
}
