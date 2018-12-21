import React from 'react';
import classNames from 'classnames';

import Spinner from '../Spinner';

import styles from './styles.scss';

function Button({label = '', gray, busy, red, small, type = 'submit'}) {

    return (
        <button type={type} className={classNames(styles.button, {
            [styles.gray]: gray,
            [styles.red]: red,
            [styles.small]: small,
        })}>
            {busy ? <Spinner/> : label}
        </button>
    );
}

export default Button;