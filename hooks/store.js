// courtesy of https://blog.usejournal.com/global-state-management-with-react-hooks-5e453468c5bf

import {useEffect, useState} from 'react';

export const store = {
    state: {},
    setState(value) {
        this.state = value;
        this.setters.forEach(setter => setter(this.state));
    },
    setters: []
};

store.setState = store.setState.bind(store);

export function useStore() {
    const [state, set] = useState(store.state);

    if (!store.setters.includes(set)) {
        store.setters.push(set);
    }

    useEffect(() => () => {
        console.log('unmount before', store.setters);
        store.setters = store.setters.filter(setter => setter !== set)
        console.log('unmount after', store.setters);
    }, []);

    return [state, store.setState];
}