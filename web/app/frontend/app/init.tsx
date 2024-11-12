import React from "react";
import invariant from 'tiny-invariant';
import { createRoot } from 'react-dom/client';
import { App } from "./index";

export const init = () => {
    const rootElement = document.getElementById('app');

    invariant(rootElement, 'No dom element found for react');

    const root = createRoot(rootElement, {
        onRecoverableError: (error, errorInfo) => {
            console.error(
                'Caught error',
                error,
                errorInfo.componentStack
            );
        }
    });
    root.render(<App/>);
}
