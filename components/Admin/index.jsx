import React from 'react';

import FormNewSong from '../FormNewSong';
import Logout from '../Logout';

function Admin() {

    return (
        <>
            <Logout/>
            <h1>Vítej v administraci</h1>
            <FormNewSong/>
        </>
    )
}

export default Admin;