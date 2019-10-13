import React, {useEffect, useState} from 'react';

import Loading from '../Loading';

import {fetchRepertoires} from '../../api/client';
import useGlobalMap from '../../hooks/useGlobalMap';

import styles from './styles.scss';
import Repertoire from "../Repertoire";

function ListRepertoires() {
    const [fetching, setFetching] = useState(false);
    const [repertoires, addRepertoire] = useGlobalMap('repertoires');
    const [, addNotification] = useGlobalMap('notifications');

    useEffect(() => {
        setFetching(true);
        fetchRepertoires()
            .then(({repertoires}) => {
                repertoires.forEach(repertoire => addRepertoire(repertoire._id, repertoire));
            })
            .catch(e => addNotification(e.message, 'error'))
            .finally(() => setFetching(false));
    }, []);

    if (fetching) {
        return <Loading/>;
    }

    return (
        <div className={styles.wrapper}>
            <h3>Uložené repertoáry</h3>
            <ul>
                {repertoires && repertoires.size > 0 ? [...repertoires.values()].map(repertoire => (
                    <li key={repertoire._id}>
                        <Repertoire repertoire={repertoire}/>
                    </li>
                )) : (
                    <li><i>zatím žádné nejsou</i></li>
                )}
            </ul>
        </div>
    )
}

export default ListRepertoires;