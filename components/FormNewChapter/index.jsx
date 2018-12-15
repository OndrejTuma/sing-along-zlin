import React from 'react';

import Button from '../Button';
import Form from '../Form';
import Input from '../Input';

const FormNewChapter = () => {
    return (
        <Form action={`/chapter/add`}>
            <h2>Přidej si kapitolku do zpěvníku</h2>
            <Input label={'Název'} name={'title'} />
            <Input label={'Text'} name={'body'} />
            <Button label={'Uložit'} />
        </Form>
    )
};

export default FormNewChapter;