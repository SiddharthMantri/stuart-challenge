import React from 'react';
import PropTypes from 'prop-types';
import Context from './context';
import useMap from '../hooks/useMap';

const Provider = ({ children }) => {
    const { state } = useMap('AIzaSyDmvHzsfND8c39HNI95OiahLJ7bRyXBKkA');
    return (
        <Context.Provider value={{ state }}>
            {children}
        </Context.Provider>
    );
};

Provider.propTypes = {
    children: PropTypes.node,
};

export default Provider;
