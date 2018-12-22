import React, {useState} from 'react';

import Button from '../Button';
import Form from '../Form';
import Input from '../Input';
import Wysiwyg from '../Wysiwyg';

import {createSong} from '../../api/client';
import {setTokenCookie} from '../../helpers/user';
import useGlobalMap from '../../hooks/useGlobalMap';

function FormNewSong() {
    const [fetching, setFetching] = useState(false);
    const [, addNotification] = useGlobalMap('notifications');
    const [, addSong] = useGlobalMap('songs');

    async function handleOnSubmit(refs) {
        setFetching(true);
        const title = refs.get('title').current;
        const text = refs.get('text').current;

        try {
            const {song, token} = await createSong(title.value(), text.value());

            addSong(song._id, song);
            setTokenCookie(token);
            addNotification('A písnička je na světě', 'success');
            title.reset();
            text.reset();
        } catch (e) {
            addNotification(e.message, 'error');
        }

        setFetching(false);
    }

    return (
        <Form onSubmit={handleOnSubmit}>
            <h3>Nová písnička</h3>
            <Input label={'Název'} name={'title'} />
            <Wysiwyg label={'Text'} name={'text'}/>
            <Button label={'Uložit'} busy={fetching} />
        </Form>
    )
}

export default FormNewSong;