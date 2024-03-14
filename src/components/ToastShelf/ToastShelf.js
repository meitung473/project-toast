import React from "react";

import Toast from "../Toast";
import { useToast } from "../ToastProvider";
import styles from "./ToastShelf.module.css";

function ToastShelf() {
    const { toasts, delay } = useToast();
    return (
        <ol
            className={styles.wrapper}
            role="region"
            aria-live="polite"
            aria-label="Notification"
        >
            {toasts.map(({ id, variant, message }) => {
                return (
                    <li
                        key={id}
                        className={styles.toastWrapper}
                        style={{
                            "--delay": `${delay || 1000}ms`,
                        }}
                    >
                        <Toast variant={variant} id={id}>
                            {message}
                        </Toast>
                    </li>
                );
            })}
        </ol>
    );
}

export default ToastShelf;
