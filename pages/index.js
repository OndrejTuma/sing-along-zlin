import React from 'react';
import Head from 'next/head';

import FullRepertoire from "../components/FullRepertoire";

import '../static/sass/global.scss';
import globalStyles from 'Sass/global.scss';

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
                <div className={globalStyles.wrapper} style={{textAlign: 'center'}}>
                    <h1>Dneska se nezpívá</h1>
                </div>
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