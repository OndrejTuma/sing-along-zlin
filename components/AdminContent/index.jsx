import React from 'react';

import AdminRepertoire from '../AdminRepertoire';
import AdminSongs from '../AdminSongs';
import Logout from '../Logout';

function AdminContent() {

    return (
        <div className={'wrapper'}>
            <Logout/>
            <h1>Vítej v administraci</h1>
            <AdminRepertoire/>
            <AdminSongs/>
        </div>
    )
}

export default AdminContent;