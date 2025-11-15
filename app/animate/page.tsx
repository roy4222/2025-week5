"use client";

import CRUDPage from "@/components/crud/CRUDPage";
import { animeService } from "@/services/supabase.service";
import { Anime } from "@/types/entities";
import { EntityField } from "@/types/common";

/**
 * 動漫表單欄位定義
 */
const animeFields: EntityField[] = [
  {
    name: "title",
    label: "動漫名稱",
    type: "text",
    required: true,
    placeholder: "例：進擊的巨人",
  },
  {
    name: "genre",
    label: "類型",
    type: "text",
    required: true,
    placeholder: "例：動作、奇幻",
  },
  {
    name: "rating",
    label: "評分",
    type: "number",
    required: true,
    placeholder: "0-10",
    min: 0,
    max: 10,
    defaultValue: 5,
  },
];

/**
 * 動漫推薦頁面
 * 使用通用 CRUD 架構
 */
export default function AnimatePage() {
  return (
    <CRUDPage<Anime>
      title="動漫推薦"
      service={animeService}
      fields={animeFields}
      entityName="動漫"
      emptyMessage="目前沒有動漫資料，點擊右下角 + 按鈕新增"
      renderCardContent={(anime) => (
        <div>
          <h2 className="text-xl text-gray-600 font-semibold mb-2">
            {anime.title}
          </h2>
          <p className="text-gray-600 mb-2">
            類型: {anime.genre}
          </p>
          <div className="flex items-center">
            <span className="text-yellow-500 text-lg">★</span>
            <span className="ml-1 text-gray-700">{anime.rating}</span>
          </div>
        </div>
      )}
    />
  );
}
