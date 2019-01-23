import React, {useState} from 'react';

import Button from '../Button';
import Form from '../Form';
import Input from '../Input';
import Wysiwyg from '../Wysiwyg';

import {createSong} from '../../api/client';
import {AppError, ERR_FORM, ERR_FORM_MSG} from '../../api/errors';
import useGlobalMap from '../../hooks/useGlobalMap';

function FormNewSong() {
    const [fetching, setFetching] = useState(false);
    const [, addNotification] = useGlobalMap('notifications');
    const [, addSong] = useGlobalMap('songs');

    async function handleOnSubmit(refs) {
        const title = refs.get('title').current;
        const text = refs.get('text').current;

        try {
            if (text.isEmpty() || title.isEmpty()) {
                throw new AppError(ERR_FORM, ERR_FORM_MSG);
            }
            setFetching(true);

            const {song} = await createSong(title.value(), text.value());

            addSong(song._id, song);
            title.reset();
            text.reset();
        } catch (e) {
            addNotification(e.message, 'error');
        } finally {
            setFetching(false);
        }
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