import React, {useState} from 'react';

import Form from '../Form';
import Input from '../Input';
import Button from "../Button";

import {login} from '../../api/client';

function FormLoginUser() {

    async function onSubmit(elements) {
        setFetching(true);
        try {
            const result = await login(elements.get('login'), elements.get('password'));

            console.log(result);
        } catch (e) {
            console.error(e);
        }
        setFetching(false);
    }

    const [fetching, setFetching] = useState(false);

    return (
        <Form action={`/user/login`} onSubmit={onSubmit}>
            <p>Přihlásit</p>
            <Input label={'Jméno'} name={'login'} />
            <Input label={'Heslo'} type={'password'} name={'password'} />
            <Button label={'Přihlásit se'} busy={fetching} />
        </Form>
    )
}

export default FormLoginUser;