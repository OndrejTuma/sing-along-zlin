import React, {useState} from 'react';
import {EditorState, convertToRaw} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';

import Input from '../Input';

import './globals.scss';
import styles from './styles.scss';

function Wysiwyg({label, name}) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    function onEditorStateChange(state) {
        setEditorState(state);
    }

    return (
        <div className={styles.wrapper}>
            <Input type={'hidden'} name={name} value={JSON.stringify(convertToRaw(editorState.getCurrentContent()))}/>
            <label>{label}</label>
            <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
            />
        </div>
    )
}

export default Wysiwyg;