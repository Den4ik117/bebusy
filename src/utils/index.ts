import { Server } from 'ws'

export interface IApplication {
    websocket: Server | null
}

export const app: IApplication = {
    websocket: null
}

export const MONTHS = [
    { genitive: 'января' },
    { genitive: 'февраля' },
    { genitive: 'марта' },
    { genitive: 'апреля' },
    { genitive: 'мая' },
    { genitive: 'июня' },
    { genitive: 'июля' },
    { genitive: 'августа' },
    { genitive: 'сентября' },
    { genitive: 'октября' },
    { genitive: 'ноября' },
    { genitive: 'декабря' },
]

export const getCurrentDatetime = (): string => {
    return (new Date()).toISOString().slice(0, 19).replace('T', ' ')
}

export const getFormattedUpdatedAt = (datetime: string): string => {
    const date = new Date(datetime)

    return `${date.getDate()} ${MONTHS[date.getMonth()].genitive} ${date.getFullYear()} в ${date.getHours()}:${date.getMinutes()}`
}
