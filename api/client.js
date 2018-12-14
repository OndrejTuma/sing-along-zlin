import fetch from 'cross-fetch';

import {AppError, ApiError, API_ERRORS, ERR_NETWORK, ERR_NETWORK_MSG} from './errors';
import {AUTH_URL} from './urls';

export async function login(login, password) {
    let result;

    result = await apiFetch(AUTH_URL, 'POST', {
        login,
        password,
    });
console.log(result);
    //const accessToken = result.headers.get('Authorization');

    result = await result.json();

    if (result.error) {
        throw new ApiError(result.error, API_ERRORS[result.error] || result.error);
    }

    return result;
}

async function apiFetch(url, method = 'GET', body) {
    let result;

    try {
        result = await fetch(url, {
            method,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                //'APIKey': API_KEY,
            },
            body: JSON.stringify(body),
        });
    }
    catch (e) {
        throw new AppError(ERR_NETWORK, ERR_NETWORK_MSG);
    }

    return result;
}