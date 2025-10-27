-- 創建 products 資料表
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
);

-- 啟用 Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 允許所有人讀取產品資料 (公開讀取)
CREATE POLICY "Allow public read access" ON products
  FOR SELECT USING (true);

-- 允許所有人新增產品
CREATE POLICY "Allow public insert access" ON products
  FOR INSERT WITH CHECK (true);

-- 允許所有人更新產品
CREATE POLICY "Allow public update access" ON products
  FOR UPDATE USING (true);

-- 允許所有人刪除產品
CREATE POLICY "Allow public delete access" ON products
  FOR DELETE USING (true);

-- 插入初始資料
INSERT INTO products (id, name, description) VALUES
  ('RTX 5060 Ti', '16GB VRAM - 高效能入門級'),
  ('RTX 5070 Ti', '16GB VRAM - 中高階效能'),
  ('RTX 5080 Ti', '16GB VRAM - 頂級效能');