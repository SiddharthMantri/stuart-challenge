import React, { useContext, Fragment } from 'react';
import styles from './toast.module.css';
import Context from '../../state/context';

const Toast = () => {
    const { toast } = useContext(Context);
    const { open, closeToast = () => { } } = toast;
    return (
        <Fragment>
            {open ? <div className={styles.toast} onClick={closeToast}>
                <p className={styles.text}>Job has been created successfully!</p>
            </div> : null}
        </Fragment>
    );
};

export default Toast;
