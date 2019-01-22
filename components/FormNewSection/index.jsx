import React from 'react';
import {useGlobal} from 'reactn';

import Button from '../Button';
import Form from '../Form';
import Input from '../Input';
import SongPicker from '../SongPicker';

import {createSection} from '../../api/client';
import {setTokenCookie} from '../../helpers/user';
import useGlobalMap from '../../hooks/useGlobalMap';

import styles from './styles.scss';

function FormNewSection() {
    const [currentRepertoireId] = useGlobal('editingRepertoireId');
    const [, addSection] = useGlobalMap('sections');
    const [, addNotification] = useGlobalMap('notifications');

    async function handleOnSubmit(refs) {
        const title = refs.get('title').current;
        const song = refs.get('song').current;

        try {
            const {section, token} = await createSection(title.value(), song.value(), currentRepertoireId);

            addSection(section._id, section);
            setTokenCookie(token);
            title.reset();
            song.reset();
        } catch (e) {
            addNotification(e.message, 'error');
        }
    }

    return (
        <>
            <h3>Přidat sekci:</h3>
            <Form className={styles.wrapper} onSubmit={handleOnSubmit}>
                <Input name={'title'} label={'Název'}/>
                <SongPicker name={'song'}/>
                <Button label={'Vytvořit'}/>
            </Form>
        </>
    )
}

export default FormNewSection;