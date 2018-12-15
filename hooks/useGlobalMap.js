import {useGlobal} from 'reactn';

function useGlobalMap(name) {
    const [map, setMap] = useGlobal(name);

    function addItem(id, item) {
        setMap(map.set(id, item));
    }

    function deleteItem(id) {
        map.delete(id);
        setMap(map);
    }

    return [map, addItem, deleteItem];
}

export default useGlobalMap;