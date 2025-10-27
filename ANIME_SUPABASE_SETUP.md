# 動漫推薦頁面 - Supabase 設置指南

## 📋 完成步驟

### 1. 確保環境變數已設定

確認專案根目錄有 `.env.local` 文件,內容如下:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

如果還沒有設定,請參考主目錄的 `SUPABASE_SETUP.md` 文件。

### 2. 在 Supabase 中創建 animes 資料表

1. 登入 [Supabase Dashboard](https://app.supabase.com/)
2. 選擇您的專案
3. 點擊左側選單的 **SQL Editor**
4. 點擊 **New Query**
5. 複製並執行 `supabase-anime-table.sql` 文件中的 SQL 指令

或者直接複製以下 SQL 執行:

```sql
-- 創建 animes 資料表
CREATE TABLE animes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  genre TEXT NOT NULL,
  rating NUMERIC(3, 1) CHECK (rating >= 0 AND rating <= 10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 啟用 Row Level Security (RLS)
ALTER TABLE animes ENABLE ROW LEVEL SECURITY;

-- 允許所有人讀取動漫資料 (公開讀取)
CREATE POLICY "Allow public read access" ON animes
  FOR SELECT USING (true);

-- 允許所有人新增動漫
CREATE POLICY "Allow public insert access" ON animes
  FOR INSERT WITH CHECK (true);

-- 允許所有人更新動漫
CREATE POLICY "Allow public update access" ON animes
  FOR UPDATE USING (true);

-- 允許所有人刪除動漫
CREATE POLICY "Allow public delete access" ON animes
  FOR DELETE USING (true);

-- 插入初始資料
INSERT INTO animes (title, genre, rating) VALUES
  ('進擊的巨人', '動作', 9.0),
  ('鬼滅之刃', '冒險', 8.7),
  ('咒術迴戰', '奇幻', 8.6),
  ('間諜家家酒', '喜劇', 8.5),
  ('葬送的芙莉蓮', '奇幻', 9.2),
  ('我推的孩子', '劇情', 8.4);
```

### 3. 重啟開發伺服器

```bash
npm run dev
```

### 4. 測試功能

訪問 `http://localhost:3000/animate` 測試以下功能:

- ✅ **讀取資料**: 頁面載入時自動從 Supabase 讀取動漫列表
- ✅ **新增資料**: 點擊右下角的 + 按鈕新增動漫
- ✅ **編輯資料**: 點擊任一動漫卡片進行編輯
- ✅ **刪除資料**: 點擊卡片右上角的垃圾桶圖示刪除
- ✅ **錯誤處理**: 如果連線失敗會顯示錯誤訊息
- ✅ **載入狀態**: 資料載入時顯示載入動畫

## 📊 資料表結構

### animes 表

| 欄位名稱 | 資料類型 | 說明 |
|---------|---------|------|
| id | UUID | 主鍵,自動產生 |
| title | TEXT | 動漫名稱 (必填) |
| genre | TEXT | 類型 (必填) |
| rating | NUMERIC(3,1) | 評分 0-10 |
| created_at | TIMESTAMP | 建立時間 (自動產生) |

## 🔧 程式碼變更說明

### 主要變更:

1. **引入 Supabase 客戶端**
   ```typescript
   import { supabase } from "@/lib/supabase";
   ```

2. **新增狀態管理**
   - `loading`: 資料載入狀態
   - `error`: 錯誤訊息

3. **實作 CRUD 功能**
   - `fetchAnimes()`: 從資料庫讀取資料
   - `handleSave()`: 新增/更新資料到資料庫
   - `handleDelete()`: 從資料庫刪除資料

4. **使用 useEffect 初始載入資料**
   ```typescript
   useEffect(() => {
     fetchAnimes();
   }, []);
   ```

5. **新增 UI 功能**
   - 載入中顯示 `CircularProgress`
   - 錯誤時顯示 `Alert`
   - 空資料時顯示提示訊息
   - 新增刪除按鈕

## ⚠️ 注意事項

- 確保 `.env.local` 已正確設定
- 確保 Supabase 專案的 RLS 政策已啟用
- 開發階段使用公開存取政策,生產環境建議加上身份驗證
- ID 類型從 `number` 改為 `string` (UUID)

## 🎉 完成!

現在您的動漫推薦頁面已經完全整合 Supabase 資料庫,所有的新增、編輯、刪除操作都會即時同步到雲端資料庫!

