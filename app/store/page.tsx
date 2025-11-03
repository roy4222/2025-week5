// 宣告為 Client Component
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../navbar";
import { supabase } from "../../lib/supabase"; // 確保路徑正確

// Product type (移除 image_url)
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  created_at?: string;
};

// ProductFormData type (移除 image_url)
type ProductFormData = Omit<Product, "id" | "created_at"> & {
  id?: string;
};

export default function Store() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // 表單的初始狀態 (移除 image_url)
  const initialFormData: ProductFormData = {
    name: "",
    description: "",
    price: 0,
  };

  const [formData, setFormData] = useState<ProductFormData>(initialFormData);

  // --- Supabase Data Fetching ---
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // [修改] 將 'products' 改為 'store'
      const { data, error } = await supabase
        .from("store")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
      } else if (data) {
        setProducts(data);
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- Dialog Handlers (保持不變) ---
  const handleOpenAddDialog = () => {
    setEditingProduct(null);
    setFormData(initialFormData);
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
  };

  // --- Supabase CRUD Operations ---
  const handleSave = async () => {
    if (!formData.name) {
      alert("商品名稱為必填項。");
      return;
    }

    if (editingProduct) {
      // 編輯模式 (Update)
      const { data, error } = await supabase
        .from("store")
        .update({
          name: formData.name,
          description: formData.description,
          price: formData.price,
        })
        .eq("id", editingProduct.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating product:", error);
        alert(`更新失敗: ${error.message}`);
      } else if (data) {
        setProducts((currentProducts) =>
          currentProducts.map((p) => (p.id === data.id ? data : p))
        );
        handleCloseDialog();
      }
    } else {
      // 新增模式 (Insert)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...insertData } = formData;
      // [修改] 將 'products' 改為 'store'
      const { data, error } = await supabase
        .from("store")
        .insert(insertData)
        .select()
        .single();

      if (error) {
        console.error("Error adding product:", error);
        alert(`新增失敗: ${error.message}`);
      } else if (data) {
        setProducts((prevProducts) => [data, ...prevProducts]);
        handleCloseDialog();
      }
    }
  };

  // 刪除
  const handleDelete = async (productId: string) => {
    if (!window.confirm("確定要刪除這個商品嗎？")) {
      return;
    }

    // [修改] 將 'products' 改為 'store'
    const { error } = await supabase.from("store").delete().eq("id", productId);

    if (error) {
      console.error("Error deleting product:", error);
      alert(`刪除失敗: ${error.message}`);
    } else {
      setProducts((currentProducts) =>
        currentProducts.filter((p) => p.id !== productId)
      );
    }
  };

  // --- 處理 input 和 textarea 的變更 (保持不變) ---
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  // --- Render (保持不變) ---
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-4 w-full bg-white">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-600">商品列表 (Supabase)</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="shadow-lg rounded-lg overflow-hidden h-full flex flex-col bg-white"
            >
              <div className="p-6 flex-grow">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-700 text-sm mb-4">
                  {product.description}
                </p>
                <p className="text-lg font-bold text-blue-600">
                  NT$ {product.price.toLocaleString()}
                </p>
              </div>
              <div className="px-6 pb-6 flex flex-wrap gap-2">
                <button className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                  加入購物車
                </button>
                <button
                  onClick={() => handleOpenEditDialog(product)}
                  className="inline-flex items-center px-3 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300"
                >
                  編輯
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="inline-flex items-center px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
                >
                  刪除
                </button>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/"
          className="inline-block mt-8 px-4 py-2 bg-blue-600 text-gray-800 rounded-md hover:bg-blue-700"
        >
          回到首頁
        </Link>
      </main>

      <button
        color="primary"
        aria-label="add"
        className="fixed bottom-6 right-6 bg-blue-600 text-gray-800 w-14 h-14 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg hover:bg-blue-700"
        onClick={handleOpenAddDialog}
      >
        +
      </button>

      {openDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          aria-labelledby="dialog-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-black/50"
            onClick={handleCloseDialog}
          ></div>
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md">
            <h2 id="dialog-title" className="text-xl font-semibold p-6 pb-2">
              {editingProduct ? "編輯商品" : "新增商品"}
            </h2>
            <div className="p-6 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  商品名稱
                </label>
                <input
                  autoFocus
                  id="name"
                  name="name"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  商品描述
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  價格
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="px-6 py-4 flex justify-end gap-3">
              <button
                onClick={handleCloseDialog}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-gray-800 rounded-md hover:bg-blue-700"
              >
                儲存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
