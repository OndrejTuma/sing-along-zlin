import React from 'react';
import {useGlobal} from 'reactn';

import Button from '../Button';
import Form from '../Form';
import Input from '../Input';

import {createRepertoir} from '../../api/client';
import {ADD_REPERTOIRE} from '../../consts/visibility';
import {setTokenCookie} from '../../helpers/user';
import useGlobalMap from '../../hooks/useGlobalMap';


import styles from './styles.scss';

function FormNewRepertoar() {
    const [, setCurrentRepertoireId] = useGlobal('currentRepertoireId');
    const [, addNotification] = useGlobalMap('notifications');
    const [, addRepertoire] = useGlobalMap('repertoires');
    const [, , removeVisibility] = useGlobalMap('visibility');


    async function handleOnSubmit(elements) {
        try {
            const {repertoire, token} = await createRepertoir(elements.get('title'));

            addRepertoire(repertoire._id, repertoire);
            setCurrentRepertoireId(repertoire._id);
            removeVisibility(ADD_REPERTOIRE);
            setTokenCookie(token);
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