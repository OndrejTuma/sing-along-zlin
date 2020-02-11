import React, {createRef, useEffect, useState} from 'react';
import {useGlobal} from 'reactn';

import BinSVG from 'Svg/bin.svg';
import CheckSVG from 'Svg/check.svg';
import PencilSVG from 'Svg/pencil.svg';

import {
    deleteRepertoire as deleteRepertoireAPI,
    fetchSectionsInRepertoar,
    setActiveRepertoire,
    updateRepertoire,
} from '../../api/client';
import useGlobalMap from '../../hooks/useGlobalMap';

import styles from './styles.scss';

function Repertoire({repertoire}) {
    const [fetching, setFetching] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentActiveRepertoireId, setCurrentActiveRepertoireId] = useGlobal('currentActiveRepertoireId');
    const [editingRepertoireId, setEditingRepertoireId] = useGlobal('editingRepertoireId');
    const [, addNotification] = useGlobalMap('notifications');
    const [, addRepertoire, deleteRepertoire] = useGlobalMap('repertoires');
    const [sections, addSection] = useGlobalMap('sections');
    const [isMouseEnter, setIsMouseEnter] = useState(false);
    const inputRef = createRef();

    async function fetchRepertoarSections() {
        setFetching(true);
        try {
            const {sections} = await fetchSectionsInRepertoar(repertoire._id);

            sections.forEach(section => addSection(section._id, section));
        } catch (e) {
            addNotification(e.message, 'error');
        } finally {
            setFetching(false);
        }
    }
    async function handleSetActive() {
        try {
            if (currentActiveRepertoireId === repertoire._id) {
                await setActiveRepertoire('');
                setCurrentActiveRepertoireId('');
            } else {
                await setActiveRepertoire(repertoire._id);
                setCurrentActiveRepertoireId(repertoire._id);
            }
        } catch (e) {
            addNotification(e.message, 'error');
        }
    }
    function handleSetEditingRepertoar() {
        setEditingRepertoireId(repertoire._id);

        let sectionsLoaded = false;
        sections.forEach(({belongsTo}) => {
            if (belongsTo === repertoire._id) {
                sectionsLoaded = true;
            }
        });

        if (sectionsLoaded) {
            return;
        }

        fetchRepertoarSections();
    }
    async function handleDeleteRepertoire() {
        if (!confirm(`Opravdu smazat repertoár "${repertoire.title}"?`)) {
            return;
        }

        try {
            await deleteRepertoireAPI(repertoire._id);

            deleteRepertoire(repertoire._id);
        } catch (e) {
            addNotification(e.message, 'error');
        }
    }
    async function handleKeyUp(e) {
        if (e.keyCode !== 13) {
            return;
        }

        // enter
        try {
            await updateRepertoire(repertoire._id, {title: inputRef.current.value});

            addRepertoire(repertoire._id, {
                ...repertoire,
                title: inputRef.current.value,
            });
            setIsEditing(false);
        } catch (e) {
            addNotification(e.message, 'error');
        }
    }

    useEffect(() => {
        isEditing && inputRef.current.focus();
    }, [isEditing]);

    return (
        <div className={styles.wrapper}>
            <h4
                className={styles.title}
                onMouseEnter={() => setIsMouseEnter(true)}
                onMouseLeave={() => setIsMouseEnter(false)}
            >
                {editingRepertoireId === repertoire._id && <small>(upravujete) </small>}
                {isEditing ? (
                    <input type={'text'} defaultValue={repertoire.title} ref={inputRef} onKeyUp={handleKeyUp}/>
                ) : (
                    <span className={styles.name} onClick={handleSetEditingRepertoar}>{repertoire.title}</span>
                )}
                {(isMouseEnter || currentActiveRepertoireId === repertoire._id) && (
                    <span onClick={handleSetActive} title={'Zobrazit na hlavní stránce'}>
                        <CheckSVG/>
                    </span>
                )}
            </h4>
            {isEditing ? (
                <span className={styles.editIcon} onClick={() => setIsEditing(false)}>&times;</span>
            ) : (
                <span className={styles.editIcon} onClick={() => setIsEditing(true)}>
                    <PencilSVG/>
                </span>
            )}
            <BinSVG className={styles.removeIcon} onClick={handleDeleteRepertoire}/>
        </div>
    )
}

export default Repertoire;