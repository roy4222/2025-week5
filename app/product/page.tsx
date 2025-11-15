"use client";

import CRUDPage from "@/components/crud/CRUDPage";
import { productService } from "@/services/supabase.service";
import { Product } from "@/types/entities";
import { EntityField } from "@/types/common";

/**
 * 產品表單欄位定義
 */
const productFields: EntityField[] = [
  {
    name: "name",
    label: "產品名稱",
    type: "text",
    required: true,
    placeholder: "例：RTX 5090 Ti",
  },
  {
    name: "description",
    label: "產品描述",
    type: "textarea",
    required: false,
    placeholder: "例：24GB VRAM - 旗艦級效能",
    rows: 3,
  },
];

/**
 * 產品頁面
 * 使用通用 CRUD 架構
 */
export default function ProductPage() {
  return (
    <CRUDPage<Product>
      title="產品管理"
      service={productService}
      fields={productFields}
      entityName="產品"
      emptyMessage="暫無產品，點擊右下角 + 按鈕新增"
      renderCardContent={(product) => (
        <div>
          <div className="flex items-start justify-between mb-3">
            <h2 className="text-xl font-semibold text-slate-800">
              {product.name}
            </h2>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
              新品
            </span>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            {product.description || "暫無描述"}
          </p>
        </div>
      )}
    />
  );
}
