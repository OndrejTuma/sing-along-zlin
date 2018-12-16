import React, {useEffect} from 'react';
import Head from 'next/head';
import cookie from 'js-cookie';
import {setGlobal, useGlobal} from 'reactn';

import Admin from '../components/Admin';
import FormLoginUser from '../components/FormLoginUser';
import Notification from '../components/Notification';

import tokenName from '../api/token_name';

import '../static/sass/global.scss';

setGlobal({
    isLogged: false,
    notifications: new Map(),
    songs: new Map(),
});

function Index({token}) {
    const [isLogged] = useGlobal('isLogged');
    const [notifications] = useGlobal('notifications');

    useEffect(() => {
        cookie.set(tokenName, token);
    }, []);

    return (
        <div>
            <Head>
                <title>{`Sing along admin`}</title>
            </Head>
            <Notification notifications={notifications}/>
            {(token || isLogged) ? (
                <Admin/>
            ) : (
                <FormLoginUser/>
            )}
        </div>
    );
}

Index.getInitialProps = ({req, res}) => {
    return {
        token: res.token,
    };
};

export default Index;