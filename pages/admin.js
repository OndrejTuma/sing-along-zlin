import React from 'react';
import Head from 'next/head';

import Admin from '../components/Admin';
import FormLoginUser from '../components/FormLoginUser';

import {store, useStore} from '../hooks/store';

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
                <Admin/>
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