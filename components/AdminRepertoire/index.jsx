import React from 'react';
import {useGlobal} from 'reactn';
import classNames from 'classnames';

import FormNewRepertoar from '../FormNewRepertoar';
import FormNewSection from '../FormNewSection';
import ListRepertoires from '../ListRepertoires';
import ListSections from '../ListSections';
import PlusSVG from '../../static/svg/plus.svg';

import {ADD_REPERTOIRE, ADD_SECTION} from '../../consts/visibility';
import useGlobalMap from '../../hooks/useGlobalMap';

import styles from './styles.scss';

function AdminRepertoire() {
    const [currentRepertoireId, setCurrentRepertoireId] = useGlobal('currentRepertoireId');
    const [repertoires] = useGlobalMap('repertoires');
    const [sections] = useGlobalMap('sections');
    const [visibility, addVisibility, removeVisibility] = useGlobalMap('visibility');

    const addRepertoireVisible = visibility.has(ADD_REPERTOIRE);
    const addSectionVisible = visibility.has(ADD_SECTION);

    function handleAddRepertoireVisibility(visibility) {
        setCurrentRepertoireId('');

        visibility
            ? addVisibility(ADD_REPERTOIRE, true)
            : removeVisibility(ADD_REPERTOIRE);
    }

    function handleAddSectionVisibility(visibility) {
        visibility
            ? addVisibility(ADD_SECTION, true)
            : removeVisibility(ADD_SECTION);
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
            {currentRepertoireId && (
                <div className={styles.repertoire}>
                    <h3>Upravit repertoár: {repertoires.get(currentRepertoireId).title}</h3>
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
            )}
            <ListRepertoires/>
        </div>
    )
}

export default AdminRepertoire;