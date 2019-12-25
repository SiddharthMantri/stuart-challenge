import React from 'react';
import PropTypes from 'prop-types';
import styles from './button.module.css';


const Button = ({ id = '', onClick = () => { }, disabled = false, style = {}, children }) => (
    <button id={id} className={styles['address-button']} onClick={onClick} disabled={disabled} style={{
        ...style,
        opacity: disabled ? '50%' : '100%',
    }}>
        {children}
    </button>
);

Button.propTypes = {
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    style: PropTypes.object,
    children: PropTypes.node,
};

export default Button;
