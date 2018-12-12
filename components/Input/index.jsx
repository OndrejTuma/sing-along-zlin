import React, {Component} from 'react';
import classNames from 'classnames';

import Visibility from '../../static/svg/visibility.svg';
import VisibilityOff from '../../static/svg/visibility_off.svg';

import styles from './styles.scss';

class Input extends Component {
    state = {
        focused: false,
        passwordVisible: false,
        value: '',
    };

    handleBlur = () => {
        this.setState({focused: false});
    };

    handleChange = () => {
        this.setState({value: this.input.value});
    };

    handleFocus = () => {
        this.setState({focused: true});
    };

    togglePassword = () => {
        this.setState({passwordVisible: !this.state.passwordVisible});
    };

    render() {
        const {className, errorText, hasError, id, label, name, type} = this.props;
        const {focused, passwordVisible, value} = this.state;

        const filled = value.length > 0;
        const isPassword = type === 'password';

        let Eye;

        if (isPassword) {
            Eye = passwordVisible ? VisibilityOff : Visibility;
        }

        return (
            <div className={classNames(styles.container, className, {
                [styles.focused]: focused,
                [styles.filled]: filled,
                [styles.hasError]: hasError,
            })}>
                {label && <label className={styles.label} htmlFor={id}>{label}</label>}
                <input id={id} type={passwordVisible ? 'text' : type}
                       value={value}
                       name={name}
                       ref={el => this.input = el}
                       onFocus={this.handleFocus}
                       onBlur={this.handleBlur}
                       onChange={this.handleChange}/>
                {isPassword && <Eye className={styles.eye} onClick={this.togglePassword}/>}
                {errorText && <p className={styles.error}>{errorText}</p>}
            </div>
        );
    }
}

Input.defaultProps = {
    hasError: false,
    type: 'text',
};

export default Input;