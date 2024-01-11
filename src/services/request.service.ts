import { Repository } from '../repositories'
import {IRequest} from "../models/request";

export interface RequestService {
    createRequest(userId: number, data: string, type: string): Promise<IRequest>
}

export const NewRequestService = async (repositories: Repository): Promise<RequestService> => {
    const createRequest = async (userId: number, data: string, type: string): Promise<IRequest> => {
        return await repositories.RequestRepository.createRequest(userId, data, type)
    }

    return {
        createRequest,
    }
}
