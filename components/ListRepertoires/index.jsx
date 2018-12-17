import React, {useEffect, useState} from 'react';

import Loading from '../Loading';

import {fetchRepertoires} from '../../api/client';
import useGlobalMap from '../../hooks/useGlobalMap';

import styles from './styles.scss';
import {setTokenCookie} from "../../helpers/user";
import {useGlobal} from "reactn";

function ListRepertoires() {
    const [fetching, setFetching] = useState(false);
    const [, setCurrentRepertoireId] = useGlobal('currentRepertoireId');
    const [repertoires, addRepertoire] = useGlobalMap('repertoires');
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
        <ul className={styles.wrapper}>
            {repertoires && repertoires.size > 0 ? [...repertoires.values()].map(repertoire => (
                <li key={repertoire._id} onClick={() => setCurrentRepertoireId(repertoire._id)}>
                    {repertoire.title}
                </li>
            )) : (
                <li><i>zatím žádné nejsou</i></li>
            )}
        </ul>
    )
}

export default ListRepertoires;