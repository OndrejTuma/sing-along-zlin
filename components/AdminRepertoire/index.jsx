import React from 'react';
import {useGlobal} from 'reactn';
import classNames from 'classnames';

import EditRepertoire from '../EditRepertoire';
import FormNewRepertoar from '../FormNewRepertoar';
import ListRepertoires from '../ListRepertoires';
import PlusSVG from '../../static/svg/plus.svg';

import {ADD_REPERTOIRE} from '../../consts/visibility';
import useGlobalMap from '../../hooks/useGlobalMap';

import styles from './styles.scss';

function AdminRepertoire() {
    const [currentRepertoireId, setEditingRepertoireId] = useGlobal('editingRepertoireId');
    const [visibility, addVisibility, removeVisibility] = useGlobalMap('visibility');

    const addRepertoireVisible = visibility.has(ADD_REPERTOIRE);

    function handleAddRepertoireVisibility(visibility) {
        setEditingRepertoireId('');

        visibility
            ? addVisibility(ADD_REPERTOIRE, true)
            : removeVisibility(ADD_REPERTOIRE);
    }

    return (
        <div className={styles.wrapper}>
            <h2>Správa repertoárů</h2>
            <PlusSVG
                className={classNames(styles.addNewRepertoire, 'addSVG', {
                    active: addRepertoireVisible,
                })}
                onClick={() => handleAddRepertoireVisibility(!addRepertoireVisible)}
                title={addRepertoireVisible ? 'Zavřít' : 'Přidat repertoár'}
            />
            {addRepertoireVisible && <FormNewRepertoar/>}
            {currentRepertoireId && <EditRepertoire/>}
            <ListRepertoires/>
        </div>
    )
}

export default AdminRepertoire;