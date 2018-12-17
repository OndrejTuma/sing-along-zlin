import cookie from 'js-cookie';
import tokenName from '../api/token_name';

export function setTokenCookie(token) {
    cookie.set(tokenName, token);
}