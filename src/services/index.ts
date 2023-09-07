import { NewUserService } from './user.service'
import { NewMessageService } from './message.service'
import { Repository } from '../repositories'

export interface Service {

}

export const createServices = async (repositories: Repository): Promise<Service> => ({
    UserService: await NewUserService(repositories),
    MessageService: await NewMessageService(repositories),
})
