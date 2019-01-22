import React from 'react';
import classNames from 'classnames';

import Form from '../Form';
import Input from '../Input';
import PlusSVG from '../../static/svg/plus.svg';
import Wysiwyg from '../Wysiwyg';

import {updateSong} from '../../api/client';
import useGlobalMap from '../../hooks/useGlobalMap';
import {setTokenCookie} from '../../helpers/user';

import styles from './styles.scss';
import Button from "../Button";

function EditSong({song}) {
    const [, , deleteEditingSongs] = useGlobalMap('editingSongs');
    const [, addSong] = useGlobalMap('songs');
    const [, setNotification] = useGlobalMap('notifications');

    async function handleEditSong(refs) {
        const title = refs.get('title').current;
        const text = refs.get('text').current;

        try {
            const data = {
                title: title.value(),
                text: text.value(),
            };

            const {token} = await updateSong(song._id, data);
            setTokenCookie(token);

            addSong(song._id, Object.assign({}, song, data));

            deleteEditingSongs(song._id)
        } catch (e) {
            setNotification(e.message, 'error');
        }
    }

    return (
        <div className={styles.wrapper}>
            <PlusSVG className={classNames(styles.removeSong, 'removeSVG')} onClick={() => deleteEditingSongs(song._id)}/>
            <Form onSubmit={handleEditSong}>
                <Input name={'title'} value={song.title}/>
                <Wysiwyg label={'Text'} name={'text'} formattedValue={song.text}/>
                <Button label={'Uložit'}/>
            </Form>
        </div>
    )
}

export default EditSong;