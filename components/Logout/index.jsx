import React from 'react';
import {useGlobal} from 'reactn';

import {logout} from '../../api/client';

function Logout() {
    const [, setIsLogged] = useGlobal('isLogged');

    function handleLogoutClick() {
        logout();

        setIsLogged(false);
    }

    return (
        <div>
            <span onClick={handleLogoutClick}>Odhlásit</span>
        </div>
    )
}

export default Logout;