export const ERR_FORM = 'ERR_FORM';
export const ERR_FORM_MSG = 'Nesprávně vyplněný formulář';
export const ERR_NETWORK = 'ERR_NETWORK';
export const ERR_NETWORK_MSG = 'Failed to fetch!';
export const ERR_RUNTIME = 'ERR_RUNTIME';
export const ERR_RUNTIME_MSG = 'Runtime Error!';

export const API_ERRORS = {
    'User.InvalidPassword': 'Invalid password',
    'Validation': 'Invalid credentials',
};

export class AppError extends Error {
    /** @type {string} */
    code;
    /** @type {Error} */
    cause;

    /**
     * @param {string} code
     * @param {string} message
     * @param {Error} [cause]
     **/
    constructor(code, message, cause) {
        super(message);

        this.code = code;
        this.message = message;
        this.cause = cause;
    }
}

export class ApiError extends AppError {}