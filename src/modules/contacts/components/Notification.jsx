import React from 'react';
import styles from './Notification.module.css';
import {useNotifications} from "../../../core/index.js";

function Notification() {
    const {notification} = useNotifications()

    if (!notification?.text) return null;

    const { text, type } = notification;

    const notificationClass = type === "success" ? styles.successNotification : styles.errorNotification;

    return (
        <div className={notificationClass}>
            <p>{text}</p>
        </div>
    );
}

export default Notification;