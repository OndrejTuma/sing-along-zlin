import React from 'react';

import Section from '../Section';

import useGlobalMap from '../../hooks/useGlobalMap';

import styles from './styles.scss';

function ListSections({sections}) {
    const [songs] = useGlobalMap('songs');

    return (
        <>
            <h3>Sekce v repertoáru</h3>
            <ul className={styles.wrapper}>
                {sections && sections.length > 0 ? sections.map(section => (
                    <li key={section._id}>
                        <Section section={section} songs={[...songs.values()].filter(song => section.songs.indexOf(song._id) > -1)}/>
                    </li>
                )) : (
                    <li><i>zatím žádné nejsou</i></li>
                )}
            </ul>
        </>
    )
}

export default ListSections;