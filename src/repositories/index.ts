import { Connection } from 'mysql2/promise'
import { NewUserRepository, UserRepository } from './user.repository'
import { NewMessageRepository, MessageRepository } from './message.repository'
import { NewUpdateRepository, UpdateRepository } from './update.repository'
import { NewResumeRepository, ResumeRepository } from './resume.repository'
import { NewSessionRepository, SessionRepository } from './session.repository'
import { NewChatRepository, ChatRepository } from './chat.repository'
import { NewNodeChatRepository, NodeChatRepository } from './node-chat.repository'

export interface Repository {
    UserRepository: UserRepository
    MessageRepository: MessageRepository
    UpdateRepository: UpdateRepository
    ResumeRepository: ResumeRepository
    SessionRepository: SessionRepository
    ChatRepository: ChatRepository
    NodeChatRepository: NodeChatRepository
}

export const createRepositories = async (connection: Connection): Promise<Repository> => ({
    UserRepository: await NewUserRepository(connection),
    MessageRepository: await NewMessageRepository(connection),
    UpdateRepository: await NewUpdateRepository(connection),
    ResumeRepository: await NewResumeRepository(connection),
    SessionRepository: await NewSessionRepository(connection),
    ChatRepository: await NewChatRepository(connection),
    NodeChatRepository: await NewNodeChatRepository(connection),
})
