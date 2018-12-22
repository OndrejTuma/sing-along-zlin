import React, {forwardRef, useImperativeMethods, useState} from 'react';
import classNames from 'classnames';

import InputHidden from '../InputHidden';
import InputPassword from '../InputPassword';

import {generateID} from '../../helpers/strings';

import styles from './styles.scss';

function Input({className, errorMessage, id = generateID(), label, name, type = 'text', value = ''}, ref) {
    const [stateValue, setStateValue] = useState(value);
    const [isFocused, setIsFocused] = useState(false);
    const [hasError] = useState(false);

    if (type === 'hidden') {
        return <InputHidden name={name} value={value}/>;
    }

    useImperativeMethods(ref, () => ({
        isEmpty: () => stateValue.trim() === '',
        reset: () => setStateValue(value),
        value: () => stateValue,
    }));

    return (
        <div className={classNames(styles.container, className, {
            [styles.focused]: isFocused,
            [styles.filled]: stateValue && stateValue.length > 0,
            [styles.hasError]: hasError,
        })}>
            {label && <label className={styles.label} htmlFor={id}>{label}</label>}
            {type === 'password' ? (
                <InputPassword name={name} value={stateValue} setIsFocused={setIsFocused} onChange={setStateValue}/>
            ) : (
                <input id={id}
                       type={type}
                       value={stateValue}
                       name={name}
                       onFocus={() => setIsFocused(true)}
                       onBlur={() => setIsFocused(false)}
                       onChange={(e) => setStateValue(e.target.value)}
                />
            )}
            {hasError && <p className={styles.error}>{errorMessage}</p>}
        </div>
    )
}

export default forwardRef(Input);