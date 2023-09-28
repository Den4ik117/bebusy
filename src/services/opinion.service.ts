import { Repository } from '../repositories'
import { IOpinion } from '../models'

export interface OpinionService {
    getOpinionsByResumeIds(resumeIds: number[]): Promise<IOpinion[]>
    getOpinionsByResumeId(resumeId: number): Promise<IOpinion[]>
    getOpinionsByUserId(userId: number): Promise<IOpinion[]>
}

export const NewOpinionService = async (repositories: Repository): Promise<OpinionService> => {
    const getOpinionsByResumeIds = async (resumeIds: number[]): Promise<IOpinion[]> => {
        return await repositories.OpinionRepository.getOpinionsByResumeIds(resumeIds)
    }

    const getOpinionsByResumeId = async (resumeId: number): Promise<IOpinion[]> => {
        return await repositories.OpinionRepository.getOpinionsByResumeId(resumeId)
    }

    const getOpinionsByUserId = async (userId: number): Promise<IOpinion[]> => {
        return await repositories.OpinionRepository.getOpinionsByUserId(userId)
    }

    return {
        getOpinionsByResumeIds,
        getOpinionsByResumeId,
        getOpinionsByUserId,
    }
}
