import React from 'react';
import classNames from 'classnames';

import useGlobalMap from '../../hooks/useGlobalMap';

import styles from './styles.scss';

function Notification({notifications}) {
    const [, , remove] = useGlobalMap('notifications');

    function handleRemoveNotification(message) {
        remove(message);
    }

    if (!notifications || !'entries' in notifications) {
        return null;
    }

    return (
        <ul className={styles.wrapper}>
            {[...notifications.entries()].map(([message, type]) => (
                <li key={message} className={classNames(styles.item, styles[type])}>
                    {message}
                    <span className={styles.remove} onClick={() => handleRemoveNotification(message)}>&times;</span>
                </li>
            ))}
        </ul>
    )
}

export default Notification;