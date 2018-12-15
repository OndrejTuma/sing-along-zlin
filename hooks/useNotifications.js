import React, {useState} from 'react';

function useNotifications(initialState = new Map()) {
    const [notifications, setNotifications] = useState(initialState);

    function setNotification(message, type) {
        setNotifications(notifications.set(message, type));
    }

    function deleteNotification(message) {
        notifications.delete(message);
        setNotifications(notifications);
    }


    function deleteAllNotifications() {
        notifications.clear();
        setNotifications(notifications);
    }

    return [notifications, setNotification, deleteNotification, deleteAllNotifications];
}

export default useNotifications;