import React, {forwardRef, useImperativeMethods} from 'react';
import classNames from 'classnames';

import Input from '../Input';

import useGlobalMap from '../../hooks/useGlobalMap';
import useMap from '../../hooks/useMap';

import styles from './styles.scss';

function SongPicker({name}, ref) {
    const [pickedSongIds, addPickedSongsId, deletePickedSongId, resetPickedSongIds] = useMap();
    const [songs] = useGlobalMap('songs');

    useImperativeMethods(ref, () => ({
        isEmpty: () => pickedSongIds.size === 0,
        reset: () => resetPickedSongIds(),
        value: () => [...pickedSongIds.keys()],
    }));

    function isPicked(id) {
        return pickedSongIds.has(id);
    }

    function handlePickSong(id) {
        isPicked(id)
            ? deletePickedSongId(id)
            : addPickedSongsId(id);
    }
    
    return (
        <div className={styles.wrapper}>
            <Input name={name} type={'hidden'} value={pickedSongIds}/>
            <label>Vyber písničku:</label>
            <ul>
                {[...songs.values()].sort(function(a, b){
                    if(a.title < b.title) { return -1; }
                    if(a.title > b.title) { return 1; }
                    return 0;
                }).map(({_id: id, title}) => (
                    <li
                        key={id}
                        onClick={() => handlePickSong(id)}
                        className={classNames(styles.song, {
                            [styles.active]: isPicked(id),
                        })}
                    >{title}</li>
                ))}
            </ul>
        </div>
    )
}

export default forwardRef(SongPicker);