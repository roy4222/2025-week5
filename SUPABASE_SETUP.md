# Supabase 設置指南

## 步驟 1: 創建環境變數文件

在專案根目錄創建 `.env.local` 文件,並添加以下內容:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 步驟 2: 取得 Supabase 憑證

1. 登入 [Supabase Dashboard](https://app.supabase.com/)
2. 選擇您的專案(或創建新專案)
3. 點擊左側選單的 **Settings** (設定)
4. 點擊 **API**
5. 複製以下兩個值:
   - **Project URL** → 貼到 `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → 貼到 `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 步驟 3: 使用 Supabase 客戶端

在您的元件中導入並使用:

```typescript
import { supabase } from '@/lib/supabase';

// 範例: 查詢資料
const { data, error } = await supabase
  .from('your_table_name')
  .select('*');

// 範例: 新增資料
const { data, error } = await supabase
  .from('your_table_name')
  .insert([
    { column1: 'value1', column2: 'value2' }
  ]);

// 範例: 更新資料
const { data, error } = await supabase
  .from('your_table_name')
  .update({ column1: 'new_value' })
  .eq('id', 'some-id');

// 範例: 刪除資料
const { data, error } = await supabase
  .from('your_table_name')
  .delete()
  .eq('id', 'some-id');
```

## 商品表範例 (適用於您的 Store 頁面)

在 Supabase SQL Editor 中創建 products 表:

```sql
-- 創建 products 表
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 啟用 Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 允許所有人讀取產品 (公開讀取)
CREATE POLICY "Allow public read access" ON products
  FOR SELECT USING (true);

-- 允許所有人新增、更新、刪除 (開發階段使用,生產環境建議加上身份驗證)
CREATE POLICY "Allow public insert access" ON products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" ON products
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access" ON products
  FOR DELETE USING (true);
```

## 注意事項

- ⚠️ `.env.local` 文件不應該提交到 Git (已在 .gitignore 中)
- ⚠️ `NEXT_PUBLIC_` 前綴的變數會暴露給瀏覽器端
- ⚠️ 不要在環境變數中存放敏感的 secret key
- ⚠️ 生產環境建議配置適當的 RLS (Row Level Security) 政策

