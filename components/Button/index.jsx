import React, {Component} from 'react';
import classNames from 'classnames';

import styles from './styles.scss';

class Button extends Component {
    render() {
        const {label, gray, busy, red, small, type} = this.props;

        return (
            <button type={type} className={classNames(styles.button, {
                [styles.gray]: gray,
                [styles.red]: red,
                [styles.small]: small,
            })}>
                {busy ? '...' : label}
            </button>
        );
    }
}

Button.defaultProps = {
    label: '',
    gray: false,
    busy: false,
    red: false,
    small: false,
    type: 'submit',
};

export default Button;