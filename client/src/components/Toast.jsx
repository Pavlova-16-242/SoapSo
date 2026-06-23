import React, { useState, useCallback } from 'react';

const ToastContext = React.createContext(null);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, duration = 5000) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message }]);
        
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-24 lg:right-4 z-50 flex flex-col gap-2 m-4">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className="bg-white border border-cyan-600 px-5 py-3 rounded-2xl shadow-lg 
                                   flex items-center gap-3 min-w-[280px] max-w-[400px]
                                   animate-slide-in"
                    >
                        <p className="text-xl font-medium flex-1">{toast.message}</p>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="text-cyan-600 hover:text-cyan-900 transition-colors ml-2"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = React.useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};