import React, {useState} from 'react';
import classNames from 'classnames';

import FormNewSong from '../FormNewSong';
import ListSongs from '../ListSongs';
import PlusSVG from '../../static/svg/plus.svg';

import useGlobalMap from '../../hooks/useGlobalMap';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function AdminSongs() {
    const [songs] = useGlobalMap('songs');
    const [showNewSong, setShowNewSong] = useState(false);

    function handleAddSongVisibility(visibility) {
        setShowNewSong(visibility);
    }

    return (
        <div className={styles.wrapper}>
            <h2>Správa písniček</h2>
            <PlusSVG
                className={classNames(styles.addNewSong, globalStyles.addSVG, {
                    [globalStyles.closeSVG]: showNewSong,
                })}
                onClick={() => handleAddSongVisibility(!showNewSong)}
                title={showNewSong ? 'Zavřít' : 'Přidat písničku'}
            />
            {showNewSong && <FormNewSong/>}
            <ListSongs songs={[...songs.values()]}/>
        </div>
    )
}

export default AdminSongs;