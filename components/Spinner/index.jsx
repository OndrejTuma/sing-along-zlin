import React from 'react';

import SpinnerSVG from '../../static/svg/spinner.svg';

import styles from './styles.scss';

function Spinner() {
    return (
        <div className={styles.wrapper}>
            <SpinnerSVG className={styles.spinner}/>
        </div>
    )
}

export default Spinner;