import { Repository } from '../repositories'
import { NewUserService, UserService } from './user.service'
import { NewMessageService, MessageService } from './message.service'
import { NewResumeService, ResumeService } from './resume.service'
import { NewSessionService, SessionService } from './auth.service'
import { NewChatService, ChatService } from './chat.service'
import { NewResumeBotService, ResumeBotService } from './resume-bot.service'
import { NewOpinionService, OpinionService } from './opinion.service'

export interface Service {
    UserService: UserService
    MessageService: MessageService
    ResumeService: ResumeService
    SessionService: SessionService
    ChatService: ChatService
    ResumeBotService: ResumeBotService
    OpinionService: OpinionService
}

export const createServices = async (repositories: Repository): Promise<Service> => ({
    UserService: await NewUserService(repositories),
    MessageService: await NewMessageService(repositories),
    ResumeService: await NewResumeService(repositories),
    SessionService: await NewSessionService(repositories),
    ChatService: await NewChatService(repositories),
    ResumeBotService: await NewResumeBotService(repositories),
    OpinionService: await NewOpinionService(repositories),
})
