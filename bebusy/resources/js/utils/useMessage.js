const iconClasses = {
    success: 'bi-check-circle-fill',
    warning: 'bi-exclamation-circle-fill',
    error: 'bi-x-circle-fill',
}

const show = (text, duration, type) => {
    const id = `message-${Date.now()}`

    document.body.insertAdjacentHTML('beforeend', `
            <div id="${id}" class="alert-message ${type}">
                <i class="bi ${iconClasses[type]}"></i>
                <span>${text}</span>
            </div>
        `)

    const element = document.getElementById(id)

    setTimeout(() => element.classList.add('active'), 100)

    element && setTimeout(() => {
        element.classList.remove('active')

        setTimeout(() => element.remove(), 400)
    }, duration)
}

export const useMessage = () => {
    const success = (text, duration = 10000) => show(text, duration, 'success')
    const warning = (text, duration = 10000) => show(text, duration, 'warning')
    const error = (text, duration = 10000) => show(text, duration, 'error')

    return {
        success,
        warning,
        error,
    }
}
