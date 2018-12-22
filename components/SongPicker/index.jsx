import React, {forwardRef, useImperativeMethods, useState} from 'react';
import classNames from 'classnames';

import Input from '../Input';

import useGlobalMap from '../../hooks/useGlobalMap';

import styles from './styles.scss';

function SongPicker({name}, ref) {
    const [pickedSongId, setPickedSongId] = useState('');
    const [songs] = useGlobalMap('songs');

    useImperativeMethods(ref, () => ({
        reset: () => setPickedSongId(''),
        value: () => pickedSongId,
    }));

    function handlePickSong({_id}) {
        setPickedSongId(_id);
    }
    
    return (
        <div className={styles.wrapper}>
            <Input name={name} type={'hidden'} value={pickedSongId}/>
            <label>Vyber písničku:</label>
            <ul>
                {[...songs.values()].map(song => (
                    <li
                        key={song._id}
                        onClick={() => handlePickSong(song)}
                        className={classNames(styles.song, {
                            [styles.active]: pickedSongId === song._id,
                        })}
                    >{song.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default forwardRef(SongPicker);