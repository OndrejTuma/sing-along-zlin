import React, {useState} from 'react';
import cookie from 'js-cookie';
import {useGlobal} from 'reactn';

import Button from '../Button';
import Form from '../Form';
import Input from '../Input';

import {login} from '../../api/client';
import tokenName from '../../api/token_name';
import useGlobalMap from '../../hooks/useGlobalMap';

function FormLoginUser() {
    const [fetching, setFetching] = useState(false);
    const [, setNotification] = useGlobalMap('notifications');
    const [, setIsLogged] = useGlobal('isLogged');

    async function handleOnSubmit(elements) {
        setFetching(true);

        try {
            const {token} = await login(elements.get('login'), elements.get('password'));

            cookie.set(tokenName, token);

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