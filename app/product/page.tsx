"use client";
import Navbar from "../navbar";
import { useState, useEffect } from "react";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
  CircularProgress,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { createClient } from "@supabase/supabase-js";

type Product = { id: string; name: string; description: string };

// 初始化 Supabase 客戶端
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function Product() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // 從資料庫讀取產品
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        console.error("讀取產品失敗:", error);
        return;
      }

      setProducts(data || []);
    } catch (err) {
      console.error("錯誤:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setNewItemName("");
    setNewItemDesc("");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddItem = async () => {
    if (!newItemName.trim()) {
      alert("請輸入產品名稱");
      return;
    }

    try {
      setIsSubmitting(true);
      const { data, error } = await supabase
        .from("products")
        .insert([
          {
            name: newItemName.trim(),
            description: newItemDesc.trim(),
          },
        ])
        .select();

      if (error) {
        console.error("新增產品失敗:", error);
        alert("新增產品失敗，請重試");
        return;
      }

      // 重新讀取產品清單
      await fetchProducts();
      setNewItemName("");
      setNewItemDesc("");
      setOpenDialog(false);
    } catch (err) {
      console.error("錯誤:", err);
      alert("發生錯誤，請重試");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Navbar />
        
        <main className="flex-grow px-4 py-8 max-w-6xl mx-auto w-full">
          {/* 頁面標題 */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">NVIDIA 顯示卡</h1>
            <p className="text-slate-600">高效能遊戲與專業工作站顯示卡</p>
          </div>

          {/* 載入狀態 */}
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
              <CircularProgress />
            </Box>
          ) : (
            /* 產品網格 */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {products.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-slate-500 text-lg">暫無產品，點擊 + 按鈕新增</p>
                </div>
              ) : (
                products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 border-l-4 border-blue-500"
                  >
                    {/* 刪除按鈕 */}
                    <div className="flex justify-end">
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={async () => {
                          if (!confirm(`確定要刪除 ${product.name} 嗎？`)) return;
                          try {
                            setDeletingId(product.id);
                            const { error } = await supabase
                              .from("products")
                              .delete()
                              .eq("id", product.id);
                            if (error) {
                              console.error("刪除失敗:", error);
                              alert("刪除失敗，請重試");
                              return;
                            }
                            await fetchProducts();
                          } catch (err) {
                            console.error(err);
                            alert("發生錯誤，請重試");
                          } finally {
                            setDeletingId(null);
                          }
                        }}
                        disabled={deletingId === product.id}
                      >
                        {deletingId === product.id ? (
                          <CircularProgress size={18} />
                        ) : (
                          <DeleteIcon fontSize="small" />
                        )}
                      </IconButton>
                    </div>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h2 className="text-xl font-semibold text-slate-800">
                          {product.name}
                        </h2>
                      </div>
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                        新品
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {product.description}
                    </p>
                    <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition text-sm font-medium">
                      了解更多
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

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
            <DialogTitle>新增產品</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="產品名稱"
                type="text"
                fullWidth
                required
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="例：RTX 5090 Ti"
              />
              <TextField
                margin="dense"
                label="產品描述"
                type="text"
                fullWidth
                multiline
                rows={3}
                value={newItemDesc}
                onChange={(e) => setNewItemDesc(e.target.value)}
                placeholder="例：24GB VRAM - 旗艦級效能"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} disabled={isSubmitting}>
                取消
              </Button>
              <Button
                onClick={handleAddItem}
                variant="contained"
                disabled={isSubmitting}
              >
                {isSubmitting ? "提交中..." : "提交"}
              </Button>
            </DialogActions>
          </Dialog>
        </main>
      </div>
    </>
  );
}