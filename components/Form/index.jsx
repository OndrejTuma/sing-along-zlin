import React, {Component} from 'react';
import classNames from 'classnames';

class Form extends Component {
    handleSubmit = e => {
        const {onSubmit} = this.props;
        let elements = new Map();

        if (typeof onSubmit !== 'function') {
            return;
        }

        e.preventDefault();

        for (let elm of e.target.elements) {
            if (!elm.name) {
                continue;
            }

            elements.set(elm.name, elm.value);
        }

        onSubmit(elements);
    };

    render() {
        const {action, className, method, children} = this.props;

        return (
            <form action={action}
                  onSubmit={this.handleSubmit}
                  method={method} className={classNames(className)}>
                {children}
            </form>
        );
    }
}

Form.defaultProps = {
    action: '/',
    className: '',
    method: 'POST',
};

export default Form;