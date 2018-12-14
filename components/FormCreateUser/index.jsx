import React from 'react';

import Form from '../Form';
import Input from '../Input';
import Button from "../Button";

const FormCreateUser = () => {
    return (
        <Form action={`/user/create`}>
            <p>Vytvořit nového uživatele</p>
            <Input label={'Jméno'} name={'login'} />
            <Input label={'Heslo'} type={'password'} name={'password'} />
            <Button label={'Vytvořit'} />
        </Form>
    )
};

export default FormCreateUser;