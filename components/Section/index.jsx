import {createRef, useEffect, useState} from 'react';
import classNames from 'classnames';
import {useDrag, useDrop} from 'react-dnd-cjs';

import BinSVG from 'Svg/bin.svg';
import PencilSVG from 'Svg/pencil.svg';

import {deleteSection as deleteSectionAPI, updateSection} from 'Api/client';
import dragTypes from 'Consts/dragTypes';
import {inflectString} from 'Helpers/strings';
import useGlobalMap from 'Hooks/useGlobalMap';

import styles from './styles.scss';

function Section({onDrop, section, songs}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [, setNotification] = useGlobalMap('notifications');
    const [, addSection, deleteSection] = useGlobalMap('sections');
    const [{opacity}, dragRef] = useDrag({
        item: {
            type: dragTypes.SECTION,
            id: section._id,
        },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        }),
    });
    const [{isOver}, dropRef] = useDrop({
        accept: dragTypes.SECTION,
        drop: ({id: fromId}) => typeof onDrop === 'function' && onDrop(fromId, section._id),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });
    const inputRef = createRef();

    async function handleDeleteSection() {
        if (!confirm(`Opravdu smazat sekci "${section.title}"?`)) {
            return;
        }

        try {
            await deleteSectionAPI(section._id);

            deleteSection(section._id);
        } catch (e) {
            setNotification(e.message, 'error');
        }
    }
    async function handleKeyUp(e) {
        if (e.keyCode !== 13) {
            return;
        }

        // enter
        try {
            await updateSection(section._id, {title: inputRef.current.value});

            addSection(section._id, {
                ...section,
                title: inputRef.current.value,
            });
            setIsEditing(false);
        } catch (e) {
            setNotification(e.message, 'error');
        }
    }

    useEffect(() => {
        isEditing && inputRef.current.focus();
    }, [isEditing]);

    return (
        <div className={styles.wrapper} ref={dropRef} style={{opacity}}>
            <h4 ref={dragRef} onClick={() => setIsOpen(!isOpen)} className={classNames(styles.heading, {
                [styles.dragOver]: isOver,
            })}>
                {isEditing ? (
                    <input type="text" defaultValue={section.title} ref={inputRef} onKeyUp={handleKeyUp}/>
                ) : section.title}
                <small> ({songs.length} {inflectString(songs.length, ['písnička', 'písničky', 'písniček'])})</small>
            </h4>
            {isOpen && (
                <ul>
                    {songs.map(({_id: id, title}) => (
                        <li key={id}>{title}</li>
                    ))}
                </ul>
            )}
            {isEditing ? (
                <span className={styles.editIcon} onClick={() => setIsEditing(false)}>&times;</span>
            ) : (
                <PencilSVG title={'Upravit sekci'} className={styles.editIcon} onClick={() => setIsEditing(true)}/>
            )}
            <BinSVG title={'Smazat sekci'} className={styles.removeIcon} onClick={handleDeleteSection}/>
        </div>
    )
}

export default Section;