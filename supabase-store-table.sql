-- 創建 products 資料表
CREATE TABLE store (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 啟用 Row Level Security (RLS)
ALTER TABLE store ENABLE ROW LEVEL SECURITY;

-- 允許所有人讀取產品資料 (公開讀取)
CREATE POLICY "Allow public read access" ON store
  FOR SELECT USING (true);

-- 允許所有人新增產品
CREATE POLICY "Allow public insert access" ON store
  FOR INSERT WITH CHECK (true);

-- 允許所有人更新產品
CREATE POLICY "Allow public update access" ON store
  FOR UPDATE USING (true);

-- 允許所有人刪除產品
CREATE POLICY "Allow public delete access" ON store
  FOR DELETE USING (true);

-- 插入初始資料
INSERT INTO store (name, description, price, image_url) VALUES
  ('高效能筆記型電腦', '搭載最新處理器，適合專業人士與遊戲玩家。', 35000, 'https://via.placeholder.com/300?text=Laptop'),
  ('人體工學滑鼠', '長時間使用也能保持舒適，提升工作效率。', 1200, 'https://via.placeholder.com/300?text=Mouse'),
  ('機械式鍵盤', '提供絕佳的回饋手感，打字體驗一流。', 2800, 'https://via.placeholder.com/300?text=Keyboard'),
  ('4K 高解析度螢幕', '細膩畫質，色彩鮮豔，帶來沉浸式視覺饗宴。', 8500, 'https://via.placeholder.com/300?text=Monitor');