import React from 'react';

import Input from '../Input';
import SongPicker from '../SongPicker';
import Wysiwyg from '../Wysiwyg';

function Form({action = '/', children, className, method = 'POST', onSubmit}) {
    const refs = new Map();

    function handleSubmit(e) {
        if (typeof onSubmit !== 'function') {
            return;
        }

        e.preventDefault();

        onSubmit(refs);
    }

    function isFormElement(child) {
        return child.type === Input || child.type === Wysiwyg || child.type === SongPicker;
    }

    const referencedChildren = React.Children.map(children, child => {
        if (isFormElement(child)) {
            const {name} = child.props;

            refs.set(name, React.createRef());

            return React.cloneElement(child, {ref: refs.get(name)})
        }

        return child;
    });

    return (
        <form action={action}
              onSubmit={handleSubmit}
              method={method} className={className}>
            {referencedChildren}
        </form>
    );
}

export default Form;