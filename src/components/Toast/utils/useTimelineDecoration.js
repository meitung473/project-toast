import React from "react";
import "./timeline.module.css";
function useTimelineDecoration(toastElement, { duration, color, delay }) {
    React.useEffect(() => {
        let toast = toastElement?.current;
        if (!toast) return;
        if (!toast.getAttribute("data-timeline")) return;
        toast.style.setProperty("--timeline-delay", `${delay}ms`);
        toast.style.setProperty("--timeline-duration", `${duration}ms`);
        toast.style.setProperty("--timeline-bg-color", color);
        toast.setAttribute("data-timeline", "on");
    }, [color, duration, toastElement, delay]);
}

export default useTimelineDecoration;
