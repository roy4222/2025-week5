"use client";
import Navbar from "../navbar";
import { useState } from "react";
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

type Product = { id: number; name: string; description: string };

export default function Product() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "RTX 5060 Ti", description: "16GB VRAM - 高效能入門級" },
    { id: 2, name: "RTX 5070 Ti", description: "16GB VRAM - 中高階效能" },
    { id: 3, name: "RTX 5080 Ti", description: "16GB VRAM - 旗艦級效能" },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");

  const handleOpenDialog = () => {
    setNewItemName("");
    setNewItemDesc("");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddItem = () => {
    if (!newItemName.trim()) {
      alert("請輸入產品名稱");
      return;
    }

    const newProduct: Product = {
      id: Math.max(...products.map((p) => p.id), 0) + 1,
      name: newItemName.trim(),
      description: newItemDesc.trim(),
    };

    setProducts([...products, newProduct]);
    setNewItemName("");
    setNewItemDesc("");
    setOpenDialog(false);
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

          {/* 產品網格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 border-l-4 border-blue-500"
              >
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
            ))}
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
              <Button onClick={handleCloseDialog}>取消</Button>
              <Button onClick={handleAddItem} variant="contained">
                提交
              </Button>
            </DialogActions>
          </Dialog>
        </main>
      </div>
    </>
  );
}