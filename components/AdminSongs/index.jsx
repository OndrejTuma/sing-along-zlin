import React, {useState} from 'react';
import classNames from 'classnames';

import FormNewSong from '../FormNewSong';
import ListSongs from '../ListSongs';
import PlusSVG from '../../static/svg/plus.svg';

import styles from './styles.scss';

function AdminSongs() {
    const [addSongIsVisible, setAddSongIsVisible] = useState(false);

    function handleAddSongVisibility(visibility) {
        setAddSongIsVisible(visibility);
    }

    return (
        <div className={styles.wrapper}>
            <h2>Správa písniček</h2>
            <PlusSVG
                className={classNames(styles.addNewSong, {
                    [styles.isOpen]: addSongIsVisible,
                })}
                onClick={() => handleAddSongVisibility(!addSongIsVisible)}
                title={addSongIsVisible ? 'Zavřít' : 'Přidat písničku'}
            />
            {addSongIsVisible && <FormNewSong/>}
            <ListSongs/>
        </div>
    )
}

export default AdminSongs;