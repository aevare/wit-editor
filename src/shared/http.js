export const post = (url, data, options) => {
    return fetch(url, {
            method: "POST",
            credentials: 'same-origin',
            headers: {
                'Content-Type' : 'application/json; charset=utf-8'
            },
            body: data,
            ...options
        });
}

export const put = (url, data, options) => {
    return fetch(url, {
            method: "PUT",
            credentials: 'same-origin',
            headers: {
                'Content-Type' : 'application/json; charset=utf-8'
            },
            body: data,
            ...options
        });
}

export const get = (url) => {
    return fetch(url, {
            credentials: 'same-origin',
            headers: {
                'Content-Type' : 'application/json; charset=utf-8'
            }
        });
}

export const del = (url, options) => {
    return fetch(url, {
            method: "DELETE",
            credentials: 'same-origin',
            headers: {
                'Content-Type' : 'application/json; charset=utf-8'
            },
            ...options
        });
}