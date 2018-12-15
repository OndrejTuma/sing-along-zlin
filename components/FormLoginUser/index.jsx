import React, {useState} from 'react';
import cookie from 'js-cookie';

import Button from '../Button';
import Form from '../Form';
import Input from '../Input';
import Notification from '../Notification';

import {login} from '../../api/client';
import USER_TOKEN from '../../api/token_name';
import useNotifications from '../../hooks/useNotifications';

function FormLoginUser() {
    const [fetching, setFetching] = useState(false);
    const [notifications, setNotification, deleteNotification, deleteAllNotifications] = useNotifications();

    async function handleOnSubmit(elements) {
        setFetching(true);

        try {
            const result = await login(elements.get('login'), elements.get('password'));

            cookie.set(USER_TOKEN, result.token);
            deleteAllNotifications();
            setNotification(`Successfully logged!`, 'success');
        } catch (e) {
            setNotification(e.message, 'error');
        }

        setFetching(false);
    }

    return (
        <Form action={`/user/login`} onSubmit={handleOnSubmit}>
            <h2>Přihlásit</h2>
            <Input label={'Jméno'} name={'login'} />
            <Input label={'Heslo'} type={'password'} name={'password'} />
            <Notification notifications={notifications} remove={deleteNotification} />
            <Button label={'Přihlásit se'} busy={fetching} />
        </Form>
    )
}

export default FormLoginUser;