import { RowDataPacket } from 'mysql2'
import { IUser } from './user'
import { IResume } from './resume'

export interface IAction {
    text: string
}

export interface IMessage extends RowDataPacket {
    id: number
    text: string
    user_id: number | null
    chat_id: number
    resume_id: number | null
    updated_at: string
    created_at: string
    user?: IUser
    resume?: IResume
    actions?: IAction[][]
}
