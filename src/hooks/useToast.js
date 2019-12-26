import { useState, useCallback } from 'react';

/**
 * Custom hook for getting state and updating state of the Toast.
 * Could be easily extended to customize the message in the toast as well
 */
const useToast = (message = '', timeout = 5000) => {
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState(message);
    const showToast = useCallback(() => {
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, timeout);
    }, []);
    const closeToast = useCallback(() => {
        setOpen(false);
    }, []);
    return [open, msg, showToast, closeToast];
};

export default useToast;
