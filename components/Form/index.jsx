import React from 'react';

import Input from '../Input';
import Wysiwyg from '../Wysiwyg';

function Form({action = '/', children, className, method = 'POST', onSubmit}) {
    const refs = new Map();

    function handleSubmit(e) {
        if (typeof onSubmit !== 'function') {
            return;
        }

        const elements = new Map();

        e.preventDefault();

        for (const elm of e.target.elements) {
            if (!elm.name) {
                continue;
            }

            elements.set(elm.name, elm.value);
        }

        onSubmit(elements, refs);
    }

    function isInputType(child) {
        return child.type === Input || child.type === Wysiwyg;
    }

    const referencedChildren = React.Children.map(children, child => {
        if (isInputType(child)) {
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