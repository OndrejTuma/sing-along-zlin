import React from 'react';

import Button from '../Button';
import Form from '../Form';
import Input from '../Input';
import SongPicker from '../SongPicker';

import {createSection} from '../../api/client';
import {setTokenCookie} from '../../helpers/user';
import useGlobalMap from '../../hooks/useGlobalMap';

import styles from './styles.scss';

function FormNewSection() {
    const [, addSection] = useGlobalMap('sections');
    const [, addNotification] = useGlobalMap('notifications');
    
    async function handleOnSubmit(elements) {
        try {
            const {section, token} = await createSection(elements.get('title'), elements.get('song'));

            addSection(section._id, section);
            setTokenCookie(token);
        } catch (e) {
            addNotification(e.message, 'error');
        }
    }

    return (
        <Form className={styles.wrapper} onSubmit={handleOnSubmit}>
            <Input name={'title'} label={'Název'}/>
            <SongPicker name={'song'}/>
            <Button label={'Vytvořit'}/>
        </Form>
    )
}

export default FormNewSection;