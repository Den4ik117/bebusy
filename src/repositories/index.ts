import { Connection } from 'mysql2/promise'
import { NewUserRepository, UserRepository } from './user.repository'
import { NewMessageRepository, MessageRepository } from './message.repository'
import { NewUpdateRepository, UpdateRepository } from './update.repository'

export interface Repository {
    UserRepository: UserRepository
    MessageRepository: MessageRepository
    UpdateRepository: UpdateRepository
}

export const createRepositories = async (connection: Connection): Promise<Repository> => ({
    UserRepository: await NewUserRepository(connection),
    MessageRepository: await NewMessageRepository(connection),
    UpdateRepository: await NewUpdateRepository(connection),
})
