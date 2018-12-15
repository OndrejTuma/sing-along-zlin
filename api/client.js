import fetch from 'cross-fetch';

import {AppError, ApiError, API_ERRORS, ERR_NETWORK, ERR_NETWORK_MSG} from './errors';
import {AUTH_URL, CREATE_SONG_URL, DELETE_SONG_URL} from './urls';

export function createSong(title, text) {
    return apiFetch(CREATE_SONG_URL, 'POST', {
        title,
        text,
    });
}
export function deleteSong(title) {
    return apiFetch(DELETE_SONG_URL, 'POST', {
        title,
    });
}
export function login(login, password) {
    return apiFetch(AUTH_URL, 'POST', {
        login,
        password,
    });
}

async function apiFetch(url, method = 'GET', body) {
    let result;

    try {
        result = await fetch(url, {
            method,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    }
    catch (e) {
        throw new AppError(ERR_NETWORK, ERR_NETWORK_MSG);
    }

    if (result.status >= 400) {
        result = await result.json();

        throw new AppError(ERR_NETWORK, result.message);
    }

    result = await result.json();

    if (result.error) {
        throw new ApiError(result.error, API_ERRORS[result.error] || result.error);
    }

    return result;
}