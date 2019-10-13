import React, {forwardRef, useImperativeMethods} from 'react';

import Input from '../Input';
import FilteringDropdown from '../FilteringDropdown';

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

    return (
        <div className={styles.wrapper}>
            <Input name={name} type={'hidden'} value={pickedSongIds}/>
            {pickedSongIds.size > 0 && (
                <>
                    <strong>Vybrané písničky:</strong>
                    <ul>
                        {[...pickedSongIds.keys()].map(id => (
                            <li key={id}>
                                <span title={'Odstranit písničku ze sekce'} onClick={() => deletePickedSongId(id)}>
                                    {songs.get(id).title}
                                </span>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            <FilteringDropdown
                placeholder={'Vybrat písničky'}
                items={[...songs.values()].map(({_id: id, title: name}) => ({id, name}))}
                onSelect={({id}) => addPickedSongsId(id)}
            />
        </div>
    )
}

export default forwardRef(SongPicker);