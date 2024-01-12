import { RowDataPacket } from 'mysql2'

export enum RequestType {
    FindMentor = 'FIND_MENTOR',
    BecomeMentor = 'BECOME_MENTOR',
    RequestCodeReview = 'REQUEST_CODE_REVIEW',
    IndividualInterview = 'INDIVIDUAL_INTERVIEW',
    GroupInterview = 'GROUP_INTERVIEW',
}

export interface IRequest extends RowDataPacket {
    id: number
    full_name: string
    birthdate: string
    about: string
    status: string
    direction_id: number
    user_id: number
    created_at: string
    updated_at: string
    is_mentor: number
    data: string
    type: RequestType
}
