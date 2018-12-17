import React from 'react';

import useGlobalMap from '../../hooks/useGlobalMap';

import styles from './styles.scss';

function Notification({notifications}) {
    const [, , remove] = useGlobalMap('notifications');

    function handleRemoveNotification(message) {
        remove(message);
    }

    if (!notifications) {
        return null;
    }

    return (
        <ul>
            {[...notifications.entries()].map(([message, type]) => (
                <li key={message} className={styles[type]} onClick={() => handleRemoveNotification(message)}>
                    {message}
                </li>
            ))}
        </ul>
    )
}

export default Notification;