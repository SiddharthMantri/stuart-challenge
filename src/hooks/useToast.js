import { useState, useCallback } from 'react';

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
