"use client";

import { useState } from "react";
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

interface Anime {
  id: number;
  title: string;
  genre: string;
  rating: number;
}

export default function Animate() {
  const [animes, setAnimes] = useState<Anime[]>([
    { id: 1, title: "進擊的巨人", genre: "動作", rating: 9.0 },
    { id: 2, title: "鬼滅之刃", genre: "冒險", rating: 8.7 },
    { id: 3, title: "咒術迴戰", genre: "奇幻", rating: 8.6 },
    { id: 4, title: "間諜家家酒", genre: "喜劇", rating: 8.5 },
    { id: 5, title: "葬送的芙莉蓮", genre: "奇幻", rating: 9.2 },
    { id: 6, title: "我推的孩子", genre: "劇情", rating: 8.4 },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingAnime, setEditingAnime] = useState<Anime | null>(null);
  const [formData, setFormData] = useState<Anime>({
    id: 0,
    title: "",
    genre: "",
    rating: 0,
  });

  const handleOpenAddDialog = () => {
    setEditingAnime(null);
    setFormData({
      id: Date.now(),
      title: "",
      genre: "",
      rating: 0,
    });
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (anime: Anime) => {
    setEditingAnime(anime);
    setFormData({ ...anime });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAnime(null);
  };

  const handleSave = () => {
    if (editingAnime) {
      // 編輯現有動漫
      setAnimes(animes.map((anime) => (anime.id === editingAnime.id ? formData : anime)));
    } else {
      // 新增動漫
      setAnimes([...animes, formData]);
    }
    handleCloseDialog();
  };

  const handleInputChange = (field: keyof Anime, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  
  return (
    <div className="flex flex-col h-screen bg-white">
      <Navbar />
      <div className="flex-grow p-4 overflow-auto">
        <h1 className="text-3xl font-bold text-center text-gray-600 mb-6">
          動漫推薦
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animes.map((anime) => (
            <div
              key={anime.id}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow h-full cursor-pointer"
              onClick={() => handleOpenEditDialog(anime)}
            >
              <h2 className="text-xl text-gray-600 font-semibold mb-2">
                {anime.title}
              </h2>
              <p className="text-gray-600 mb-2">類型: {anime.genre}</p>
              <div className="flex items-center">
                <span className="text-yellow-500 text-lg">★</span>
                <span className="ml-1 text-gray-700">{anime.rating}</span>
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
        onClick={handleOpenAddDialog}
      >
        <AddIcon />
      </Fab>

      {/* Dialog 編輯視窗 */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingAnime ? "編輯動漫" : "新增動漫"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="動漫名稱"
            type="text"
            fullWidth
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
          <TextField
            margin="dense"
            label="類型"
            type="text"
            fullWidth
            value={formData.genre}
            onChange={(e) => handleInputChange("genre", e.target.value)}
          />
          <TextField
            margin="dense"
            label="評分 (0-10)"
            type="number"
            fullWidth
            value={formData.rating}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (!isNaN(value) && value >= 0 && value <= 10) {
                handleInputChange("rating", value);
              }
            }}
            inputProps={{ min: 0, max: 10, step: 0.1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button onClick={handleSave} variant="contained">
            儲存
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
