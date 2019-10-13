import React, {useCallback, useEffect, useState} from 'react';
import classNames from 'classnames';

import useFilterItems from 'Hooks/useFilterItems';

import styles from './styles.scss';

function FilteringDropdown({
                               activeItem,
                               activeItemTemplate,
                               autofocus,
                               className,
                               classNameContent,
                               disabled,
                               hasError,
                               items,
                               itemTemplate,
                               onDidMount,
                               onSelect,
                               placeholder,
                               searchIn,
                               showFilterThreshold = 15,
                           }) {
    const [opened, setOpened] = useState(false);
    const [active, setActive] = useState(activeItem || items[0]);
    const dropdownRef = React.createRef();
    const inputRef = React.createRef();

    const [filteredItems, searchText, setSearchText] = useFilterItems(items, searchIn);

    function toggleOpen() {
        if (disabled) {
            return;
        }

        setOpened(!opened);
    }

    function select(item, e) {
        if (disabled) {
            return;
        }

        setActive(item);
        setOpened(false);

        if (typeof onSelect === 'function') {
            onSelect.call(this, item, e);
        }
    }

    const handleDocumentInteraction = useCallback(({target}) => {
        if (closed || !dropdownRef.current || dropdownRef.current.contains(target)) {
            return;
        }

        setOpened(false);
    }, [dropdownRef]);


    useEffect(() => {
        typeof onDidMount === 'function' && onDidMount.call(this, active);
    }, []);
    useEffect(() => {
        self.document.addEventListener('click', handleDocumentInteraction, true);

        return () => {
            self.document.removeEventListener('click', handleDocumentInteraction, true);
        }
    }, [handleDocumentInteraction]);
    useEffect(() => {
        opened && autofocus && inputRef.current && inputRef.current.focus();
    }, [opened]);

    return (
        <div ref={dropdownRef} className={classNames(styles.dropdown, className, {
            [styles.disabled]: disabled,
            [styles.error]: hasError,
            [styles.opened]: opened,
        })}>
            <p className={styles.activeItem} onClick={() => toggleOpen()}>
                {active && placeholder ? placeholder : _activeItemHTML(activeItemTemplate, searchIn, active)}
            </p>
            {opened && (
                <div className={classNames(styles.dropdownContent, classNameContent)}>
                    {items.length > showFilterThreshold && (
                        <div className={styles.input}>
                            <input type={'text'} onChange={({target: {value}}) => {
                                setSearchText(value);
                            }} ref={inputRef} value={searchText}/>
                        </div>
                    )}
                    <div className={styles.list}>
                        {_itemsTemplate(filteredItems, itemTemplate, searchIn, select)}
                    </div>
                </div>
            )}
        </div>
    )
}

function _activeItemHTML(activeItemTemplate, searchIn, activeItem) {
    return activeItemTemplate
        ? activeItemTemplate(activeItem)
        : <span>{activeItem[searchIn]}</span>;
}

function _itemsTemplate(items, itemTemplate, searchIn, onClick) {
    return items.map((item, i) => (
        <div key={i} className={styles.item} onClick={e => onClick(item, e)}>
            {itemTemplate
                ? itemTemplate(item)
                : item.highlightedResult
                    ? <span dangerouslySetInnerHTML={{__html: item.highlightedResult}}/>
                    : <span>{item[searchIn]}</span>
            }
        </div>
    ));
}

/**
 * @type {object}
 * @property {function} [activeItemTemplate] - takes item and event object and returns jsx
 * @property {string} [className]
 * @property {object[]} items
 * @property {function} [itemTemplate] - takes item and event object and returns jsx
 * @property {function} [onSelect] - fires upon item selection
 * @property {string} [placeholder] - placeholder text to show if no item is selected
 * @property {string} searchIn - item key
 * @property {object} [activeItem] - currently selected item
 * @property {boolean} [disabled] - when dropdown is disabled, it will not react to any user action
 * @property {boolean} [customized] - customized dropdown, full height, scrollbar always visible on mobile
 */
FilteringDropdown.defaultProps = {
    activeItem: null,
    activeItemTemplate: null,
    className: '',
    disabled: false,
    items: [],
    itemTemplate: null,
    onSelect: (__item, __e) => {},
    placeholder: '',
    searchIn: 'name',
};

export default FilteringDropdown;