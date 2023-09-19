import { NewUserService, UserService } from './user.service'
import { NewMessageService, MessageService } from './message.service'
import { NewResumeService, ResumeService } from './resume.service'
import { Repository } from '../repositories'

export interface Service {
    UserService: UserService
    MessageService: MessageService
    ResumeService: ResumeService
}

export const createServices = async (repositories: Repository): Promise<Service> => ({
    UserService: await NewUserService(repositories),
    MessageService: await NewMessageService(repositories),
    ResumeService: await NewResumeService(repositories),
})
