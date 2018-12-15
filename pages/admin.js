import React, {Component} from 'react';
import Head from 'next/head';

import FormLoginUser from '../components/FormLoginUser';
import FormNewSong from '../components/FormNewSong';

import '../static/sass/global.scss';

class Index extends Component {
    static async getInitialProps({req, res}) {
        return {
            isLogged: res.isLogged,
        };
    }

    render() {
        const {isLogged} = this.props;

        console.log('isLogged', isLogged);

        return (
            <div>
                <Head>
                    <title>{`Sing along admin`}</title>
                </Head>
                {isLogged ? (
                    <FormNewSong/>
                ) : (
                    <FormLoginUser/>
                )}
            </div>
        );
    }
}

export default Index;