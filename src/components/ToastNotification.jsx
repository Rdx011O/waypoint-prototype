import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, Info, X, Sparkles } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    const newToast = {
      id,
      type: toast.type || 'success', // 'success' | 'warning' | 'error' | 'info'
      title: toast.title || 'Notification',
      message: toast.message || '',
      duration: toast.duration || 4500
    };

    setToasts((prev) => [...prev.slice(-3), newToast]); // keep max 4 toasts

    if (newToast.duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, newToast.duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast Render Portal */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-3 font-mono">
        {toasts.map((t) => {
          const isSuccess = t.type === 'success';
          const isWarning = t.type === 'warning';
          const isError = t.type === 'error';

          return (
            <div
              key={t.id}
              className={`pointer-events-auto p-3.5 rounded-lg border shadow-xl flex items-start gap-3 transition-all transform animate-in slide-in-from-bottom-3 duration-200 ${
                isSuccess
                  ? 'bg-[#0F172A] border-[#10B981] text-white'
                  : isWarning
                  ? 'bg-[#0F172A] border-[#F59E0B] text-white'
                  : isError
                  ? 'bg-[#0F172A] border-[#EF4444] text-white'
                  : 'bg-[#0F172A] border-[#38BDF8] text-white'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {isSuccess && <CheckCircle2 className="w-4 h-4 text-[#10B981]" />}
                {isWarning && <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />}
                {isError && <AlertTriangle className="w-4 h-4 text-[#EF4444]" />}
                {!isSuccess && !isWarning && !isError && <Sparkles className="w-4 h-4 text-[#38BDF8]" />}
              </div>

              <div className="flex-1 min-w-0 text-xs">
                <div className="font-bold tracking-tight text-white flex items-center justify-between">
                  <span>{t.title}</span>
                  <span className="text-[9px] text-[#94A3B8] font-normal uppercase">JUST NOW</span>
                </div>
                {t.message && (
                  <div className="text-[11px] text-[#CBD5E1] mt-0.5 leading-relaxed">
                    {t.message}
                  </div>
                )}
              </div>

              <button
                onClick={() => removeToast(t.id)}
                className="shrink-0 text-[#94A3B8] hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      addToast: () => {},
      removeToast: () => {}
    };
  }
  return context;
}
