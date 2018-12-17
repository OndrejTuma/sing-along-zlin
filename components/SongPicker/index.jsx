import React, {useState} from 'react';
import classNames from 'classnames';

import Input from '../Input';

import useGlobalMap from '../../hooks/useGlobalMap';

import styles from './styles.scss';

function SongPicker({name}) {
    const [pickedSong, setPickedSong] = useState({_id:''});
    const [songs] = useGlobalMap('songs');

    function handlePickSong(song) {
        setPickedSong(song);
    }
    
    return (
        <div className={styles.wrapper}>
            <Input name={name} type={'hidden'} value={pickedSong._id}/>
            <ul>
                {[...songs.values()].map(song => (
                    <li
                        key={song._id}
                        onClick={() => handlePickSong(song)}
                        className={classNames({
                            [styles.active]: pickedSong._id === song._id,
                        })}
                    >{song.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default SongPicker;