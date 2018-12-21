import React from 'react';

function Form({action = '/', children, className, method = 'POST', onSubmit}) {
    function handleSubmit(e) {
        if (typeof onSubmit !== 'function') {
            return;
        }

        let elements = new Map();

        e.preventDefault();

        for (let elm of e.target.elements) {
            if (!elm.name) {
                continue;
            }

            elements.set(elm.name, elm.value);
        }

        onSubmit(elements);
    }

    return (
        <form action={action}
              onSubmit={handleSubmit}
              method={method} className={className}>
            {children}
        </form>
    );
}

export default Form;