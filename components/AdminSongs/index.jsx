import React, {useState} from 'react';

import FormNewSong from '../FormNewSong';
import ListSongs from '../ListSongs';

import styles from './styles.scss';

function AdminSongs() {
    const [addSongIsVisible, setAddSongIsVisible] = useState(false);

    function handleAddSongClick() {
        setAddSongIsVisible(true);
    }

    return (
        <div className={styles.wrapper}>
            <h2>Správa písniček</h2>
            {addSongIsVisible ? (
                <FormNewSong/>
            ) : (
                <p onClick={handleAddSongClick}>Přidat písničku</p>
            )}
            <ListSongs/>
        </div>
    )
}

export default AdminSongs;