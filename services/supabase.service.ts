/**
 * Supabase Service Layer
 * 提供通用的 CRUD 操作，封裝 Supabase 客戶端
 */

import { supabase } from "@/lib/supabase";
import { BaseEntity } from "@/types/entities";

/**
 * 通用 Supabase Service 類別
 * 使用泛型 T 支援任何實體型別
 */
export class SupabaseService<T extends BaseEntity> {
  private tableName: string;

  /**
   * @param tableName - Supabase 資料表名稱
   */
  constructor(tableName: string) {
    this.tableName = tableName;
  }

  /**
   * 獲取所有資料
   * @param orderBy - 排序欄位，預設為 created_at 降序
   * @returns 資料陣列
   */
  async getAll(orderBy: keyof T = "created_at" as keyof T): Promise<T[]> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select("*")
      .order(orderBy as string, { ascending: false });

    if (error) {
      console.error(`[${this.tableName}] 讀取資料失敗:`, error);
      throw new Error(`讀取資料失敗: ${error.message}`);
    }

    return (data as T[]) || [];
  }

  /**
   * 根據 ID 獲取單筆資料
   * @param id - 資料 ID
   * @returns 單筆資料或 null
   */
  async getById(id: string): Promise<T | null> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`[${this.tableName}] 讀取單筆資料失敗:`, error);
      throw new Error(`讀取資料失敗: ${error.message}`);
    }

    return data as T;
  }

  /**
   * 新增資料
   * @param data - 要新增的資料（不含 id）
   * @returns 新增後的資料
   */
  async create(data: Omit<T, "id" | "created_at">): Promise<T> {
    const { data: newData, error } = await supabase
      .from(this.tableName)
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error(`[${this.tableName}] 新增資料失敗:`, error);
      throw new Error(`新增資料失敗: ${error.message}`);
    }

    return newData as T;
  }

  /**
   * 更新資料
   * @param id - 要更新的資料 ID
   * @param data - 要更新的欄位
   * @returns 更新後的資料
   */
  async update(id: string, data: Partial<Omit<T, "id" | "created_at">>): Promise<T> {
    const { data: updatedData, error } = await supabase
      .from(this.tableName)
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`[${this.tableName}] 更新資料失敗:`, error);
      throw new Error(`更新資料失敗: ${error.message}`);
    }

    return updatedData as T;
  }

  /**
   * 刪除資料
   * @param id - 要刪除的資料 ID
   */
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq("id", id);

    if (error) {
      console.error(`[${this.tableName}] 刪除資料失敗:`, error);
      throw new Error(`刪除資料失敗: ${error.message}`);
    }
  }

  /**
   * 批次刪除資料
   * @param ids - 要刪除的資料 ID 陣列
   */
  async batchDelete(ids: string[]): Promise<void> {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .in("id", ids);

    if (error) {
      console.error(`[${this.tableName}] 批次刪除資料失敗:`, error);
      throw new Error(`批次刪除資料失敗: ${error.message}`);
    }
  }

  /**
   * 計算資料總數
   * @returns 資料總數
   */
  async count(): Promise<number> {
    const { count, error } = await supabase
      .from(this.tableName)
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error(`[${this.tableName}] 計算資料總數失敗:`, error);
      throw new Error(`計算資料總數失敗: ${error.message}`);
    }

    return count || 0;
  }
}

/**
 * 預先建立的 Service 實例
 * 方便直接使用
 */
import { Product, Game, Store, Anime } from "@/types/entities";

export const productService = new SupabaseService<Product>("products");
export const gameService = new SupabaseService<Game>("games");
export const storeService = new SupabaseService<Store>("store");
export const animeService = new SupabaseService<Anime>("animes");

