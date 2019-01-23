import cookie from 'js-cookie';
import cookieName from 'Api/cookie-name';

export function getUserCookie() {
    return cookie.get(cookieName);
}