import {useState} from 'react';
import {escapeString, highlightString, normalizeString} from 'Helpers/strings';

function useFilterItems(items, searchKey = 'name', defaultSearchText = '') {
    const [searchText, setSearchText] = useState(defaultSearchText);

    function getFilteredItems() {
        if (searchText.length === 0) {
            return items;
        }

        const query = escapeString(normalizeString(searchText));

        return items
            .filter(item => _filterItem(item, query))
            .map(item => _highlightItem(item, query));
    }

    /**
     * @param item
     * @param query
     * @return {boolean}
     * @private
     */
    function _filterItem(item, query) {
        if (!item[searchKey]) {
            return;
        }

        const regex = new RegExp(query);
        const string = normalizeString(item[searchKey]);

        return regex.test(string);
    }

    /**
     * @param {object} item
     * @param {string} query
     * @return {object}
     * @private
     */
    function _highlightItem(item, query) {
        if (!item[searchKey]) {
            return item;
        }

        return {
            ...item,
            highlightedResult: highlightString(item[searchKey], query),
        };
    }

    return [
        getFilteredItems(),
        searchText,
        setSearchText,
    ]
}

export default useFilterItems;