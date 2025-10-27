"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../navbar";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type Game = {
  id: number;
  title: string;
  genre: string;
  rating: number;
};

export default function Games() {
  const [items, setItems] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Supabase REST 設定（需在 .env.local 設定 NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY）
  const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const SUPA_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  const getHeaders = () =>
    ({
      "Content-Type": "application/json",
      apikey: SUPA_KEY,
      Authorization: `Bearer ${SUPA_KEY}`,
    } as Record<string, string>);

  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleOpenDialog = () => {
    setTitle("");
    setGenre("");
    setRating("");
    setError(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setError(null);
  };

  function handleAdd() {
    setError(null);

    if (!title.trim() || !genre.trim() || rating === "") {
      setError("請填寫 title、genre 與 rating");
      return;
    }

    const parsed = Number(rating);
    if (Number.isNaN(parsed) || parsed < 0 || parsed > 10) {
      setError("rating 必須是 0 到 10 的數字");
      return;
    }

    // 若未設定環境變數，直接在 client 顯示錯誤
    if (!SUPA_URL || !SUPA_KEY) {
      setError("server config missing: 請設定 NEXT_PUBLIC_SUPABASE_URL 與 NEXT_PUBLIC_SUPABASE_ANON_KEY");
      return;
    }

    // POST 到 Supabase REST v1/games，使用 Prefer: return=representation 取得回傳 row
    (async () => {
      try {
        const insertUrl = `${SUPA_URL.replace(/\/$/, "")}/rest/v1/games`;
        const res = await fetch(insertUrl, {
          method: "POST",
          headers: { ...getHeaders(), Prefer: "return=representation" },
          body: JSON.stringify({ title: title.trim(), genre: genre.trim(), rating: parsed }),
        });
        if (!res.ok) {
          const text = await res.text();
          console.error("Supabase REST insert error:", res.status, text);
          setError("儲存失敗，請稍後再試");
          return;
        }
        const rows = await res.json();
        if (Array.isArray(rows) && rows[0]) {
          setItems((prev) => [rows[0] as Game, ...prev]);
        }
        // reset and close
        setTitle("");
        setGenre("");
        setRating("");
        setOpenDialog(false);
      } catch (err) {
        console.error(err);
        setError("儲存失敗，請稍後再試");
      }
    })();
  }

  // 載入 Supabase 的 games 資料
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (!SUPA_URL || !SUPA_KEY) {
        console.error("請設定 NEXT_PUBLIC_SUPABASE_URL 與 NEXT_PUBLIC_SUPABASE_ANON_KEY");
        setIsLoading(false);
        return;
      }
      try {
        const url = `${SUPA_URL.replace(/\/$/, "")}/rest/v1/games?select=*&order=id.desc`;
        const res = await fetch(url, { headers: getHeaders() });
        if (!res.ok) {
          const text = await res.text();
          console.error("Supabase REST fetch error:", res.status, text);
          setIsLoading(false);
          return;
        }
        const data = await res.json();
        console.log("Supabase fetched games rows:", data);
        const normalized = (data as any[]).map((row) => ({
          ...row,
          rating: row.rating !== null && row.rating !== undefined ? Number(row.rating) : 0,
        }));
        setItems(normalized as Game[]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-white">
      <Navbar />
      <div className="flex-grow p-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-600">遊戲推薦</h1>

        {isLoading ? (
          <div className="text-center py-20 text-gray-500">載入中...</div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 text-gray-500">目前沒有遊戲資料</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((game) => (
              <div key={game.id}>
                <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow h-full">
                  <h2 className="text-xl text-gray-600 font-semibold mb-2">{game.title}</h2>
                  <p className="text-gray-600 mb-2">類型: {game.genre}</p>
                  <div className="flex items-center">
                    <span className="text-yellow-500 text-lg">★</span>
                    <span className="ml-1 text-gray-700">{game.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAB 按鈕 */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={handleOpenDialog}
      >
        <AddIcon />
      </Fab>

      {/* Dialog 新增視窗 */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>新增遊戲</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="遊戲名稱"
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <TextField
            margin="dense"
            label="類型"
            type="text"
            fullWidth
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Genre"
          />
          <TextField
            margin="dense"
            label="評分 (0-10)"
            type="text"
            fullWidth
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Rating (0-10)"
          />
          {error && (
            <div className="text-sm text-red-600 mt-2">{error}</div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button onClick={handleAdd} variant="contained">
            新增
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
