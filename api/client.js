import fetch from 'cross-fetch';
import cookie from 'js-cookie';

import {AppError, ApiError, API_ERRORS, ERR_NETWORK, ERR_NETWORK_MSG} from './errors';
import {
    REPERTOIRE_CREATE_URL,
    REPERTOIRE_FETCH_ALL_URL,
    REPERTOIRE_FETCH_URL,
    SECTION_CREATE_URL,
    SECTION_FETCH_URL,
    SONG_CREATE_URL,
    SONG_DELETE_URL,
    SONG_FETCH_ALL_URL,
    USER_CREATE_URL,
    USER_LOGIN_URL,
} from './urls';
import tokenName from './token_name';

export function createRepertoir(title) {
    return apiFetch(REPERTOIRE_CREATE_URL, 'POST', {
        title,
    });
}

export function createSection(title, song, repertoireId) {
    return apiFetch(SECTION_CREATE_URL, 'POST', {
        title,
        song,
        repertoireId,
    });
}

export function createSong(title, text) {
    return apiFetch(SONG_CREATE_URL, 'POST', {
        title,
        text,
    });
}

export function createUser(login, password) {
    return apiFetch(USER_CREATE_URL, 'POST', {
        login,
        password,
    });
}

export function deleteSong(title) {
    return apiFetch(SONG_DELETE_URL, 'POST', {
        title,
    });
}

export function fetchRepertoire(id) {
    return apiFetch(`${REPERTOIRE_FETCH_URL}/${id}`);
}

export function fetchRepertoires() {
    return apiFetch(REPERTOIRE_FETCH_ALL_URL);
}

export function fetchSectionsInRepertoar(repertoireId) {
    return apiFetch(`${SECTION_FETCH_URL}/${repertoireId}`);
}

export function fetchSongs() {
    return apiFetch(SONG_FETCH_ALL_URL);
}

export function login(login, password) {
    return apiFetch(USER_LOGIN_URL, 'POST', {
        login,
        password,
    });
}

export function logout() {
    return cookie.remove(tokenName);
}

async function apiFetch(url, method = 'POST', body) {
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
    } catch (e) {
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