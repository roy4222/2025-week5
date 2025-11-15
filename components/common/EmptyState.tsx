/**
 * 空狀態顯示組件
 * 統一的空資料展示樣式
 */

import React from "react";

interface EmptyStateProps {
  /**
   * 標題文字
   */
  title?: string;

  /**
   * 描述文字
   */
  description?: string;

  /**
   * 圖示（可選）
   */
  icon?: React.ReactNode;

  /**
   * 動作按鈕（可選）
   */
  action?: React.ReactNode;
}

/**
 * 空狀態顯示組件
 */
export default function EmptyState({
  title = "暫無資料",
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {icon && (
        <div className="mb-4 text-gray-300">
          {icon}
        </div>
      )}
      
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-gray-500 text-center max-w-md mb-6">
          {description}
        </p>
      )}
      
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  );
}

