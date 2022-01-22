import React, { useContext, Fragment } from "react";
import styles from "./toast.module.css";
import Context from "../../state/context";

const Toast = () => {
  const { toast } = useContext(Context);
  const { open, closeToast = () => {}, msg = "" } = toast;
  return (
    <Fragment>
      {open ? (
        <div
          className={styles.toast}
          onClick={closeToast}
          id={"delivery-toast"}
        >
          <p className={styles.text}>{msg}</p>
        </div>
      ) : null}
    </Fragment>
  );
};

export default Toast;
