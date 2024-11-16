import React, { createContext, useContext, useRef } from 'react';
import { Toast, ToastMessage } from 'primereact/toast';
import invariant from 'tiny-invariant';

interface ToastContextProps {
  showToast: (message: ToastMessage) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  invariant(context, 'useToast must be used within a ToastProvider');
  return context;
};

export const ToastProvider = ({ children }: { children?: React.ReactNode }) => {
  const toastRef = useRef<Toast>(null);

  const showToast = (message: ToastMessage) => {
    toastRef.current?.show(message);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toastRef} />
      {children}
    </ToastContext.Provider>
  );
};
