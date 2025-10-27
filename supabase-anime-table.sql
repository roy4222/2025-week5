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



