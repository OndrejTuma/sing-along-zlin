import React, {Component} from 'react';
import Head from 'next/head';

import FormLoginUser from '../components/FormLoginUser';

import '../static/sass/global.scss';

class Index extends Component {
    static async getInitialProps({req, res}) {
        return {
            chapters: res.chapters,
        };
    }
    render() {
        const {chapters} = this.props;

        return (
            <div>
                <Head>
                    <title>{`Sing along`}</title>
                </Head>
                <ul>
                    {chapters.map(chapter => (
                        <li key={chapter._id}>
                            {chapter.title}
                            <p><small>{chapter.body}</small></p>
                        </li>
                    ))}
                </ul>
                <FormLoginUser/>
            </div>
        );
    }
}

export default Index;