import React from "react";
import useEscapeKey from "../../hooks/useEscapeKey";

const ToastContext = React.createContext();

function ToastProvider({ children }) {
    const [toasts, setToasts] = React.useState([]);

    useEscapeKey(() => {
        // setToasts([]);
        // close one by one
        setToasts((currentToasts) => currentToasts.slice(1));
    });

    const value = React.useMemo(() => {
        function addToast({ variant, message }) {
            setToasts([
                ...toasts,
                {
                    id: crypto.randomUUID(),
                    variant,
                    message,
                },
            ]);
        }

        function dismissToast(toastId) {
            setToasts((currentToasts) => {
                return currentToasts.filter(({ id }) => toastId !== id);
            });
        }
        return { toasts, addToast, dismissToast };
    }, [toasts]);

    return (
        <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
    );
}

export function useToast() {
    const context = React.useContext(ToastContext);

    if (typeof context === "undefined") {
        throw new Error("There is no any 'ToastContext' on the top. ");
    }

    return context;
}

export default ToastProvider;
