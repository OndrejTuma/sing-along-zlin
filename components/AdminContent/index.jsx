import React from 'react';

import FormNewSong from '../FormNewSong';
import ListSongs from '../ListSongs';
import Logout from '../Logout';

function AdminContent() {

    return (
        <>
            <Logout/>
            <h1>Vítej v administraci</h1>
            <ListSongs/>
            <FormNewSong/>
        </>
    )
}

export default AdminContent;