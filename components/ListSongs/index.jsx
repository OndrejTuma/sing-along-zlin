import React, {useEffect, useState} from 'react';
import {useGlobal} from 'reactn';

import Loading from '../Loading';
import Song from '../Song';

import {fetchSongs} from '../../api/client';
import useGlobalMap from '../../hooks/useGlobalMap';

import styles from './styles.scss';

function ListSongs() {
    const [, setNotification] = useGlobal('notifications');
    const [fetching, setFetching] = useState(true);
    const [songs, addSong] = useGlobalMap('songs');



    useEffect(() => {
        setFetching(true);
        fetchSongs()
            .then(({songs}) => songs.forEach(song => addSong(song._id, song)))
            .catch(e => setNotification({
                message: e.message,
                error: 'error',
            }))
            .finally(() => setFetching(false));
    }, []);

    return (
        <>
            <h3>Uložené písničky</h3>
            {fetching && <Loading/>}
            <ul className={styles.wrapper}>
                {songs && songs.size > 0 ? [...songs.values()].map(song => (
                    <li key={song._id}>
                        <Song song={song}/>
                    </li>
                )) : (
                    <li><i>zatím žádné nejsou</i></li>
                )}
            </ul>
        </>
    )
}

export default ListSongs;