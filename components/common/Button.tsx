/**
 * 通用按鈕組件
 * 替代 MUI Button
 */

import React from "react";
import LoadingSpinner from "./LoadingSpinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 按鈕樣式變體
   */
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";

  /**
   * 按鈕大小
   */
  size?: "sm" | "md" | "lg";

  /**
   * 是否為載入中狀態
   */
  loading?: boolean;

  /**
   * 是否為全寬
   */
  fullWidth?: boolean;

  /**
   * 子元素
   */
  children: React.ReactNode;
}

/**
 * 通用按鈕組件
 */
export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    outline: "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <LoadingSpinner
          size="sm"
          color={variant === "primary" || variant === "danger" ? "white" : "primary"}
        />
      )}
      <span className={loading ? "ml-2" : ""}>
        {children}
      </span>
    </button>
  );
}

