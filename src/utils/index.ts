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

export const getCurrentDatetimeFromDate = (date: Date): string => {
    return date.toISOString().slice(0, 19).replace('T', ' ')
}

export const getCurrentDatetime = (): string => {
    return getCurrentDatetimeFromDate(new Date())
}

export const getFormattedUpdatedAt = (datetime: string): string => {
    const date = new Date(datetime)

    return `${date.getDate()} ${MONTHS[date.getMonth()].genitive} ${date.getFullYear()} в ${date.getHours()}:${date.getMinutes()}`
}
