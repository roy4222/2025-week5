/**
 * 通用文字區域組件
 * 多行文字輸入框
 */

import React from "react";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * 文字區域標籤
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
}

/**
 * 通用文字區域組件
 */
const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      error,
      required,
      className = "",
      disabled,
      rows = 3,
      ...props
    },
    ref
  ) => {
    const textareaClasses = `
    block w-full px-3 py-2 
    border ${error ? "border-red-500" : "border-gray-300"} 
    rounded-md shadow-sm 
    placeholder-gray-400 
    focus:outline-none focus:ring-2 
    ${error ? "focus:ring-red-500 focus:border-red-500" : "focus:ring-blue-500 focus:border-blue-500"}
    disabled:bg-gray-100 disabled:cursor-not-allowed
    resize-y
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

        <textarea
          ref={ref}
          className={textareaClasses}
          disabled={disabled}
          rows={rows}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        />

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

TextArea.displayName = "TextArea";

export default TextArea;

