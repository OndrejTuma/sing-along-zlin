import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import {setGlobal, useGlobal} from 'reactn';

import AdminContent from '../components/AdminContent';
import FormLoginUser from '../components/FormLoginUser';
import Loading from '../components/Loading';
import Notification from '../components/Notification';

import {setTokenCookie} from '../helpers/user';
import useGlobalMap from '../hooks/useGlobalMap';

import '../static/sass/global.scss';

setGlobal({
    isLogged: false,
    notifications: new Map(),
    currentRepertoireId: '',
    repertoires: new Map(),
    sections: new Map(),
    songs: new Map(),
});

function Admin({songs, token}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLogged, setIsLogged] = useGlobal('isLogged');
    const [, addSong] = useGlobalMap('songs');
    const [notifications] = useGlobal('notifications');

    useEffect(() => {
        songs.forEach(song => addSong(song._id, song));
        setTokenCookie(token);

        //TODO: think of a way to set token from server to false after using it here
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
                <AdminContent/>
            ) : (
                <FormLoginUser/>
            ) : (
                <Loading/>
            )}
        </div>
    );
}

Admin.getInitialProps = ({req, res: {songs, token}}) => {
    return {
        songs,
        token,
    };
};

export default Admin;