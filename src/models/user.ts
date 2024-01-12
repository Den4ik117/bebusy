import { RowDataPacket } from 'mysql2'

export interface IUser extends RowDataPacket {
    id: number
    uuid: string
    foreign_id: string
    first_name: string
    middle_name: string | null
    last_name: string
    email: string | null
    is_bot: 0 | 1
    token: string | null
    webhook_url: string | null
    remember_token: string | null
    updated_at: string
    created_at: string
}

export class User {
    public id: number
    public first_name: string
    public last_name: string

    constructor(user: IUser) {
        this.id = user.id
        this.first_name = user.first_name
        this.last_name = user.last_name
    }
}

export interface IUserUpdate {
    last_name: string
    first_name: string
}
