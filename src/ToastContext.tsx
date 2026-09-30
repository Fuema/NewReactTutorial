// Build the Toast Alert Context & Component using a modern Tailwind design 
// token layout.

import { createContext, useContext, useState, type ReactNode } from "react";

interface ToastContextType {
    showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 4000); // Disappear after 4 seconds
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Alert Visual Banner Overlay */}
            {toastMessage && (
                <div className="fixed bottom-5 right-5 z-50 flex max-w-sm items-center gap-3 rounded-xl border border-rose-200 bg-white p-4 shadow-xl animate-bounce">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-600 font-bold">
                        ⚠️
                    </div>
                    <div className="text-sm font-semibold text-slate-700">{toastMessage}</div>
                </div>
            )}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within a ToastProvider");
    return context;
}
