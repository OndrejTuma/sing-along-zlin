import React from 'react';
import Head from 'next/head';

import '../static/sass/global.scss';

function Index({activeRepertoire}) {
    const {repertoire, sections, songs} = activeRepertoire;
    return (
        <div>
            <Head>
                <title>{`Sing along!`}</title>
            </Head>
            {repertoire ? (
                <>
                    <h1>{repertoire.title}</h1>
                    {sections.map(({_id, title, song: songId}) => {
                        const song = songs.filter(song => song._id.toString() === songId.toString())[0];

                        return (
                            <div key={_id}>
                                <h2><small>{title}</small>: {song.title}</h2>
                                <p>{song.text}</p>
                            </div>
                        );
                    })}
                </>
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