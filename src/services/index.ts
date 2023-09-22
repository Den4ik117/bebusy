import { NewUserService, UserService } from './user.service'
import { NewMessageService, MessageService } from './message.service'
import { NewResumeService, ResumeService } from './resume.service'
import { NewSessionService, SessionService } from './auth.service'
import { NewChatService, ChatService } from './chat.service'
import { Repository } from '../repositories'

export interface Service {
    UserService: UserService
    MessageService: MessageService
    ResumeService: ResumeService
    SessionService: SessionService
    ChatService: ChatService
}

export const createServices = async (repositories: Repository): Promise<Service> => ({
    UserService: await NewUserService(repositories),
    MessageService: await NewMessageService(repositories),
    ResumeService: await NewResumeService(repositories),
    SessionService: await NewSessionService(repositories),
    ChatService: await NewChatService(repositories),
})
