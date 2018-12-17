import React from 'react';

import styles from './styles.scss';

function ListSections({sections}) {
    return (
        <ul className={styles.wrapper}>
            {sections && sections.size > 0 ? [...sections.values()].map(section => (
                <li key={section._id}>
                    {section.title}
                </li>
            )) : (
                <li><i>zatím žádné nejsou</i></li>
            )}
        </ul>
    )
}

export default ListSections;