"use client";

import { useState, useEffect } from "react";
import Navbar from "../navbar";
import { supabase } from "@/lib/supabase";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

interface Anime {
  id: string;
  title: string;
  genre: string;
  rating: number;
  created_at?: string;
}

export default function Animate() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAnime, setEditingAnime] = useState<Anime | null>(null);
  const [formData, setFormData] = useState<Anime>({
    id: "",
    title: "",
    genre: "",
    rating: 0,
  });

  // 從 Supabase 載入動漫資料
  const fetchAnimes = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("animes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setAnimes(data || []);
    } catch (err) {
      console.error("Error fetching animes:", err);
      setError(err instanceof Error ? err.message : "載入動漫資料失敗");
    } finally {
      setLoading(false);
    }
  };

  // 初始載入
  useEffect(() => {
    fetchAnimes();
  }, []);

  const handleOpenAddDialog = () => {
    setEditingAnime(null);
    setFormData({
      id: "",
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

  const handleSave = async () => {
    try {
      setError(null);

      if (editingAnime) {
        // 編輯現有動漫
        const { error } = await supabase
          .from("animes")
          .update({
            title: formData.title,
            genre: formData.genre,
            rating: formData.rating,
          })
          .eq("id", editingAnime.id);

        if (error) throw error;
      } else {
        // 新增動漫
        const { error } = await supabase.from("animes").insert([
          {
            title: formData.title,
            genre: formData.genre,
            rating: formData.rating,
          },
        ]);

        if (error) throw error;
      }

      handleCloseDialog();
      fetchAnimes(); // 重新載入動漫列表
    } catch (err) {
      console.error("Error saving anime:", err);
      setError(err instanceof Error ? err.message : "儲存動漫失敗");
    }
  };

  const handleDelete = async (animeId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // 防止觸發卡片的點擊事件
    
    if (!confirm("確定要刪除此動漫嗎?")) return;

    try {
      setError(null);

      const { error } = await supabase.from("animes").delete().eq("id", animeId);

      if (error) throw error;

      fetchAnimes(); // 重新載入動漫列表
    } catch (err) {
      console.error("Error deleting anime:", err);
      setError(err instanceof Error ? err.message : "刪除動漫失敗");
    }
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

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress />
          </div>
        ) : animes.length === 0 ? (
          <div className="text-center text-gray-500 mt-12">
            <p className="text-xl">目前沒有動漫資料</p>
            <p className="mt-2">點擊右下角的 + 按鈕新增動漫</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {animes.map((anime) => (
              <div
                key={anime.id}
                className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow h-full cursor-pointer relative"
                onClick={() => handleOpenEditDialog(anime)}
              >
                <IconButton
                  size="small"
                  color="error"
                  sx={{ position: "absolute", top: 8, right: 8 }}
                  onClick={(e) => handleDelete(anime.id, e)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <h2 className="text-xl text-gray-600 font-semibold mb-2 pr-8">
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
        )}
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
