-- 創建 games 資料表
CREATE TABLE games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  genre TEXT NOT NULL,
  rating NUMERIC(3, 1) CHECK (rating >= 0 AND rating <= 10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 啟用 Row Level Security (RLS)
ALTER TABLE games ENABLE ROW LEVEL SECURITY;

-- 允許所有人讀取遊戲資料 (公開讀取)
CREATE POLICY "Allow public read access" ON games
  FOR SELECT USING (true);

-- 允許所有人新增遊戲
CREATE POLICY "Allow public insert access" ON games
  FOR INSERT WITH CHECK (true);

-- 允許所有人更新遊戲
CREATE POLICY "Allow public update access" ON games
  FOR UPDATE USING (true);

-- 允許所有人刪除遊戲
CREATE POLICY "Allow public delete access" ON games
  FOR DELETE USING (true);

-- 插入初始資料
INSERT INTO games (title, genre, rating) VALUES
  ('特戰英豪', '第一人稱射擊', 9.0),
  ('call of duty', '第一人稱射擊', 8.7),
  ('艾爾登法環', '動作/魂類', 8.6),
  ('隻狼', '動作/魂類', 8.5),
  ('貓娘樂園', '第一人稱射擊', 9.2),
  ('飢荒', '沙盒生存', 8.4);