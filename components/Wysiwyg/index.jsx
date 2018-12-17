import React, {useState} from 'react';
import {Editor} from 'react-draft-wysiwyg';

import Input from '../Input';

import './globals.scss';
import styles from './styles.scss';

function Wysiwyg({name}) {
    const [text, setText] = useState('');

    function onContentStateChange(state) {
        setText(state.blocks[0].text);
    }

    return (
        <div className={styles.wrapper}>
            <Input type={'hidden'} name={name} value={text}/>
            <Editor onContentStateChange={onContentStateChange}/>
        </div>
    )
}

export default Wysiwyg;