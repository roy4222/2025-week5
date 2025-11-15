"use client";

import CRUDPage from "@/components/crud/CRUDPage";
import { gameService } from "@/services/supabase.service";
import { Game } from "@/types/entities";
import { EntityField } from "@/types/common";

/**
 * 遊戲表單欄位定義
 */
const gameFields: EntityField[] = [
  {
    name: "title",
    label: "遊戲名稱",
    type: "text",
    required: true,
    placeholder: "例：原神",
  },
  {
    name: "genre",
    label: "遊戲類型",
    type: "text",
    required: true,
    placeholder: "例：動作冒險",
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
 * 遊戲推薦頁面（Customer）
 * 使用通用 CRUD 架構
 */
export default function CustomerPage() {
  return (
    <CRUDPage<Game>
      title="遊戲推薦"
      service={gameService}
      fields={gameFields}
      entityName="遊戲"
      emptyMessage="目前沒有遊戲資料，點擊右下角 + 按鈕新增"
      renderCardContent={(game) => (
        <div>
          <h2 className="text-xl text-gray-600 font-semibold mb-2">
            {game.title}
          </h2>
          <p className="text-gray-600 mb-2">
            類型: {game.genre}
          </p>
          <div className="flex items-center">
            <span className="text-yellow-500 text-lg">★</span>
            <span className="ml-1 text-gray-700">{game.rating}</span>
          </div>
        </div>
      )}
    />
  );
}
