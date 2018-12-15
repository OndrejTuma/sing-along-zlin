import React from 'react';
import Head from 'next/head';
import {setGlobal, useGlobal} from 'reactn';

import Admin from '../components/Admin';
import FormLoginUser from '../components/FormLoginUser';
import Notification from '../components/Notification';

setGlobal({
    isLogged: false,
    notifications: new Map(),
    songs: new Map(),
});

import '../static/sass/global.scss';

function Index({logged}) {
    const [isLogged] = useGlobal('isLogged');
    const [notifications] = useGlobal('notifications');

    return (
        <div>
            <Head>
                <title>{`Sing along admin`}</title>
            </Head>
            <Notification notifications={notifications}/>
            {(logged || isLogged) ? (
                <Admin/>
            ) : (
                <FormLoginUser/>
            )}
        </div>
    );
}

Index.getInitialProps = ({req, res}) => {
    return {
        logged: res.isLogged,
    };
};

export default Index;