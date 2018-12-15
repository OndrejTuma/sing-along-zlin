import React, {useState} from 'react';

import Button from '../Button';
import Form from '../Form';
import Input from '../Input';

import {createSong} from '../../api/client';
import useGlobalMap from '../../hooks/useGlobalMap';

function FormNewSong() {
    const [fetching, setFetching] = useState(false);
    const [, addNotification] = useGlobalMap('notifications');
    const [, addSong] = useGlobalMap('songs');

    async function handleOnSubmit(elements) {
        setFetching(true);

        try {
            const {song} = await createSong(elements.get('title'), elements.get('text'));

            addSong(song._id, song);
        } catch (e) {
            addNotification(e.message, 'error');
        }

        setFetching(false);
    }

    return (
        <Form onSubmit={handleOnSubmit}>
            <h2>Nová písnička</h2>
            <Input label={'Název'} name={'title'} />
            <Input label={'Text'} name={'text'} />
            <Button label={'Uložit'} busy={fetching} />
        </Form>
    )
}

export default FormNewSong;