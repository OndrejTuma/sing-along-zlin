import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import {setGlobal, useGlobal} from 'reactn';

import AdminContent from '../components/AdminContent';
import AdminLogin from '../components/AdminLogin';
import Loading from '../components/Loading';
import Notification from '../components/Notification';

import {getUserCookie} from 'Helpers/user';
import useGlobalMap from '../hooks/useGlobalMap';

import '../static/sass/global.scss';

setGlobal({
    isLogged: false,
    editingRepertoireId: '',
    editingSongs: new Map(),
    currentActiveRepertoireId: '',
    notifications: new Map(),
    repertoires: new Map(),
    sections: new Map(),
    songs: new Map(),
    visibility: new Map(),
});

function Admin({activeRepertoire, songs}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLogged, setIsLogged] = useGlobal('isLogged');
    const [, setCurrentActiveRepertoireId] = useGlobal('currentActiveRepertoireId');
    const [, addSong] = useGlobalMap('songs');
    const [notifications] = useGlobal('notifications');

    useEffect(() => {
        songs.forEach(song => addSong(song._id, song));
        activeRepertoire && setCurrentActiveRepertoireId(activeRepertoire._id);

        //TODO: think of a way to set token from server to false after using it here
        setIsLogged(!!getUserCookie());
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
                <AdminLogin/>
            ) : (
                <Loading/>
            )}
        </div>
    );
}

Admin.getInitialProps = ({req, res: {activeRepertoire, songs}}) => {
    return {
        activeRepertoire,
        songs,
    };
};

export default Admin;