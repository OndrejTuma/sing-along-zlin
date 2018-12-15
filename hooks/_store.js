// courtesy of https://blog.usejournal.com/global-state-management-with-react-hooks-5e453468c5bf

import {useEffect, useState} from 'react';

export const _store = {
    state: {},
    setState(value) {
        this.state = value;
        this.setters.forEach(setter => setter(this.state));
    },
    setters: []
};

_store.setState = _store.setState.bind(_store);

export function useStore() {
    const [state, set] = useState(_store.state);

    if (!_store.setters.includes(set)) {
        _store.setters.push(set);
    }

    useEffect(() => () => {
        console.log('unmount before', _store.setters);
        _store.setters = _store.setters.filter(setter => setter !== set)
        console.log('unmount after', _store.setters);
    }, []);

    return [state, _store.setState];
}