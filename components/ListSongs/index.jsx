import React from 'react';

import Song from '../Song';

import styles from './styles.scss';

function ListSongs({songs}) {
    return (
        <>
            <h3>Uložené písničky</h3>
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