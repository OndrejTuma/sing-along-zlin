import React from 'react';
import Head from 'next/head';

import '../static/sass/global.scss';
import FullRepertoire from "../components/FullRepertoire";

function Index({activeRepertoire}) {
    return (
        <div>
            <Head>
                <title>{`Sing along!`}</title>
            </Head>
            {activeRepertoire ? (
                <FullRepertoire
                    repertoire={activeRepertoire.repertoire}
                    sections={activeRepertoire.sections}
                    songs={activeRepertoire.songs}
                />
            ) : (
                <h1>Dneska se nezpívá</h1>
            )}
        </div>
    );
}

Index.getInitialProps = ({req, res: {activeRepertoire}}) => {
    return {
        activeRepertoire,
    };
};

export default Index;