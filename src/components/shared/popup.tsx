"use client";

import React from "react";

interface ConfirmProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmDialog: React.FC<ConfirmProps> = ({
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No",
}) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-brand-white dark:bg-brand-black rounded-xl shadow-xl p-6 w-full max-w-sm text-center space-y-4">
        <p className="text-lg font-semibold text-brand-black dark:text-brand-white">
          {message}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="border border-brand-black dark:border-brand-white text-brand-black dark:text-brand-white hover:bg-brand-black/5 dark:hover:bg-brand-white/5 font-medium py-2 px-4 rounded transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="bg-brand-black dark:bg-brand-white text-brand-white dark:text-brand-black hover:opacity-80 font-medium py-2 px-4 rounded transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
