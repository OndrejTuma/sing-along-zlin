import React from 'react';
import Head from 'next/head';

import FormLoginUser from '../components/FormLoginUser';
import FormNewSong from '../components/FormNewSong';

import {store, useStore} from '../hooks/global';

import '../static/sass/global.scss';

function Index({logged}) {
    const [state] = useStore();
    const {isLogged} = state;

    return (
        <div>
            <Head>
                <title>{`Sing along admin`}</title>
            </Head>
            {(logged || isLogged) ? (
                <FormNewSong/>
            ) : (
                <FormLoginUser/>
            )}
        </div>
    );
}

Index.getInitialProps = ({req, res}) => {
    store.state = {
        isLogged: res.isLogged,
    };

    return {
        logged: res.isLogged,
    };
};

export default Index;