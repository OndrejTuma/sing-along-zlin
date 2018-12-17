import React, {useState} from 'react';
import {useGlobal} from 'reactn';
import classNames from 'classnames';

import FormNewRepertoar from '../FormNewRepertoar';
import FormNewSection from '../FormNewSection';
import ListRepertoires from '../ListRepertoires';
import ListSections from '../ListSections';
import PlusSVG from '../../static/svg/plus.svg';

import useGlobalMap from '../../hooks/useGlobalMap';

import styles from './styles.scss';

function AdminRepertoire() {
    const [showNewSection, setShowNewSection] = useState(false);
    const [showNewRepertoire, setShowNewRepertoire] = useState(false);
    const [currentRepertoireId] = useGlobal('currentRepertoireId');
    const [repertoires] = useGlobalMap('repertoires');
    const [sections] = useGlobalMap('sections');

    function handleNewRepertoireVisibility(visibility) {
        setShowNewRepertoire(visibility);
    }
    function handleNewSectionVisibility(visibility) {
        setShowNewSection(visibility);
    }
    
    return (
        <div className={styles.wrapper}>
            <h2>Správa repertoárů</h2>
            <PlusSVG
                className={classNames(styles.addNewRepertoire, 'addSVG', {
                    active: showNewRepertoire,
                })}
                onClick={() => handleNewRepertoireVisibility(!showNewRepertoire)}
                title={showNewRepertoire ? 'Zavřít' : 'Přidat repertoár'}
            />
            {showNewRepertoire && <FormNewRepertoar/>}
            {currentRepertoireId && (
                <>
                    <h3>{repertoires.get(currentRepertoireId).title}</h3>
                    <PlusSVG
                        className={classNames(styles.addNewSection, 'addSVG', {
                            active: showNewSection,
                        })}
                        onClick={() => handleNewSectionVisibility(!showNewSection)}
                        title={showNewSection ? 'Zavřít' : 'Přidat sekci'}
                    />
                    {showNewSection && <FormNewSection/>}
                    <ListSections sections={sections}/>
                </>
            )}
            <ListRepertoires/>
        </div>
    )
}

export default AdminRepertoire;