import React, {useEffect, useState} from 'react';
import {useGlobal} from 'reactn';

import Loading from '../Loading';

import {deleteSong as deleteSongAPI, fetchSongs} from '../../api/client';
import useGlobalMap from '../../hooks/useGlobalMap';

import styles from './styles.scss';

function ListSongs() {
    const [, setNotification] = useGlobal('notifications');
    const [fetching, setFetching] = useState(true);
    const [songs, addSong, deleteSong] = useGlobalMap('songs');

    async function handleDeleteSong(song) {
        try {
            await deleteSongAPI(song.title);
            deleteSong(song._id);
        } catch (e) {
            setNotification({
                message: e.message,
                type: 'error',
            });
        }
    }

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
            <h2>Písničky</h2>
            {fetching && <Loading/>}
            <ul className={styles.wrapper}>
                {songs ? [...songs.values()].map(song => (
                    <li key={song._id}>
                        <h3>{song.title}</h3>
                        <strong onClick={() => handleDeleteSong(song)}>&times;</strong>
                        <p>
                            <small><i>{song.text}</i></small>
                        </p>
                    </li>
                )) : <li><i>zatím žádné nejsou</i></li>}
            </ul>
        </>
    )
}

export default ListSongs;