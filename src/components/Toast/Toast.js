import React from "react";
import {
    AlertOctagon,
    AlertTriangle,
    CheckCircle,
    Info,
    X,
} from "react-feather";

import VisuallyHidden from "../VisuallyHidden";

import { useToast } from "../ToastProvider/ToastProvider";
import styles from "./Toast.module.css";

const ICONS_BY_VARIANT = {
    notice: Info,
    warning: AlertTriangle,
    success: CheckCircle,
    error: AlertOctagon,
};

function Toast({ children, variant, id }) {
    const Icon = ICONS_BY_VARIANT[variant];
    const { dismissToast } = useToast();
    return (
        <div className={`${styles.toast} ${styles[variant]}`}>
            <div className={styles.iconContainer}>
                <Icon size={24} />
            </div>
            <p className={styles.content}>
                <VisuallyHidden>+ error -</VisuallyHidden>
                {children}
            </p>
            <button
                className={styles.closeButton}
                onClick={() => {
                    dismissToast(id);
                }}
                aria-label="Dismiss message"
                aria-live="off"
            >
                <X size={24} />
            </button>
        </div>
    );
}

export default Toast;
