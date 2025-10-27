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


--store
INSERT INTO "public"."store" ("id", "name", "description", "price") VALUES ('1', '高效能筆記型電腦', '高效能筆記型電腦搭載最新處理器，適合專業人士與遊戲玩家。

', '35000'), ('2', '人體工學滑鼠', '人體工學滑鼠長時間使用也能保持舒適，提升工作效率。', '1200'), ('3', '機械式鍵盤', '機械式鍵盤提供絕佳的回饋手感，打字體驗一流。', '2800'), ('4', '4K 高解析度螢幕', '4K 高解析度螢幕
細膩畫質，色彩鮮豔，帶來沉浸式視覺饗宴。', '8500');
