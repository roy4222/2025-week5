import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";

/**
 * 管理產品 CRUD 操作的自定義 Hook
 */
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  /**
   * 從資料庫讀取所有產品
   */
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        console.error("讀取產品失敗:", error);
        throw error;
      }

      setProducts(data || []);
    } catch (err) {
      console.error("錯誤:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 新增產品到資料庫
   */
  const addProduct = useCallback(
    async (name: string, description: string) => {
      if (!name.trim()) {
        throw new Error("請輸入產品名稱");
      }

      try {
        setIsSubmitting(true);
        const { error } = await supabase
          .from("products")
          .insert([
            {
              name: name.trim(),
              description: description.trim(),
            },
          ])
          .select();

        if (error) {
          console.error("新增產品失敗:", error);
          throw new Error("新增產品失敗，請重試");
        }

        await fetchProducts();
      } catch (err) {
        console.error("錯誤:", err);
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [fetchProducts]
  );

  /**
   * 從資料庫刪除產品
   */
  const deleteProduct = useCallback(
    async (id: string) => {
      try {
        setDeletingId(id);
        const { error } = await supabase
          .from("products")
          .delete()
          .eq("id", id);

        if (error) {
          console.error("刪除失敗:", error);
          throw new Error("刪除失敗，請重試");
        }

        await fetchProducts();
      } catch (err) {
        console.error(err);
        throw err;
      } finally {
        setDeletingId(null);
      }
    },
    [fetchProducts]
  );

  // 初始載入產品
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    isSubmitting,
    deletingId,
    addProduct,
    deleteProduct,
    refreshProducts: fetchProducts,
  };
}

