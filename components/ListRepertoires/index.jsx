import React, {useEffect, useState} from 'react';
import {useGlobal} from 'reactn';

import Loading from '../Loading';

import {fetchRepertoires} from '../../api/client';
import {setTokenCookie} from '../../helpers/user';
import useGlobalMap from '../../hooks/useGlobalMap';

import styles from './styles.scss';
import Repertoire from "../Repertoire";

function ListRepertoires() {
    const [fetching, setFetching] = useState(false);
    const [, setCurrentRepertoireId] = useGlobal('currentRepertoireId');
    const [repertoires, addRepertoire] = useGlobalMap('repertoires');
    const [, addSection] = useGlobalMap('sections');
    const [, addNotification] = useGlobalMap('notifications');

    useEffect(() => {
        setFetching(true);
        fetchRepertoires()
            .then(({repertoires, token}) => {
                repertoires.forEach(repertoire => addRepertoire(repertoire._id, repertoire));
                setTokenCookie(token);
            })
            .catch(e => addNotification(e.message, 'error'))
            .finally(() => setFetching(false));
    }, []);

    if (fetching) {
        return <Loading/>;
    }

    return (
        <>
            <h3>Uložené repertoáry</h3>
            <ul className={styles.wrapper}>
                {repertoires && repertoires.size > 0 ? [...repertoires.values()].map(repertoire => (
                    <li key={repertoire._id}>
                        <Repertoire repertoire={repertoire}/>
                    </li>
                )) : (
                    <li><i>zatím žádné nejsou</i></li>
                )}
            </ul>
        </>
    )
}

export default ListRepertoires;