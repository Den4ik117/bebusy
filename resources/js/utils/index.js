export const getErrorMessage = (e) => {
    const errors = Object.values(e.response?.data?.errors || {})

    return errors?.[0]?.[0] || 'При запросе произошла неизвестная ошибка'
}
