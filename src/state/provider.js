import React from 'react';
import PropTypes from 'prop-types';
import Context from './context';
import useMap from '../hooks/useMap';
import useToast from '../hooks/useToast';

const Provider = ({ children }) => {
    // Public methods of GoogleMap class is exposed throughout the app using the useMap hook
    const { state } = useMap('AIzaSyDmvHzsfND8c39HNI95OiahLJ7bRyXBKkA');
    const [open, msg, showToast, closeToast] = useToast('Job has been created successfully!', 5000);
    const toast = { open, msg, showToast, closeToast };
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
