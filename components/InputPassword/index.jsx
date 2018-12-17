import React, {useState} from 'react';

import Visibility from '../../static/svg/visibility.svg';
import VisibilityOff from '../../static/svg/visibility_off.svg';

import styles from './styles.scss';

function InputPassword({name, onChange, setIsFocused, value}) {
    const [isVisible, setIsVisible] = useState(false);

    const Icon = isVisible ? VisibilityOff : Visibility;

    return (
        <>
            <input type={isVisible ? 'text' : 'password'}
                   value={value}
                   name={name}
                   onFocus={() => setIsFocused(true)}
                   onBlur={() => setIsFocused(false)}
                   onChange={(e) => onChange(e.target.value)}
            />
            <Icon className={styles.eye} onClick={() => setIsVisible(!isVisible)}/>
        </>
    )
}

export default InputPassword;