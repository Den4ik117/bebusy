import { Service } from '../services'
import { NewUserHandler, UserHandler } from './user.handler'

export interface Handler {
    UserHandler: UserHandler
}

export const createHandlers = async (service: Service): Promise<Handler> => ({
    UserHandler: await NewUserHandler(service),
})
