import {ACCENTS_IN, ACCENTS_OUT} from '../consts/strings';

export function normalizeString(string) {
    return removeAccents(string).toLocaleLowerCase();
}

export function removeAccents(string, accentsIn = ACCENTS_IN, accentsOut = ACCENTS_OUT) {
    if (typeof string !== 'string') {
        return;
    }

    return string.split('')
        .map((letter) => {
            const accentIndex = accentsIn.indexOf(letter);

            return accentIndex < 0
                ? letter
                : accentsOut[accentIndex];
        })
        .join('');
}

export function escapeString(string) {
    return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

export function highlightString(string, query) {
    const startIndex = normalizeString(string).indexOf(normalizeString(query));

    if (startIndex < 0) {
        return string;
    }

    const endIndex = startIndex + query.length;

    return string.substring(0, startIndex)
        + `<b>${string.substring(startIndex, endIndex)}</b>`
        + string.substring(endIndex);
}

export function generateID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

export function getDataAsURL(params) {
    return Object.entries(params).map(([key, val]) => {
        if (Array.isArray(val)) {
            return val.map(val => `${key}[]=${val}`).join('&');
        }

        return `${key}=${val}`;
    }).join('&');
}

/**
 * Truncates string for given number of characters and stops after word end
 * @param {string} string
 * @param {int} chars
 * @param {string} [ellipsis]
 */
export function truncateString(string, chars, ellipsis = '...') {
    if (string.length <= chars) {
        return string;
    }

    const endPos = string.substring(0, chars).lastIndexOf(' ');

    return string.substring(0, endPos) + ellipsis;
}

/**
 * Returns inflected string
 * @param {int} count
 * @param {Array<string>} strings
 * @returns {string}
 */
export function inflectString(count, strings) {
    if (strings.length === 0) {
        return '';
    }

    if (count <= 0) {
        return strings.length >= 3 ? strings[2] : strings[0];
    }

    if (strings.length === 1 || count === 1) {
        return strings[0];
    }

    if (count > 4 && strings.length >= 3) {
        return strings[2];
    }

    return strings[1];
}