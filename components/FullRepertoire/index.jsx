import React from 'react';
import classNames from 'classnames';

import {getHTMLFromStringifiedState} from '../../helpers/wysiwyg';

import styles from './styles.scss';

function FullRepertoire({repertoire, sections, songs}) {
    return (
        <div className={classNames('wrapper', styles.wrapper)}>
            <h1>{repertoire.title}</h1>
            {sections.map(({_id, title, song: songId}) => {
                const song = songs.filter(song => song._id.toString() === songId.toString())[0];

                return (
                    <div key={_id}>
                        <h2><small>{title}</small>: {song.title}</h2>
                        <div dangerouslySetInnerHTML={{__html: getHTMLFromStringifiedState(song.text)}}/>
                    </div>
                );
            })}
        </div>
    )
}

export default FullRepertoire;