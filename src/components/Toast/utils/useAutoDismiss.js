import * as React from "react";
import styles from "./autoDismiss.module.css";

function useAutoDismiss({ callback, waitSeconds }) {
    const [deleted, setDeleted] = React.useState(false);
    const elementRef = React.useRef();

    // add transition
    React.useEffect(() => {
        if (typeof window === "undefined") return;

        let timeoutId;
        function fadeOut() {
            elementRef.current.classList.add(styles.dismissed);
        }
        timeoutId = window.setTimeout(fadeOut, deleted ? 0 : waitSeconds);

        return () => {
            if (!timeoutId) return;
            window.clearTimeout(timeoutId);
        };
    }, [deleted, waitSeconds]);

    // when fadeout transition end, delete the node
    React.useEffect(() => {
        let toast = elementRef.current;
        function handleTransitionEnd(e) {
            callback();
        }

        // delay , duration
        toast.addEventListener("transitionend", handleTransitionEnd);
        return () => {
            toast.addEventListener("transitionend", handleTransitionEnd);
        };
    }, [callback]);

    return { elementRef, deleted, setDeleted };
}

export default useAutoDismiss;
