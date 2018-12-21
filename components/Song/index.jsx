import React, {useState} from 'react';
import classNames from 'classnames';

import PlusSVG from '../../static/svg/plus.svg';

import {deleteSong as deleteSongAPI} from '../../api/client';
import useGlobalMap from '../../hooks/useGlobalMap';
import {setTokenCookie} from '../../helpers/user';
import {getHTMLFromStringifiedState} from '../../helpers/wysiwyg';

import styles from './styles.scss';

function Song({song}) {
    const [songTextIsVisible, setSongTextIsVisible] = useState(false);
    const [, , deleteSong] = useGlobalMap('songs');
    const [, setNotification] = useGlobalMap('notifications');


    async function handleDeleteSong() {
        if (!confirm(`Opravdu smazat "${song.title}"?`)) {
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

    function handleSongTextVisibility(visibility) {
        setSongTextIsVisible(visibility);
    }

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title} onClick={() => handleSongTextVisibility(!songTextIsVisible)}>{song.title}</h4>
            <PlusSVG className={classNames(styles.removeSong, 'removeSVG')}
                     onClick={handleDeleteSong}/>
            {songTextIsVisible && (
                <div dangerouslySetInnerHTML={{__html: getHTMLFromStringifiedState(song.text)}}/>
            )}
        </div>
    )
}

export default Song;