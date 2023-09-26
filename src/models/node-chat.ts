import { RowDataPacket } from 'mysql2'

export interface INodeChat extends RowDataPacket {
    user_id: number
    chat_id: number
    node_id: number
}
