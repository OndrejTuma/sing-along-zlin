import React from 'react';
import {useGlobal} from 'reactn';

import SwitchSVG from '../../static/svg/switch.svg';

import {logout} from '../../api/client';

import styles from './styles.scss';

function Logout() {
    const [, setIsLogged] = useGlobal('isLogged');

    function handleLogoutClick() {
        logout();

        setIsLogged(false);
    }

    return (
        <div className={styles.wrapper}>
            <span className={styles.button} title={'Odhlásit se'} onClick={handleLogoutClick}>
                <SwitchSVG/>
            </span>
        </div>
    )
}

export default Logout;