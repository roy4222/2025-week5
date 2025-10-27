CREATE TABLE IF NOT EXISTS public.games (
  id serial PRIMARY KEY,
  title text NOT NULL,
  genre text NOT NULL,
  rating numeric(3,1) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Optional: insert seed data (id values provided for clarity)
INSERT INTO public.games (id, title, genre, rating) VALUES
  (1, '特戰英豪', '第一人稱射擊', 9.0),
  (2, 'call of duty', '第一人稱射擊', 8.7),
  (3, '艾爾登法環', '動作/魂類', 8.6),
  (4, '隻狼', '動作/魂類', 8.5),
  (5, '貓娘樂園', '第一人稱射擊', 9.2),
  (6, '飢荒', '沙盒生存', 8.4)
ON CONFLICT DO NOTHING;