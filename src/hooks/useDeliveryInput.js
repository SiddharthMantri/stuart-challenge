import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { createRef, useCallback, useState } from 'react';
import { useAsyncAbortable } from 'react-async-hook';
import API from '../api';

const useMyMemo = (fn = () => { }) => {
    const ref = createRef();
    if (!ref.current) {
        ref.current = { v: fn() };
    }
    return ref.current.v;
};
/**
 * Custom hook for handling input
 * @param {string} initialValue Initial value to be set as input value
 */
const useDeliveryInput = (initialValue = '') => {
    const [value, setValue] = useState(initialValue);
    const [isValid, setIsValid] = useState(false);
    const [address, setAddress] = useState(null);

    const geoCodeRequest = () => {
        API.geocode({
            address: value,
        }).then((response) => {
            if (response.error) {
                setIsValid(false);
            } else {
                setIsValid(true);
                setAddress(response);
            }
        });
    };

    const onBlur = () => {
        geoCodeRequest();
    };

    const reset = () => {
        setValue('');
        setIsValid(false);
        setAddress(null);
    };

    const debouncedSearch = useMyMemo(() => AwesomeDebouncePromise(geoCodeRequest, 500));
    useAsyncAbortable(() => value.length === 0 ? [] : debouncedSearch(), [value]);

    const onChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);
    return [value, onChange, isValid, address, onBlur, reset];
};

export default useDeliveryInput;
