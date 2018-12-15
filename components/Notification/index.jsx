import React from 'react';

import styles from './styles.scss';

function Notification({remove, notifications}) {
    function handleClick(e, message) {
        e.preventDefault();

        remove(message);
    }

    return (
        <ul>
            {[...notifications.entries()].map(([message, type]) => (
                <li key={message} className={styles[type]} onClick={e => handleClick(e, message)}>{message}</li>
            ))}
        </ul>
    )
}

export default Notification;