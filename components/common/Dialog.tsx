/**
 * 通用對話框組件
 * 替代 MUI Dialog
 */

import React, { useEffect } from "react";
import { DialogSize } from "@/types/common";

interface DialogProps {
  /**
   * 是否開啟對話框
   */
  open: boolean;

  /**
   * 關閉對話框的回呼函數
   */
  onClose: () => void;

  /**
   * 對話框標題
   */
  title?: string;

  /**
   * 對話框內容
   */
  children: React.ReactNode;

  /**
   * 對話框底部動作按鈕
   */
  actions?: React.ReactNode;

  /**
   * 對話框尺寸
   */
  size?: DialogSize;

  /**
   * 點擊遮罩是否關閉對話框
   */
  closeOnBackdropClick?: boolean;

  /**
   * 是否顯示關閉按鈕
   */
  showCloseButton?: boolean;
}

/**
 * 通用對話框組件
 */
export default function Dialog({
  open,
  onClose,
  title,
  children,
  actions,
  size = "md",
  closeOnBackdropClick = true,
  showCloseButton = true,
}: DialogProps) {
  // 尺寸對應的 max-width
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-full mx-4",
  };

  // ESC 鍵關閉對話框
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      // 防止背景滾動
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnBackdropClick) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "dialog-title" : undefined}
    >
      {/* 背景遮罩 */}
      <div className="fixed inset-0 bg-black/50 transition-opacity" />

      {/* 對話框內容 */}
      <div
        className={`relative bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} transform transition-all`}
      >
        {/* 標題區域 */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            {title && (
              <h2
                id="dialog-title"
                className="text-xl font-semibold text-gray-900"
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                aria-label="關閉對話框"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* 內容區域 */}
        <div className="px-6 py-4">
          {children}
        </div>

        {/* 動作按鈕區域 */}
        {actions && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

