import React from 'react';

import Spinner from '../Spinner';

import styles from './styles.scss';

function Loading() {
    return (
        <div className={styles.wrapper}>
            <Spinner/>
        </div>
    )
}

export default Loading;