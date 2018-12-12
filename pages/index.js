import React, {Component} from 'react';
import Head from 'next/head';

import FormNewChapter from '../components/FormNewChapter';

import '../static/sass/global.scss';

class Index extends Component {
    static getInitialProps({res}) {
        return {
            chapters: res.chapters,
        };
    }
    render() {
        const {chapters} = this.props;
        console.log(chapters);

        return (
            <div>
                <Head>
                    <title>{`Sing along`}</title>
                </Head>
                <h1>Vítej zpěváku!</h1>
                <ul>
                    {chapters.map(chapter => (
                        <li key={chapter._id}>
                            {chapter.title}
                            <p><small>{chapter.body}</small></p>
                        </li>
                    ))}
                </ul>
                <FormNewChapter/>
            </div>
        );
    }
}

export default Index;