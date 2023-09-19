import { Connection } from 'mysql2/promise'
import { NewUserRepository, UserRepository } from './user.repository'
import { NewMessageRepository, MessageRepository } from './message.repository'
import { NewUpdateRepository, UpdateRepository } from './update.repository'
import { NewResumeRepository, ResumeRepository } from './resume.repository'

export interface Repository {
    UserRepository: UserRepository
    MessageRepository: MessageRepository
    UpdateRepository: UpdateRepository
    ResumeRepository: ResumeRepository
}

export const createRepositories = async (connection: Connection): Promise<Repository> => ({
    UserRepository: await NewUserRepository(connection),
    MessageRepository: await NewMessageRepository(connection),
    UpdateRepository: await NewUpdateRepository(connection),
    ResumeRepository: await NewResumeRepository(connection),
})
