import React from 'react';

function InputHidden({name, value}) {
    return (
        <input
            type={'hidden'}
            name={name}
            value={value}
            readOnly
        />
    )
}

export default InputHidden;