import { IResume } from '../models'
import { Repository } from '../repositories'
import {getCurrentDatetime, getFormattedUpdatedAt} from "../utils";

export interface ResumeService {
    getResumesByUserId(userId: number): Promise<IResume[]>
    updateResumePublishedAtByUserIdAndUuid(userId: number, uuid: string): Promise<IResume | null>
}

export const NewResumeService = async (repositories: Repository): Promise<ResumeService> => {
    const getResumesByUserId = async (userId: number): Promise<IResume[]> => {
        const resumes = await repositories.ResumeRepository.getResumesByUserId(userId)

        for (let i = 0; i < resumes.length; i++) {
            resumes[i].data.formatted_updated_at = getFormattedUpdatedAt(resumes[i].data.updated_at)
        }

        return resumes
    }

    const updateResumePublishedAtByUserIdAndUuid = async (userId: number, uuid: string): Promise<IResume | null> => {
        let resume = await repositories.ResumeRepository.getResumeByUserIdAndUuid(userId, uuid)

        if (!resume) return null

        await repositories.ResumeRepository.updateResumePublishedAtById(resume.id, getCurrentDatetime())

        resume = await repositories.ResumeRepository.getResumeById(resume.id)

        if (!resume) return null

        resume.data.formatted_updated_at = getFormattedUpdatedAt(resume.data.updated_at)

        return resume
    }

    return {
        getResumesByUserId,
        updateResumePublishedAtByUserIdAndUuid,
    }
}
