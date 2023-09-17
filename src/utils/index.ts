import { Server } from 'ws'

export interface IApplication {
    websocket: Server | null
}

export const app: IApplication = {
    websocket: null
}

export const getCurrentDatetime = (): string => {
    return (new Date()).toISOString().slice(0, 19).replace('T', ' ')
}
