import React, {useState} from 'react';

import Button from '../Button';
import Form from '../Form';
import Input from '../Input';
import Notification from '../Notification';

import {createSong} from '../../api/client';
import {USER_TOKEN} from '../../consts/session_storage';
import useNotifications from '../../hooks/useNotifications';

function FormNewSong() {
    const [fetching, setFetching] = useState(false);
    const [notifications, setNotification, deleteNotification, deleteAllNotifications] = useNotifications();

    async function handleOnSubmit(elements) {
        setFetching(true);

        try {
            await createSong(elements.get('title'), elements.get('text'), sessionStorage.getItem(USER_TOKEN));

            deleteAllNotifications();
            setNotification(`Successfully added!`, 'success');
        } catch (e) {
            setNotification(e.message, 'error');
        }

        setFetching(false);
    }

    return (
        <Form onSubmit={handleOnSubmit}>
            <h2>Nová písnička</h2>
            <Input label={'Název'} name={'title'} />
            <Input label={'Text'} name={'text'} />
            <Notification notifications={notifications} remove={deleteNotification} />
            <Button label={'Uložit'} busy={fetching} />
        </Form>
    )
}

export default FormNewSong;