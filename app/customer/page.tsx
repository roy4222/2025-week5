"use client";

import React, { useState } from "react";
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

export default function Animate() {
  const [items, setItems] = useState<Game[]>([
    { id: 1, title: "特戰英豪", genre: "第一人稱射擊", rating: 9.0 },
    { id: 2, title: "call of duty", genre: "第一人稱射擊", rating: 8.7 },
    { id: 3, title: "艾爾登法環", genre: "動作/魂類", rating: 8.6 },
    { id: 4, title: "隻狼", genre: "動作/魂類", rating: 8.5 },
    { id: 5, title: "貓娘樂園", genre: "第一人稱射擊", rating: 9.2 },
    { id: 6, title: "飢荒", genre: "沙盒生存", rating: 8.4 },
  ]);

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

    const nextId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    const newItem: Game = { id: nextId, title: title.trim(), genre: genre.trim(), rating: parsed };
    setItems((prev) => [newItem, ...prev]);

    // reset and close
    setTitle("");
    setGenre("");
    setRating("");
    setOpenDialog(false);
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <Navbar />
      <div className="flex-grow p-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-600">遊戲推薦</h1>

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
