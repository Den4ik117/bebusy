import { IUser } from '../models'
import { Repository } from '../repositories'

export interface UserService {
    getUserByToken(token: string): Promise<IUser | undefined>
    getUserById(id: number): Promise<IUser | undefined>
    getUsersExceptSelfAndBots(selfIf: number): Promise<IUser[]>
}

export const NewUserService = async (repositories: Repository): Promise<UserService> => {
    const getUserByToken = async (token: string): Promise<IUser | undefined> => {
        return await repositories.UserRepository.getUserByToken(token)
    }

    const getUserById = async (id: number): Promise<IUser | undefined> => {
        return await repositories.UserRepository.getUserById(id)
    }

    const getUsersExceptSelfAndBots = async (selfIf: number): Promise<IUser[]> => {
        return await repositories.UserRepository.getUsersExceptSelfAndBots(selfIf)
    }

    return {
        getUserByToken,
        getUserById,
        getUsersExceptSelfAndBots,
    }
}
