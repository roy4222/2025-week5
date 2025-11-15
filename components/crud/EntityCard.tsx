/**
 * 通用實體卡片組件
 * 用於顯示單一資料實體
 */

import React from "react";
import Button from "@/components/common/Button";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { BaseEntity } from "@/types/entities";

interface EntityCardProps<T extends BaseEntity> {
  /**
   * 實體資料
   */
  entity: T;

  /**
   * 自訂渲染函數
   */
  renderContent: (entity: T) => React.ReactNode;

  /**
   * 刪除事件處理函數
   */
  onDelete?: (id: string) => void;

  /**
   * 編輯事件處理函數
   */
  onEdit?: (entity: T) => void;

  /**
   * 是否正在刪除
   */
  isDeleting?: boolean;

  /**
   * 額外的 CSS 類名
   */
  className?: string;
}

/**
 * 通用實體卡片組件
 */
export default function EntityCard<T extends BaseEntity>({
  entity,
  renderContent,
  onDelete,
  onEdit,
  isDeleting = false,
  className = "",
}: EntityCardProps<T>) {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(entity.id);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(entity);
    }
  };

  return (
    <div
      className={`
        bg-white border border-gray-200 rounded-lg shadow-md
        hover:shadow-lg transition-shadow duration-200
        p-6 h-full flex flex-col
        ${className}
      `}
    >
      {/* 內容區域 */}
      <div className="flex-grow mb-4">
        {renderContent(entity)}
      </div>

      {/* 動作按鈕區域 */}
      {(onEdit || onDelete) && (
        <div className="flex gap-2 pt-4 border-t border-gray-100">
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              disabled={isDeleting}
              className="flex-1"
            >
              編輯
            </Button>
          )}
          {onDelete && (
            <Button
              variant="danger"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1"
            >
              {isDeleting ? (
                <LoadingSpinner size="sm" color="white" />
              ) : (
                "刪除"
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

