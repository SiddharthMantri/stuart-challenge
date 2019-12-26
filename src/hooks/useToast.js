import { useState, useCallback } from 'react';

/**
 * Custom hook for getting state and updating state of the Toast.
 * Could be easily extended to customize the message in the toast as well
 */
const useToast = () => {
    const [open, setOpen] = useState(false);
    const showToast = useCallback(() => {
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 5000);
    }, []);
    const closeToast = useCallback(() => {
        setOpen(false);
    }, []);
    return [open, showToast, closeToast];
};

export default useToast;
