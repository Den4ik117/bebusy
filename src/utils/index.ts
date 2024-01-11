import { Server } from 'ws'
import { createLogger, format, transports } from 'winston'

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

export const SHORT_NAME_OF_WEEKS = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']

export const getZ = (n: number) => n < 10 ? `0${n}` : n

export const getShortDate = (stringDate: string) => {
    const date = new Date(stringDate)

    const now = new Date()
    const yesterday = new Date(now.getTime() - (24 * 60 * 60 * 1000))
    const prevWeek = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000))

    if (date > yesterday) {
        return getZ(date.getHours()) + ':' + getZ(date.getMinutes())
    } else if (date <= yesterday && date > prevWeek) {
        return SHORT_NAME_OF_WEEKS[date.getDay()]
    }

    return `${getZ(date.getDate())}.${getZ(date.getMonth())}.${getZ(date.getFullYear())}`
}

export const getCurrentDatetimeFromDate = (date: Date): string => {
    date = new Date(date.getTime() + (5 * 60 * 60 * 1000))

    return date.toISOString().slice(0, 19).replace('T', ' ')
}

export const getCurrentDatetime = (): string => {
    return getCurrentDatetimeFromDate(new Date())
}

export const getFormattedUpdatedAt = (datetime: string): string => {
    const date = new Date(datetime)

    return `${date.getDate()} ${MONTHS[date.getMonth()].genitive} ${date.getFullYear()} в ${date.getHours()}:${date.getMinutes()}`
}

export const getRandomInteger = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'DD.MM.YYYY HH:mm:ss',
        }),
        format.printf(({ level, message, timestamp }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`
        }),
    ),
    transports: [
        new transports.File({ filename: 'logs/express.log' }),
    ],
})
