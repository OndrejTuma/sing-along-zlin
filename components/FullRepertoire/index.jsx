import React from 'react';
import classNames from 'classnames';

import RepertoireNavigation from '../RepertoireNavigation';

import {getHTMLFromStringifiedState} from '../../helpers/wysiwyg';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function FullRepertoire({repertoire, sections, songs}) {
    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <h1>{repertoire.title}</h1>
            <RepertoireNavigation sections={sections} songs={songs}/>
            {sections.map(({_id, title, song: songId}) => {
                const song = songs.filter(song => song._id.toString() === songId.toString())[0];

                return (
                    <div className={styles.section} key={_id} id={title}>
                        <h2><small className={styles.sectionName}>{title}:</small> {song.title}</h2>
                        <div dangerouslySetInnerHTML={{__html: getHTMLFromStringifiedState(song.text)}}/>
                    </div>
                );
            })}
        </div>
    )
}

export default FullRepertoire;