import React from 'react';
import {useGlobal} from 'reactn';

import Button from '../Button';
import Form from '../Form';
import Input from '../Input';

import {createRepertoir} from '../../api/client';
import {ADD_REPERTOIRE} from '../../consts/visibility';
import useGlobalMap from '../../hooks/useGlobalMap';


import styles from './styles.scss';

function FormNewRepertoar() {
    const [, setEditingRepertoireId] = useGlobal('editingRepertoireId');
    const [, addNotification] = useGlobalMap('notifications');
    const [, addRepertoire] = useGlobalMap('repertoires');
    const [, , removeVisibility] = useGlobalMap('visibility');


    async function handleOnSubmit(refs) {
        const title = refs.get('title').current;

        try {
            const {repertoire} = await createRepertoir(title.value());

            addRepertoire(repertoire._id, repertoire);
            setEditingRepertoireId(repertoire._id);
            removeVisibility(ADD_REPERTOIRE);
        } catch (e) {
            addNotification(e.message, 'error');
        }
    }
    
    return (
        <div className={styles.wrapper}>
            <Form onSubmit={handleOnSubmit}>
                <Input name={'title'} label={'Název repertoáru'}/>
                <Button label={'Vytvořit'}/>
            </Form>
        </div>
    )
}

export default FormNewRepertoar;