'use client';

import { AlertCircle, CheckCircle, X, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'error' | 'success' | 'info';
  onClose: () => void;
}

export function Toast({ message, type = 'error', onClose }: ToastProps) {
  const styles = {
    error: {
      bg: 'from-red-500/90 to-red-600/90',
      icon: AlertCircle,
      border: 'border-red-400/50',
    },
    success: {
      bg: 'from-emerald-500/90 to-emerald-600/90',
      icon: CheckCircle,
      border: 'border-emerald-400/50',
    },
    info: {
      bg: 'from-blue-500/90 to-blue-600/90',
      icon: Info,
      border: 'border-blue-400/50',
    },
  };

  const style = styles[type];
  const Icon = style.icon;

  return (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[60] animate-toast-slide-in">
      <div
        className={`flex items-center gap-3 bg-gradient-to-r ${style.bg} backdrop-blur-xl text-white px-6 py-4 rounded-xl shadow-2xl border ${style.border} min-w-[320px] max-w-md`}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm font-medium flex-1">{message}</p>
        <button
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
