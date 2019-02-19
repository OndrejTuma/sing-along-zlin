import React from 'react';

import styles from './styles.scss';

function RepertoireNavigation({sections}) {
    return (
        <div className={styles.wrapper}>
            <ul className={styles.list}>
                {sections.map(({_id, title}) => (
                    <li key={_id}>
                        <a href={`#${title}`}>{title}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RepertoireNavigation;