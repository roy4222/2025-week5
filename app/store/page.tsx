"use client";

import CRUDPage from "@/components/crud/CRUDPage";
import { storeService } from "@/services/supabase.service";
import { Store } from "@/types/entities";
import { EntityField } from "@/types/common";

/**
 * 商店商品表單欄位定義
 */
const storeFields: EntityField[] = [
  {
    name: "name",
    label: "商品名稱",
    type: "text",
    required: true,
    placeholder: "例：iPhone 15 Pro",
  },
  {
    name: "description",
    label: "商品描述",
    type: "textarea",
    required: false,
    placeholder: "例：最新款 iPhone，搭載 A17 Pro 晶片",
    rows: 3,
  },
  {
    name: "price",
    label: "價格 (NT$)",
    type: "number",
    required: true,
    placeholder: "例：35900",
    min: 0,
    defaultValue: 0,
  },
];

/**
 * 商店頁面
 * 使用通用 CRUD 架構
 */
export default function StorePage() {
  return (
    <CRUDPage<Store>
      title="商品列表"
      service={storeService}
      fields={storeFields}
      entityName="商品"
      emptyMessage="暫無商品，點擊右下角 + 按鈕新增"
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      renderCardContent={(product) => (
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            {product.name}
          </h2>
          <p className="text-gray-700 text-sm mb-4">
            {product.description || "暫無描述"}
          </p>
          <p className="text-lg font-bold text-blue-600">
            NT$ {product.price.toLocaleString()}
          </p>
        </div>
      )}
    />
  );
}
