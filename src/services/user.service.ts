import { User } from '../models'
import { IUser } from '../models/user'
import { Repository } from '../repositories'

export interface UserService {
    getUserByToken(token: string): Promise<IUser | undefined>
}

export const NewUserService = async (repositories: Repository): Promise<UserService> => {
    const getUserByToken = async (token: string): Promise<IUser | undefined> => {
        return await repositories.UserRepository.getUserByToken(token)
    }

    return {
        getUserByToken,
    }
}
