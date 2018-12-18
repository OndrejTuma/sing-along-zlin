import React from 'react';
import {useGlobal} from 'reactn';
import classNames from 'classnames';

import ListSections from '../ListSections';
import PlusSVG from '../../static/svg/plus.svg';
import FormNewSection from '../FormNewSection';

import {ADD_SECTION} from '../../consts/visibility';
import useGlobalMap from '../../hooks/useGlobalMap';

import styles from './styles.scss';

function EditRepertoire() {
    const [currentRepertoireId, setCurrentRepertoireId] = useGlobal('currentRepertoireId');
    const [repertoires] = useGlobalMap('repertoires');
    const [sections] = useGlobalMap('sections');
    const [visibility, addVisibility, removeVisibility] = useGlobalMap('visibility');

    const addSectionVisible = visibility.has(ADD_SECTION);

    function handleAddSectionVisibility(visibility) {
        visibility
            ? addVisibility(ADD_SECTION, true)
            : removeVisibility(ADD_SECTION);
    }

    return (
        <div className={styles.repertoire}>
            <h3>Upravit repertoár: {repertoires.get(currentRepertoireId).title}</h3>
            <span className={styles.close} onClick={() => setCurrentRepertoireId('')}>&times;</span>
            <PlusSVG
                className={classNames(styles.addNewSection, 'addSVG', {
                    active: addSectionVisible,
                })}
                onClick={() => handleAddSectionVisibility(!addSectionVisible)}
                title={addSectionVisible ? 'Zavřít' : 'Přidat sekci'}
            />
            {addSectionVisible && <FormNewSection/>}
            <ListSections
                sections={[...sections.values()].filter(section => section.belongsTo === currentRepertoireId)}
            />
        </div>
    )
}

export default EditRepertoire;