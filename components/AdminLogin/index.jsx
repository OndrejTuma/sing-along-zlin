import React from 'react';
import classNames from 'classnames';

import FormLoginUser from '../FormLoginUser';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function AdminLogin() {
    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <FormLoginUser/>
        </div>
    )
}

export default AdminLogin;