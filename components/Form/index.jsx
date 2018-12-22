import React from 'react';

import Input from '../Input';

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
        return child.type === Input;
    }

    children.forEach(child => isInputType(child) && refs.set(child.props.name, React.createRef()));

    const referencedChildren = React.Children.map(children, child => {
        return isInputType(child)
            ? React.cloneElement(child, {ref: refs.get(child.props.name)})
            : child;
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