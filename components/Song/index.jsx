import React, {useState} from 'react';
import classNames from 'classnames';

import PlusSVG from '../../static/svg/plus.svg';

import {deleteSong as deleteSongAPI} from '../../api/client';
import useGlobalMap from '../../hooks/useGlobalMap';
import {setTokenCookie} from '../../helpers/user';

import styles from './styles.scss';

function Song({song}) {
    const [songTextIsVisible, setSongTextIsVisible] = useState(false);
    const [, , deleteSong] = useGlobalMap('songs');

    async function handleDeleteSong(song) {
        if (!confirm(`Opravdu smazat "${song.title}"?`)) {
            return;
        }

        try {
            const {token} = await deleteSongAPI(song.title);

            deleteSong(song._id);
            setTokenCookie(token);
        } catch (e) {
            setNotification({
                message: e.message,
                type: 'error',
            });
        }
    }

    function handleSongTextVisibility(visibility) {
        setSongTextIsVisible(visibility);
    }

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title} onClick={() => handleSongTextVisibility(!songTextIsVisible)}>{song.title}</h3>
            <PlusSVG className={classNames(styles.removeSong, 'removeSVG')}
                     onClick={() => handleDeleteSong(song)}/>
            {songTextIsVisible && (
                <p>
                    <small><i>{song.text}</i></small>
                </p>
            )}
        </div>
    )
}

export default Song;