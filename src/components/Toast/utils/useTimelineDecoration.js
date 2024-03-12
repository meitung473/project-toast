import React from "react";
import * as styles from "./timeline.module.css";

function useTimelineDecoration(toastElement, { duration, color, delay }) {
    React.useEffect(() => {
        let toast = toastElement?.current;
        if (!toast) return;
        toast.classList.add(styles["timeline"]);
        toast.style.setProperty("--timeline-delay", `${delay}ms`);
        toast.style.setProperty("--timeline-duration", `${duration}ms`);
        toast.style.setProperty("--bg-color", color);

        toast.setAttribute("data-running", "true");
    }, [color, duration, toastElement, delay]);
}

export default useTimelineDecoration;
