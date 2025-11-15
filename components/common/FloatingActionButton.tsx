/**
 * 浮動動作按鈕組件 (FAB)
 * 替代 MUI Fab
 */

import React from "react";

interface FloatingActionButtonProps {
  /**
   * 點擊事件處理函數
   */
  onClick: () => void;

  /**
   * 按鈕圖示
   */
  icon?: React.ReactNode;

  /**
   * 按鈕文字（如果沒有圖示）
   */
  label?: string;

  /**
   * 按鈕位置
   */
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";

  /**
   * 按鈕顏色
   */
  color?: "primary" | "secondary" | "danger";

  /**
   * 無障礙標籤
   */
  ariaLabel: string;

  /**
   * 是否禁用
   */
  disabled?: boolean;
}

/**
 * 浮動動作按鈕組件
 */
export default function FloatingActionButton({
  onClick,
  icon,
  label = "+",
  position = "bottom-right",
  color = "primary",
  ariaLabel,
  disabled = false,
}: FloatingActionButtonProps) {
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  };

  const colorClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/50",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white shadow-gray-500/50",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-red-500/50",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        fixed ${positionClasses[position]}
        w-14 h-14 rounded-full
        flex items-center justify-center
        ${colorClasses[color]}
        shadow-lg hover:shadow-xl
        transition-all duration-200
        focus:outline-none focus:ring-4 focus:ring-blue-300
        disabled:opacity-50 disabled:cursor-not-allowed
        z-50
      `}
      aria-label={ariaLabel}
    >
      {icon ? (
        icon
      ) : (
        <span className="text-2xl font-bold">
          {label}
        </span>
      )}
    </button>
  );
}

