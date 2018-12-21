import React from 'react';
import classNames from 'classnames';

import FormLoginUser from '../FormLoginUser';

import styles from './styles.scss';

function AdminLogin() {
    return (
        <div className={classNames('wrapper', styles.wrapper)}>
            <FormLoginUser/>
        </div>
    )
}

export default AdminLogin;