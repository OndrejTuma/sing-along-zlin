import React, {Component} from 'react';
import Head from 'next/head';

class Index extends Component {
    static getInitialProps({res}) {
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
                <h1>Vítej zpěváku!</h1>
                <ul>
                    {chapters.map(chapter => <li key={chapter.id}>{chapter.title}</li>)}
                </ul>
            </div>
        );
    }
}

export default Index;