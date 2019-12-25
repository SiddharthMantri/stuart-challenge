import React from 'react';
import PropTypes from 'prop-types';
import Context from './context';
import useMap from '../hooks/useMap';
import useToast from '../hooks/useToast';

const Provider = ({ children }) => {
    const { state } = useMap('AIzaSyDmvHzsfND8c39HNI95OiahLJ7bRyXBKkA');
    const [open, showToast, closeToast] = useToast();
    const toast = { open, showToast, closeToast };

    return (
        <Context.Provider value={{ state, toast }}>
            {children}
        </Context.Provider>
    );
};

Provider.propTypes = {
    children: PropTypes.node,
};

export default Provider;
