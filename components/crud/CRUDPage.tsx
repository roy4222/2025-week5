/**
 * 通用 CRUD 頁面容器組件
 * 整合列表、表單、操作按鈕等功能
 */

import React, { useState } from "react";
import { BaseEntity } from "@/types/entities";
import { EntityField } from "@/types/common";
import { useGenericCRUD } from "@/hooks/useGenericCRUD";
import { SupabaseService } from "@/services/supabase.service";
import Navbar from "@/app/navbar";
import FloatingActionButton from "@/components/common/FloatingActionButton";
import EntityList from "./EntityList";
import EntityCard from "./EntityCard";
import EntityForm from "./EntityForm";
import ConfirmDialog from "@/components/common/ConfirmDialog";

interface CRUDPageProps<T extends BaseEntity> {
  /**
   * 頁面標題
   */
  title: string;

  /**
   * Supabase Service 實例
   */
  service: SupabaseService<T>;

  /**
   * 表單欄位定義
   */
  fields: EntityField[];

  /**
   * 渲染實體卡片內容的函數
   */
  renderCardContent: (entity: T) => React.ReactNode;

  /**
   * 空狀態顯示的訊息
   */
  emptyMessage?: string;

  /**
   * 實體名稱（用於確認對話框）
   */
  entityName?: string;

  /**
   * 是否顯示編輯按鈕
   */
  showEdit?: boolean;

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
 * 通用 CRUD 頁面容器組件
 */
export default function CRUDPage<T extends BaseEntity>({
  title,
  service,
  fields,
  renderCardContent,
  emptyMessage = "暫無資料，點擊右下角 + 按鈕新增",
  entityName = "項目",
  showEdit = true,
  columns,
}: CRUDPageProps<T>) {
  const [openForm, setOpenForm] = useState(false);
  const [editingEntity, setEditingEntity] = useState<T | null>(null);
  const [deletingEntity, setDeletingEntity] = useState<T | null>(null);

  const {
    items,
    loading,
    error,
    submitting,
    deletingId,
    createItem,
    updateItem,
    deleteItem,
    clearError,
  } = useGenericCRUD(service);

  // 開啟新增表單
  const handleOpenAddForm = () => {
    setEditingEntity(null);
    setOpenForm(true);
  };

  // 開啟編輯表單
  const handleOpenEditForm = (entity: T) => {
    setEditingEntity(entity);
    setOpenForm(true);
  };

  // 關閉表單
  const handleCloseForm = () => {
    setOpenForm(false);
    setEditingEntity(null);
  };

  // 提交表單
  const handleSubmitForm = async (data: Partial<T>) => {
    if (editingEntity) {
      await updateItem(editingEntity.id, data);
    } else {
      await createItem(data as Omit<T, "id" | "created_at">);
    }
  };

  // 開啟刪除確認對話框
  const handleOpenDeleteDialog = (id: string) => {
    const entity = items.find((item) => item.id === id);
    if (entity) {
      setDeletingEntity(entity);
    }
  };

  // 關閉刪除確認對話框
  const handleCloseDeleteDialog = () => {
    setDeletingEntity(null);
  };

  // 確認刪除
  const handleConfirmDelete = async () => {
    if (deletingEntity) {
      await deleteItem(deletingEntity.id);
      handleCloseDeleteDialog();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />

      <main className="flex-grow px-4 py-8 max-w-7xl mx-auto w-full">
        {/* 頁面標題 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {title}
          </h1>
          <p className="text-gray-600">
            管理您的{entityName}資料
          </p>
        </div>

        {/* 錯誤提示 */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={clearError}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* 實體列表 */}
        <EntityList
          entities={items}
          loading={loading}
          emptyMessage={emptyMessage}
          columns={columns}
          renderEntity={(entity) => (
            <EntityCard
              entity={entity}
              renderContent={renderCardContent}
              onEdit={showEdit ? handleOpenEditForm : undefined}
              onDelete={handleOpenDeleteDialog}
              isDeleting={deletingId === entity.id}
            />
          )}
        />

        {/* 浮動新增按鈕 */}
        <FloatingActionButton
          onClick={handleOpenAddForm}
          ariaLabel={`新增${entityName}`}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          }
        />

        {/* 表單對話框 */}
        <EntityForm
          open={openForm}
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
          editingEntity={editingEntity}
          fields={fields}
          title={editingEntity ? `編輯${entityName}` : `新增${entityName}`}
          submitting={submitting}
        />

        {/* 刪除確認對話框 */}
        <ConfirmDialog
          open={!!deletingEntity}
          onClose={handleCloseDeleteDialog}
          onConfirm={handleConfirmDelete}
          title="確認刪除"
          message={`確定要刪除這個${entityName}嗎？此操作無法復原。`}
          confirmText="刪除"
          cancelText="取消"
          confirmVariant="danger"
          loading={deletingId === deletingEntity?.id}
        />
      </main>
    </div>
  );
}

