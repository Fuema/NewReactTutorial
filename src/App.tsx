// src/App.tsx
import { ErrorBoundary } from "react-error-boundary";
import TaskManager from "./TaskManager";
import ErrorFallback from "./ErrorFallback";
import { ToastProvider } from "./ToastContext";

export default function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()} // Reload application window on retry press
    >
      <ToastProvider>
        <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-slate-200/60 p-6 md:max-w-lg">
            <header className="mb-6 border-b border-slate-100 pb-4">
              <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                🚀 React 19 Asynchronous Engine
              </h1>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">
                Full Sandbox CRUD with Actions & Fault Recovery
              </p>
            </header>

            <TaskManager />
          </div>
        </div>
      </ToastProvider>
    </ErrorBoundary>
  );
}

