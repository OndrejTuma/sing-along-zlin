import {stateToHTML} from 'draft-js-export-html';
import {convertFromRaw} from 'draft-js';

export function getHTMLFromStringifiedState(stringState) {
    return stateToHTML(convertFromRaw(JSON.parse(stringState)))
}