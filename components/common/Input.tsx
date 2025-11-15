/**
 * 通用輸入框組件
 * 替代 MUI TextField
 */

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * 輸入框標籤
   */
  label?: string;

  /**
   * 錯誤訊息
   */
  error?: string;

  /**
   * 是否必填
   */
  required?: boolean;

  /**
   * 輸入框前綴圖示
   */
  prefixIcon?: React.ReactNode;

  /**
   * 輸入框後綴圖示
   */
  suffixIcon?: React.ReactNode;
}

/**
 * 通用輸入框組件
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      required,
      prefixIcon,
      suffixIcon,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const inputClasses = `
    block w-full px-3 py-2 
    border ${error ? "border-red-500" : "border-gray-300"} 
    rounded-md shadow-sm 
    placeholder-gray-400 
    focus:outline-none focus:ring-2 
    ${error ? "focus:ring-red-500 focus:border-red-500" : "focus:ring-blue-500 focus:border-blue-500"}
    disabled:bg-gray-100 disabled:cursor-not-allowed
    ${prefixIcon ? "pl-10" : ""}
    ${suffixIcon ? "pr-10" : ""}
    ${className}
  `.trim();

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {prefixIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              {prefixIcon}
            </div>
          )}

          <input
            ref={ref}
            className={inputClasses}
            disabled={disabled}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${props.id}-error` : undefined}
            {...props}
          />

          {suffixIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
              {suffixIcon}
            </div>
          )}
        </div>

        {error && (
          <p
            className="mt-1 text-sm text-red-600"
            id={`${props.id}-error`}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

