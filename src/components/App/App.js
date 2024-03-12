import React from "react";

import Footer from "../Footer";
import ToastPlayground from "../ToastPlayground";
import ToastProvider from "../ToastProvider/ToastProvider";

function App() {
    return (
        <ToastProvider delay={800} duration={2000}>
            <ToastPlayground />
            <Footer />
        </ToastProvider>
    );
}

export default App;
