import React from 'react';

import Button from '../Button';
import Form from '../Form';
import Input from '../Input';

import {createUser} from '../../api/client';
import {setTokenCookie} from '../../helpers/user';
import useGlobalMap from '../../hooks/useGlobalMap';

const FormCreateUser = () => {
    const [, addNotification] = useGlobalMap('notifications');
    
    async function handleOnSubmit(refs) {
        const login = refs.get('login').current;
        const password = refs.get('password').current;

        try {
            const {token} = await createUser(login.value(), password.value());
            
            addNotification('Uživatel přidaný!', 'success');
            setTokenCookie(token);
        } catch (e) {
            addNotification(e.message, 'error');
        }
    }
    
    return (
        <Form onSubmit={handleOnSubmit}>
            <p>Vytvořit nového uživatele</p>
            <Input label={'Jméno'} name={'login'} />
            <Input label={'Heslo'} type={'password'} name={'password'} />
            <Button label={'Vytvořit'} />
        </Form>
    )
};

export default FormCreateUser;