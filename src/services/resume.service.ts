import { IResume } from '../models'
import { Repository } from '../repositories'
import {getCurrentDatetime, getFormattedUpdatedAt} from "../utils";

export interface ResumeService {
    getResumesByUserId(userId: number): Promise<IResume[]>
    updateResumePublishedAtByUserIdAndUuid(userId: number, uuid: string): Promise<IResume | null>
    getPublishedResumesByUserId(userId: number): Promise<IResume[]>
    publishResume(resumeId: number): Promise<void>
    unpublishResume(resumeId: number): Promise<void>
}

export const NewResumeService = async (repositories: Repository): Promise<ResumeService> => {
    const getResumesByUserId = async (userId: number): Promise<IResume[]> => {
        return await repositories.ResumeRepository.getResumesByUserId(userId)

        // for (let i = 0; i < resumes.length; i++) {
        //     resumes[i].data.formatted_updated_at = getFormattedUpdatedAt(resumes[i].data.updated_at)
        // }

        // return resumes
    }

    const updateResumePublishedAtByUserIdAndUuid = async (userId: number, uuid: string): Promise<IResume | null> => {
        let resume = await repositories.ResumeRepository.getResumeByUserIdAndUuid(userId, uuid)

        if (!resume) return null

        await repositories.ResumeRepository.updateResumePublishedAtById(resume.id, getCurrentDatetime())

        return await repositories.ResumeRepository.getResumeById(resume.id) || null

        // if (!resume) return null
        //
        // resume.data.formatted_updated_at = getFormattedUpdatedAt(resume.data.updated_at)
        //
        // return resume
    }

    const getPublishedResumesByUserId = async (userId: number): Promise<IResume[]> => {
        return await repositories.ResumeRepository.getPublishedResumesByUserId(userId)
    }

    const publishResume = async (resumeId: number): Promise<void> => {
        return await repositories.ResumeRepository.updateResumePublishedAtById(resumeId, getCurrentDatetime())
    }

    const unpublishResume = async (resumeId: number): Promise<void> => {
        return await repositories.ResumeRepository.updateResumePublishedAtById(resumeId, null)
    }

    return {
        getResumesByUserId,
        updateResumePublishedAtByUserIdAndUuid,
        getPublishedResumesByUserId,
        publishResume,
        unpublishResume,
    }
}
