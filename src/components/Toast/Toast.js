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
import useAutoDismiss from "./utils/useAutoDismiss";
import useTimelineDecoration from "./utils/useTimelineDecoration";

const ICONS_BY_VARIANT = {
    notice: Info,
    warning: AlertTriangle,
    success: CheckCircle,
    error: AlertOctagon,
};
function Toast({ children, variant, id, duration, delay }) {
    const Icon = ICONS_BY_VARIANT[variant];
    const {
        dismissToast,
        delay: defaultDelay,
        duration: defaultDuration,
    } = useToast();

    const elementRef = React.useRef();

    // auto dismiss
    let dur = duration || defaultDuration;
    let del = delay || defaultDelay;
    const { setDeleted } = useAutoDismiss(elementRef, {
        waitSeconds: dur + del,
        onEnd: () => {
            dismissToast(id);
        },
    });

    // timeline animation
    useTimelineDecoration(elementRef, {
        duration: dur,
        delay: del,
        color: `var(--color-${variant})`,
    });

    return (
        <div
            className={`${styles.toast} ${styles[variant]}`}
            ref={elementRef}
            data-auto-dismissed
            data-timeline
        >
            <div className={styles.iconContainer}>
                <Icon size={24} />
            </div>
            <p className={styles.content}>
                <VisuallyHidden> error -</VisuallyHidden>
                {children}
            </p>
            <button
                className={styles.closeButton}
                onClick={() => {
                    setDeleted(true);
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
