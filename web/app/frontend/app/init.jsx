import React from "react";
import { createRoot } from 'react-dom/client';
import { App } from "./index";

export const init = () => {
    const rootElement = document.getElementById('app');

    const root = createRoot(rootElement, {
        onRecoverableError: (error, errorInfo) => {
            console.error(
                'Caught error',
                error,
                error['cause'],
                errorInfo.componentStack
            );
        }
    });
    root.render(<App/>);
}
