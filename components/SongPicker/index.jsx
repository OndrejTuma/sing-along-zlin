import React, {forwardRef, useImperativeMethods} from 'react';

import Input from '../Input';

import useGlobalMap from '../../hooks/useGlobalMap';
import useMap from '../../hooks/useMap';

import styles from './styles.scss';
import FilteringDropdown from "../FilteringDropdown";

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
            <ul>
                {[...pickedSongIds.keys()].map(id => (
                    <li key={id} title={'Odstranit písničku ze sekce'} onClick={() => deletePickedSongId(id)}>{songs.get(id).title}</li>
                ))}
            </ul>
            <FilteringDropdown
                placeholder={'Vybrat písničky'}
                items={[...songs.values()].map(({_id: id, title: name}) => ({id, name}))}
                onSelect={({id}) => handlePickSong(id)}
            />
        </div>
    )
}

export default forwardRef(SongPicker);