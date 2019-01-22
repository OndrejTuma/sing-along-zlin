import React, {useState} from 'react';

import EditSong from '../EditSong';
import PencilSVG from '../../static/svg/pencil.svg';
import BinSVG from '../../static/svg/bin.svg';

import {deleteSong as deleteSongAPI} from '../../api/client';
import useGlobalMap from '../../hooks/useGlobalMap';
import {setTokenCookie} from '../../helpers/user';
import {getHTMLFromStringifiedState} from '../../helpers/wysiwyg';

import styles from './styles.scss';

function Song({song}) {
    const [editingSongs, addEditingSongs] = useGlobalMap('editingSongs');

    const [songTextIsVisible, setSongTextIsVisible] = useState(false);
    const [, , deleteSong] = useGlobalMap('songs');
    const [, setNotification] = useGlobalMap('notifications');

    async function handleDeleteSong() {
        if (!confirm(`Opravdu smazat '${song.title}'?`)) {
            return;
        }

        try {
            const {token} = await deleteSongAPI(song.title);
            setTokenCookie(token);
            deleteSong(song._id);
        } catch (e) {
            setNotification(e.message, 'error');
        }
    }

    function handleSongTextVisibility(visibility) {
        setSongTextIsVisible(visibility);
    }

    return editingSongs.has(song._id) ? (
        <EditSong song={song}/>
    ) : (
        <div className={styles.wrapper}>
            <h4 className={styles.title} onClick={() => handleSongTextVisibility(!songTextIsVisible)}>{song.title}</h4>
            <PencilSVG className={styles.edit} onClick={() => addEditingSongs(song._id)}/>
            <BinSVG className={styles.removeSong} onClick={handleDeleteSong}/>
            {songTextIsVisible && (
                <div dangerouslySetInnerHTML={{__html: getHTMLFromStringifiedState(song.text)}}/>
            )}
        </div>
    )
}

export default Song;