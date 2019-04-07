import React from 'react';

import BinSVG from '../../static/svg/bin.svg';

import {deleteSection as deleteSectionAPI} from '../../api/client';
import useGlobalMap from '../../hooks/useGlobalMap';

import styles from './styles.scss';

function Section({section, songs}) {
    const [, setNotification] = useGlobalMap('notifications');
    const [, , deleteSection] = useGlobalMap('sections');

    async function handleDeleteSection() {
        if (!confirm(`Opravdu smazat sekci "${section.title}"?`)) {
            return;
        }

        try {
            await deleteSectionAPI(section._id);

            deleteSection(section._id);
        } catch (e) {
            setNotification(e.message, 'error');
        }
    }

    return (
        <div className={styles.wrapper}>
            <h4>{section.title}:</h4>
            <ul>
                {songs.map(({_id: id, title}) => (
                    <li key={id}>{title}</li>
                ))}
            </ul>
            <BinSVG className={styles.removeIcon} onClick={handleDeleteSection}/>
        </div>
    )
}

export default Section;