import React, {useState} from 'react';
import {useGlobal} from 'reactn';

import Button from '../Button';
import Form from '../Form';
import Input from '../Input';

import {login as loginApi} from '../../api/client';
import useGlobalMap from '../../hooks/useGlobalMap';

function FormLoginUser() {
    const [fetching, setFetching] = useState(false);
    const [, setNotification, , deleteAllNotifications] = useGlobalMap('notifications');
    const [, setIsLogged] = useGlobal('isLogged');

    async function handleOnSubmit(refs) {
        const login = refs.get('login').current;
        const password = refs.get('password').current;

        setFetching(true);

        try {
            await loginApi(login.value(), password.value());

            deleteAllNotifications();
            setIsLogged(true);
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
            <Button label={'Přihlásit se'} busy={fetching} />
        </Form>
    )
}

export default FormLoginUser;