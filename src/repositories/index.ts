import { Connection } from 'mysql2/promise'
import { NewUserRepository, UserRepository } from './user.repository'
import { NewMessageRepository, MessageRepository } from './message.repository'

export interface Repository {
    UserRepository: UserRepository
    MessageRepository: MessageRepository
}

export const createRepositories = async (connection: Connection): Promise<Repository> => ({
    UserRepository: await NewUserRepository(connection),
    MessageRepository: await NewMessageRepository(connection),
})
