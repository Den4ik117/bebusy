import { Router, IRouter } from 'express'
import { Handler } from '../handlers'

export const createRouter = async (hadlers: Handler): Promise<IRouter> => {
    const router = Router()

    router.get('/', hadlers.UserHandler.getCurrentUser)

    return router
}
