export const SHORT_NAME_OF_WEEKS = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']

export const getZ = (n) => n < 10 ? `0${n}` : n

export const getShortDate = (stringDate) => {
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
