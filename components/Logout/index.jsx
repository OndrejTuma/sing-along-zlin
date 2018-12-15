import React from 'react';

import {logout} from '../../api/client';
import {useStore} from '../../hooks/store';

function Logout() {
    const [state, setState] = useStore();

    function handleLogoutClick() {
        logout();

        setState({
            ...state,
            isLogged: false,
        });
    }

    return (
        <div>
            <span onClick={handleLogoutClick}>Odhlásit</span>
        </div>
    )
}

export default Logout;