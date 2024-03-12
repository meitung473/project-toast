import * as React from "react";
import "./autoDismiss.module.css";

function useAutoDismiss(elementRef, { onEnd, waitSeconds }) {
    const [deleted, setDeleted] = React.useState(false);

    if (typeof onEnd !== "function") {
        throw new Error("OnEnd must be a function");
    }

    // add transition
    React.useEffect(() => {
        if (!elementRef || typeof window === "undefined") return;
        let timeoutId;

        // if data-auto-dismissed is unset,toast dismisses by button manually.
        if (!elementRef.current.getAttribute("data-auto-dismissed")) {
            deleted && onEnd();
            return;
        }

        // while data-auto-dismissed set,it'll start transition.
        function fadeOut() {
            elementRef.current.setAttribute("data-auto-dismissed", "on");
        }
        timeoutId = window.setTimeout(fadeOut, deleted ? 0 : waitSeconds);

        return () => {
            if (!timeoutId) return;
            window.clearTimeout(timeoutId);
        };
    }, [deleted, waitSeconds, elementRef, onEnd]);

    // when fadeout transition end, delete the node
    React.useEffect(() => {
        if (!elementRef) return;

        let toast = elementRef.current;
        if (typeof toast.getAttribute("data-auto-dismissed") === "undefined")
            return;
        function handleTransitionEnd(e) {
            onEnd();
        }

        // delay , duration
        toast.addEventListener("transitionend", handleTransitionEnd);
        return () => {
            toast.addEventListener("transitionend", handleTransitionEnd);
        };
    }, [onEnd, elementRef]);

    return { elementRef, deleted, setDeleted };
}

export default useAutoDismiss;
