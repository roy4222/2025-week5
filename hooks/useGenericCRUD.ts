/**
 * 通用 CRUD Hook
 * 提供統一的資料獲取、新增、更新、刪除功能
 */

import { useState, useEffect, useCallback } from "react";
import { SupabaseService } from "@/services/supabase.service";
import { BaseEntity } from "@/types/entities";
import { CRUDState } from "@/types/common";

/**
 * 通用 CRUD Hook 的配置選項
 */
interface UseGenericCRUDOptions {
  /**
   * 是否在 mount 時自動載入資料
   * @default true
   */
  autoLoad?: boolean;

  /**
   * 操作成功後的回呼函數
   */
  onSuccess?: (action: "create" | "update" | "delete", item?: any) => void;

  /**
   * 操作失敗後的回呼函數
   */
  onError?: (action: "create" | "update" | "delete" | "fetch", error: Error) => void;
}

/**
 * 通用 CRUD Hook
 * @param service - SupabaseService 實例
 * @param options - 配置選項
 * @returns CRUD 操作方法和狀態
 */
export function useGenericCRUD<T extends BaseEntity>(
  service: SupabaseService<T>,
  options: UseGenericCRUDOptions = {}
) {
  const { autoLoad = true, onSuccess, onError } = options;

  const [state, setState] = useState<CRUDState<T>>({
    items: [],
    loading: false,
    error: null,
    submitting: false,
    deletingId: null,
  });

  /**
   * 獲取所有資料
   */
  const fetchItems = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const items = await service.getAll();
      setState((prev) => ({ ...prev, items, loading: false }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "載入資料失敗";
      setState((prev) => ({ ...prev, error: errorMessage, loading: false }));
      onError?.("fetch", error as Error);
    }
  }, [service, onError]);

  /**
   * 新增資料
   */
  const createItem = useCallback(
    async (data: Omit<T, "id" | "created_at">): Promise<T | null> => {
      try {
        setState((prev) => ({ ...prev, submitting: true, error: null }));
        const newItem = await service.create(data);
        
        // 新增成功後重新載入資料
        await fetchItems();
        
        setState((prev) => ({ ...prev, submitting: false }));
        onSuccess?.("create", newItem);
        return newItem;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "新增資料失敗";
        setState((prev) => ({ ...prev, error: errorMessage, submitting: false }));
        onError?.("create", error as Error);
        throw error;
      }
    },
    [service, fetchItems, onSuccess, onError]
  );

  /**
   * 更新資料
   */
  const updateItem = useCallback(
    async (id: string, data: Partial<Omit<T, "id" | "created_at">>): Promise<T | null> => {
      try {
        setState((prev) => ({ ...prev, submitting: true, error: null }));
        const updatedItem = await service.update(id, data);
        
        // 更新成功後重新載入資料
        await fetchItems();
        
        setState((prev) => ({ ...prev, submitting: false }));
        onSuccess?.("update", updatedItem);
        return updatedItem;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "更新資料失敗";
        setState((prev) => ({ ...prev, error: errorMessage, submitting: false }));
        onError?.("update", error as Error);
        throw error;
      }
    },
    [service, fetchItems, onSuccess, onError]
  );

  /**
   * 刪除資料
   */
  const deleteItem = useCallback(
    async (id: string): Promise<void> => {
      try {
        setState((prev) => ({ ...prev, deletingId: id, error: null }));
        await service.delete(id);
        
        // 刪除成功後重新載入資料
        await fetchItems();
        
        setState((prev) => ({ ...prev, deletingId: null }));
        onSuccess?.("delete");
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "刪除資料失敗";
        setState((prev) => ({ ...prev, error: errorMessage, deletingId: null }));
        onError?.("delete", error as Error);
        throw error;
      }
    },
    [service, fetchItems, onSuccess, onError]
  );

  /**
   * 清除錯誤訊息
   */
  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  /**
   * 重設狀態
   */
  const reset = useCallback(() => {
    setState({
      items: [],
      loading: false,
      error: null,
      submitting: false,
      deletingId: null,
    });
  }, []);

  // 自動載入資料
  useEffect(() => {
    if (autoLoad) {
      fetchItems();
    }
  }, [autoLoad, fetchItems]);

  return {
    // 狀態
    items: state.items,
    loading: state.loading,
    error: state.error,
    submitting: state.submitting,
    deletingId: state.deletingId,

    // 方法
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
    clearError,
    reset,
  };
}

