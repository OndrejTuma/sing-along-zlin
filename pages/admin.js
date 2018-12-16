import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import cookie from 'js-cookie';
import {setGlobal, useGlobal} from 'reactn';

import Admin from '../components/Admin';
import FormLoginUser from '../components/FormLoginUser';
import Loading from '../components/Loading';
import Notification from '../components/Notification';

import tokenName from '../api/token_name';

import '../static/sass/global.scss';

setGlobal({
    isLogged: false,
    notifications: new Map(),
    songs: new Map(),
});

function Index({token}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLogged, setIsLogged] = useGlobal('isLogged');
    const [notifications] = useGlobal('notifications');

    useEffect(() => {
        cookie.set(tokenName, token);

        setIsLogged(!!token);
        setIsLoaded(true);
    }, []);

    return (
        <div>
            <Head>
                <title>{`Sing along admin`}</title>
            </Head>
            <Notification notifications={notifications}/>
            {isLoaded ? isLogged ? (
                <Admin/>
            ) : (
                <FormLoginUser/>
            ) : (
                <Loading/>
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