const meta = document.querySelector('meta[name="csrf-token"]');

export const request = async (url, method = 'GET', data = {}, bearer = '', onSuccess = undefined, onError = undefined) => {
    const init = {
        method: method,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${bearer}`,
            'X-CSRF-TOKEN': meta?.getAttribute('content'),
        },
        body: method !== 'GET' ? JSON.stringify(data) : null,
    };

    return await fetch(`${url}`, init)
        .then((response) => response.json())
        .then(data => onSuccess && onSuccess(data))
        .catch(e => onError && onError(e));
};
