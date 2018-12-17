import React from 'react';

import AdminSongs from '../AdminSongs';
import Logout from '../Logout';

function AdminContent() {

    return (
        <>
            <Logout/>
            <h1>Vítej v administraci</h1>
            <AdminSongs/>
        </>
    )
}

export default AdminContent;