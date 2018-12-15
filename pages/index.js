import React, {Component} from 'react';
import Head from 'next/head';

import '../static/sass/global.scss';

class Index extends Component {
    static async getInitialProps({req, res}) {
        return {
            isLogged: res.isLogged,
            songs: res.songs,
        };
    }

    render() {
        const {songs} = this.props;

        return (
            <div>
                <Head>
                    <title>{`Sing along`}</title>
                </Head>
                <h1>Písničky</h1>
                <ul>
                    {songs ? songs.map(song => (
                        <li key={song._id}>
                            <h3>{song.title}</h3>
                            <p><small><i>{song.text}</i></small></p>
                        </li>
                    )) : <li><i>zatím žádné nejsou</i></li>}
                </ul>
            </div>
        );
    }
}

export default Index;