import React, {useState} from 'react';

function useMap(initialState = new Map()) {
    const [map, setMap] = useState(initialState);

    function addItem(id, item) {
        setMap(map.set(id, item));
    }

    function deleteItem(id) {
        map.delete(id);
        setMap(map);
    }

    function reset() {
        setMap(initialState);
    }

    return [map, addItem, deleteItem, reset];
}

export default useMap;