import axios from "axios";

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

export const goToChat = (user) => {
    const data = {
        user_id: user.id,
    }

    axios.post('/api/chats', data)
        .then(response => {
            location.reload()
        })
}

export const getErrorMessage = (e) => {
    const errors = Object.values(e.response?.data?.errors || {})

    return errors?.[0]?.[0] || 'При запросе произошла неизвестная ошибка'
}
