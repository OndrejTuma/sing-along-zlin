import React, {Component} from 'react';
import Head from 'next/head';

import {deleteSong} from '../api/client';

import '../static/sass/global.scss';

class Index extends Component {
    static async getInitialProps({req, res}) {
        return {
            isLogged: res.isLogged,
            songs: res.songs,
        };
    }

    async deleteSong(e, song) {
        e.preventDefault();

        try {
            await deleteSong(song.title);


        } catch (e) {
            console.error(e);
        }
    }

    render() {
        const {isLogged, songs} = this.props;
        console.log('isLogged', isLogged);

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
                            <strong onClick={e => this.deleteSong(e, song)}>&times;</strong>
                            <p><small><i>{song.text}</i></small></p>
                        </li>
                    )) : <li><i>zatím žádné nejsou</i></li>}
                </ul>
            </div>
        );
    }
}

export default Index;