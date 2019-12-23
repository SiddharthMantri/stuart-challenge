import React, { useState, useCallback } from 'react';

/**
 * Custom hook for handling input
 * @param {string} initialValue Initial value to be set as input value
 */
const useDeliveryInput = (initialValue = "") => {
    const [value, setValue] = useState(initialValue);
    const [isValid, setIsValid] = useState(true);
    const onChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);
    return [value, onChange, isValid];
};

export default useDeliveryInput;
