export const SHORT_NAME_OF_WEEKS = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
export const NAME_OF_MONTHS = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
]
export const PLUR_YEARS = ['год', 'года', 'лет']
export const PLUR_MONTHS = ['месяц', 'месяца', 'месяцев']

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

export const getCookie = (name) => {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const plural = (forms, n) => {
    let idx;
    if (n % 10 === 1 && n % 100 !== 11) {
        idx = 0;
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        idx = 1;
    } else {
        idx = 2;
    }
    return forms[idx] || '';
}

export const getAge = (date) => {
    const birthdate = (new Date(date)).getTime()
    const currentDate = Date.now()

    const difference = ((currentDate - birthdate) / (365 * 24 * 60 * 60 * 1000)).toFixed()

    return difference + ' ' + plural(PLUR_YEARS, difference)
}

export const getHumanDate = (date) => {
    const newDate = new Date(date)

    return `${newDate.getDate()} ${NAME_OF_MONTHS[newDate.getMonth()]} ${newDate.getFullYear()}`
}

export const getHumanExperience = (months) => {
    const y = (months / 12).toFixed()
    const m = months % 12

    return `${y} ${plural(PLUR_YEARS, y)} ${m} ${plural(PLUR_MONTHS, m)}`
}
