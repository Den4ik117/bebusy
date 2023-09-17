import { NewUserService, UserService } from './user.service'
import { MessageService, NewMessageService } from './message.service'
import { Repository } from '../repositories'

export interface Service {
    UserService: UserService
    MessageService: MessageService
}

export const createServices = async (repositories: Repository): Promise<Service> => ({
    UserService: await NewUserService(repositories),
    MessageService: await NewMessageService(repositories),
})
