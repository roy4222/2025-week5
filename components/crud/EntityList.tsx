/**
 * 通用實體列表組件
 * 用於顯示資料實體列表
 */

import React from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import EmptyState from "@/components/common/EmptyState";
import { BaseEntity } from "@/types/entities";

interface EntityListProps<T extends BaseEntity> {
  /**
   * 實體資料陣列
   */
  entities: T[];

  /**
   * 是否正在載入
   */
  loading: boolean;

  /**
   * 渲染單一實體的函數
   */
  renderEntity: (entity: T, index: number) => React.ReactNode;

  /**
   * 空狀態顯示的訊息
   */
  emptyMessage?: string;

  /**
   * 空狀態描述
   */
  emptyDescription?: string;

  /**
   * 空狀態動作按鈕
   */
  emptyAction?: React.ReactNode;

  /**
   * 網格列數設定
   */
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

/**
 * 通用實體列表組件
 */
export default function EntityList<T extends BaseEntity>({
  entities,
  loading,
  renderEntity,
  emptyMessage = "暫無資料",
  emptyDescription,
  emptyAction,
  columns = { sm: 1, md: 2, lg: 3 },
}: EntityListProps<T>) {
  // 載入狀態
  if (loading) {
    return <LoadingSpinner centered minHeight="400px" size="lg" />;
  }

  // 空狀態
  if (entities.length === 0) {
    return (
      <EmptyState
        title={emptyMessage}
        description={emptyDescription}
        action={emptyAction}
      />
    );
  }

  // 生成網格列數的 CSS 類名
  const gridCols = `
    grid-cols-${columns.sm || 1}
    ${columns.md ? `md:grid-cols-${columns.md}` : ""}
    ${columns.lg ? `lg:grid-cols-${columns.lg}` : ""}
    ${columns.xl ? `xl:grid-cols-${columns.xl}` : ""}
  `.trim();

  return (
    <div className={`grid ${gridCols} gap-6 mb-8`}>
      {entities.map((entity, index) => (
        <React.Fragment key={entity.id}>
          {renderEntity(entity, index)}
        </React.Fragment>
      ))}
    </div>
  );
}

