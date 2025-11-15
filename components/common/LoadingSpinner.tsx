/**
 * 載入中旋轉動畫組件
 * 替代 MUI CircularProgress
 */

import React from "react";

interface LoadingSpinnerProps {
  /**
   * 旋轉器大小
   */
  size?: "sm" | "md" | "lg";

  /**
   * 顏色主題
   */
  color?: "primary" | "secondary" | "white";

  /**
   * 是否置中顯示
   */
  centered?: boolean;

  /**
   * 最小高度（當 centered 為 true 時使用）
   */
  minHeight?: string;
}

/**
 * 載入中旋轉動畫組件
 */
export default function LoadingSpinner({
  size = "md",
  color = "primary",
  centered = false,
  minHeight = "300px",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  const colorClasses = {
    primary: "border-blue-500 border-t-transparent",
    secondary: "border-gray-500 border-t-transparent",
    white: "border-white border-t-transparent",
  };

  const spinner = (
    <div
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin`}
      role="status"
      aria-label="載入中"
    />
  );

  if (centered) {
    return (
      <div
        className="flex justify-center items-center"
        style={{ minHeight }}
      >
        {spinner}
      </div>
    );
  }

  return spinner;
}

