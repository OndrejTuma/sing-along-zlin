import React from 'react';
import classNames from 'classnames';

import RepertoireNavigation from '../RepertoireNavigation';

import {getHTMLFromStringifiedState} from '../../helpers/wysiwyg';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function FullRepertoire({repertoire, sections, songs}) {
    const songsMap = new Map(songs.map(song => ([song._id, song])));

    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <h1>{repertoire.title}</h1>
            <RepertoireNavigation sections={sections} songs={songs}/>
            {sections.map(({_id, title: sectionTitle, songs: sectionSongs}) => {
                const songsList = sectionSongs.map(id => songsMap.get(id));

                return (
                    <div className={styles.section} key={_id} id={sectionTitle}>
                        {songsList.filter(song => song).map(({_id: id, title, text}, index) => (
                            <div key={id} className={styles.song}>
                                <h2>{index === 0 && <small className={styles.sectionName}>{sectionTitle}:</small> }{title}</h2>
                                <div dangerouslySetInnerHTML={{__html: getHTMLFromStringifiedState(text)}}/>
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    )
}

export default FullRepertoire;