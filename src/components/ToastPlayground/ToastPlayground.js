import React from "react";

import Button from "../Button";

import { useToast } from "../ToastProvider/ToastProvider";
import ToastSelf from "../ToastShelf";
import styles from "./ToastPlayground.module.css";
const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
    const [message, setMessage] = React.useState("");

    const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);

    const { addToast, toasts } = useToast();

    function handleSubmit(e) {
        e.preventDefault();
        addToast({ variant, message });
        setMessage("");
    }

    return (
        <div className={styles.wrapper}>
            <header>
                <img alt="Cute toast mascot" src="/toast.png" />
                <h1>Toast Playground</h1>
            </header>

            {toasts.length > 0 && <ToastSelf toasts={toasts} />}
            <form onSubmit={handleSubmit}>
                <div className={styles.controlsWrapper}>
                    <div className={styles.row}>
                        <label
                            htmlFor="message"
                            className={styles.label}
                            style={{ alignSelf: "baseline" }}
                        >
                            Message
                        </label>
                        <div className={styles.inputWrapper}>
                            <textarea
                                id="message"
                                required
                                className={styles.messageInput}
                                value={message}
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.label}>Variant</div>
                        <div
                            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
                        >
                            {VARIANT_OPTIONS.map((option, index) => {
                                let id = `variant-${option}`;
                                return (
                                    <label key={id} htmlFor={id}>
                                        <input
                                            id={id}
                                            type="radio"
                                            name="variant"
                                            value={option}
                                            checked={option === variant}
                                            onChange={(e) => {
                                                setVariant(e.target.value);
                                            }}
                                        />
                                        {option}
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.label} />
                        <div
                            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
                        >
                            <Button type="submit">Pop Toast!</Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ToastPlayground;
