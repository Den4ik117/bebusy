import { NewUserService, UserService } from './user.service'
import { NewMessageService } from './message.service'
import { Repository } from '../repositories'

export interface Service {
    UserService: UserService
    MessageService: any
}

export const createServices = async (repositories: Repository): Promise<Service> => ({
    UserService: await NewUserService(repositories),
    MessageService: await NewMessageService(repositories),
})
