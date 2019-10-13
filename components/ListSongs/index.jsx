import React from 'react';

import Song from '../Song';

import styles from './styles.scss';

/**
 * @param [object[]] songs
 * @return {*}
 * @constructor
 */
function ListSongs({songs}) {
    return (
        <>
            <h3>Uložené písničky</h3>
            <ul className={styles.wrapper}>
                {songs.length > 0 ? songs.sort(function(a, b){
                    if(a.title.trim() < b.title.trim()) { return -1; }
                    if(a.title.trim() > b.title.trim()) { return 1; }
                    return 0;
                }).map(song => (
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