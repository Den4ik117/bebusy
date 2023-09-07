import { Connection } from 'mysql2/promise'
import { NewUserRepository } from './user.repository'
import { NewMessageRepository } from './message.repository'

export interface Repository {
    
}

export const createRepositories = async (connection: Connection): Promise<Repository> => ({
    UserRepository: await NewUserRepository(connection),
    MessageRepository: await NewMessageRepository(connection),
})
