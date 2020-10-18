import React from 'react';

import AdminRepertoire from '../AdminRepertoire';
import AdminSongs from '../AdminSongs';
import Logout from '../Logout';

import globalStyles from 'Sass/global.scss';

function AdminContent() {

    return (
        <div className={globalStyles.wrapper}>
            <Logout/>
            <h1 className={'mb-5'}>Vítej v administraci</h1>
            <AdminRepertoire/>
            <AdminSongs/>
        </div>
    )
}

export default AdminContent;