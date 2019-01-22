import React, {useState} from 'react';
import classNames from 'classnames';

import Form from '../Form';
import Input from '../Input';
import PlusSVG from '../../static/svg/plus.svg';
import PencilSVG from '../../static/svg/pencil.svg';
import BinSVG from '../../static/svg/bin.svg';
import Wysiwyg from '../Wysiwyg';

import {deleteSong as deleteSongAPI, updateSong} from '../../api/client';
import useGlobalMap from '../../hooks/useGlobalMap';
import {setTokenCookie} from '../../helpers/user';
import {getHTMLFromStringifiedState} from '../../helpers/wysiwyg';

import styles from './styles.scss';
import Button from "../Button";

function Song({song}) {
    const [isEditing, setIsEditing] = useState(false);
    const [songTextIsVisible, setSongTextIsVisible] = useState(false);
    const [, addSong, deleteSong] = useGlobalMap('songs');
    const [, setNotification] = useGlobalMap('notifications');

    async function handleDeleteSong() {
        if (!confirm(`Opravdu smazat '${song.title}'?`)) {
            return;
        }

        try {
            const {token} = await deleteSongAPI(song.title);

            deleteSong(song._id);
            setTokenCookie(token);
        } catch (e) {
            setNotification(e.message, 'error');
        }
    }
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

            const updatedSong = Object.assign({}, song, data);
            deleteSong(song._id);
            addSong(song._id, updatedSong);

            setIsEditing(false);
        } catch (e) {
            setNotification(e.message, 'error');
        }
    }
    function setSongEdit(edit) {
        setIsEditing(edit);
    }
    function handleSongTextVisibility(visibility) {
        setSongTextIsVisible(visibility);
    }

    return (
        <div className={styles.wrapper}>
            {isEditing ? (
                <>
                    <PlusSVG className={classNames(styles.removeSong, 'removeSVG')} onClick={() => setSongEdit(false)}/>
                    <Form onSubmit={handleEditSong}>
                        <Input name={'title'} value={song.title}/>
                        <Wysiwyg label={'Text'} name={'text'} formattedValue={song.text}/>
                        <Button label={'Uložit'}/>
                    </Form>
                </>
            ) : (
                <>
                    <h4 className={styles.title} onClick={() => handleSongTextVisibility(!songTextIsVisible)}>{song.title}</h4>
                    <PencilSVG className={styles.edit} onClick={() => setSongEdit(true)}/>
                    <BinSVG className={styles.removeSong} onClick={handleDeleteSong}/>
                    {songTextIsVisible && (
                        <div dangerouslySetInnerHTML={{__html: getHTMLFromStringifiedState(song.text)}}/>
                    )}
                </>
            )}
        </div>
    )
}

export default Song;