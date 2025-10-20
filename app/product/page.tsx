"use client";
import Navbar from "../navbar";
import { useState, FormEvent } from "react";

type Product = { id: number; name: string; description: string };

export default function Product() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "RTX 5060 Ti", description: "16GB VRAM - 高效能入門級" },
    { id: 2, name: "RTX 5070 Ti", description: "16GB VRAM - 中高階效能" },
    { id: 3, name: "RTX 5080 Ti", description: "16GB VRAM - 旗艦級效能" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");

  const handleAddItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newItemName.trim()) {
      alert("請輸入產品名稱");
      return;
    }

    const newProduct: Product = {
      id: Math.max(...products.map((p) => p.id), 0) + 1,
      name: newItemName.trim(),
      description: newItemDesc.trim(),
    };

    setProducts([...products, newProduct]);
    setNewItemName("");
    setNewItemDesc("");
    setShowForm(false);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Navbar />
        
        <main className="flex-grow px-4 py-8 max-w-6xl mx-auto w-full">
          {/* 頁面標題 */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">NVIDIA 顯示卡</h1>
            <p className="text-slate-600">高效能遊戲與專業工作站顯示卡</p>
          </div>

          {/* 產品網格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 border-l-4 border-blue-500"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800">
                      {product.name}
                    </h2>
                  </div>
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                    新品
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {product.description}
                </p>
                <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition text-sm font-medium">
                  了解更多
                </button>
              </div>
            ))}
          </div>

          {/* 新增按鈕 */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition shadow-md hover:shadow-lg"
            >
              + 新增產品
            </button>
          </div>

          {/* 新增表單 - Modal 風格 */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">新增產品</h2>

                <form onSubmit={handleAddItem} className="space-y-4 text-black">
                  {/* 產品名稱 */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      產品名稱 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      placeholder="例：RTX 5090 Ti"
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>

                  {/* 產品描述 */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      產品描述
                    </label>
                    <textarea
                      value={newItemDesc}
                      onChange={(e) => setNewItemDesc(e.target.value)}
                      placeholder="例：24GB VRAM - 旗艦級效能"
                      rows={3}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                    />
                  </div>

                  {/* 按鈕區 */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition"
                    >
                      提交
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setNewItemName("");
                        setNewItemDesc("");
                      }}
                      className="flex-1 bg-slate-300 hover:bg-slate-400 text-slate-800 font-medium py-2 rounded-lg transition"
                    >
                      取消
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}