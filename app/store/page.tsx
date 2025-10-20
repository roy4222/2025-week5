// 為了使用 MUI 元件，我們需要宣告這是一個 Client Component
"use client";

import { useState } from 'react';
import Link from "next/link";
import Navbar from "../navbar";

// 引入 Material-UI 元件
import {
  Box,
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';


const initialProducts = [
  // ... (初始產品資料與之前相同，此處省略)
  {
    id: "p001",
    name: "高效能筆記型電腦",
    description: "搭載最新處理器，適合專業人士與遊戲玩家。",
    price: 35000,
    imageUrl: "https://via.placeholder.com/300?text=Laptop",
  },
  {
    id: "p002",
    name: "人體工學滑鼠",
    description: "長時間使用也能保持舒適，提升工作效率。",
    price: 1200,
    imageUrl: "https://via.placeholder.com/300?text=Mouse",
  },
  {
    id: "p003",
    name: "機械式鍵盤",
    description: "提供絕佳的回饋手感，打字體驗一流。",
    price: 2800,
    imageUrl: "https://via.placeholder.com/300?text=Keyboard",
  },
  {
    id: "p004",
    name: "4K 高解析度螢幕",
    description: "細膩畫質，色彩鮮豔，帶來沉浸式視覺饗宴。",
    price: 8500,
    imageUrl: "https://via.placeholder.com/300?text=Monitor",
  },
];

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

export default function Store() {
  const [products, setProducts] = useState(initialProducts);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null); // 正在編輯的產品（null 表示新增模式）
  const [formData, setFormData] = useState<Product>({
    id: '',
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
  });

  // 開啟新增 Dialog
  const handleOpenAddDialog = () => {
    setEditingProduct(null);
    setFormData({
      id: `p${Date.now()}`,
      name: '',
      description: '',
      price: 0,
      imageUrl: 'https://via.placeholder.com/300?text=New+Item',
    });
    setOpenDialog(true);
  };

  // 開啟編輯 Dialog
  const handleOpenEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setOpenDialog(true);
  };

  // 關閉 Dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
  };

  // 儲存產品
  const handleSave = () => {
    if (editingProduct) {
      // 編輯現有產品
      setProducts(currentProducts =>
        currentProducts.map(p => (p.id === editingProduct.id ? formData : p))
      );
    } else {
      // 新增產品
      setProducts(prevProducts => [...prevProducts, formData]);
    }
    handleCloseDialog();
  };

  // 處理輸入框內容變更
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      // 如果欄位是 price，確保存為數字
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">商品列表</Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 4 }}>
          {products.map((product) => (
            <Card key={product.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={product.imageUrl}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">{product.name}</Typography>
                <Typography>{product.description}</Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>NT$ {product.price.toLocaleString()}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<AddShoppingCartIcon />}>加入購物車</Button>
                <Button size="small" startIcon={<EditIcon />} onClick={() => handleOpenEditDialog(product)}>編輯</Button>
              </CardActions>
            </Card>
          ))}
        </Box>

        <Link href="/" style={{ textDecoration: 'none', marginTop: '32px', display: 'inline-block' }}>
          <Button variant="contained">回到首頁</Button>
        </Link>
      </Container>

      {/* FAB 按鈕 */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handleOpenAddDialog}
      >
        <AddIcon />
      </Fab>

      {/* Dialog 編輯/新增視窗 */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingProduct ? '編輯商品' : '新增商品'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="商品名稱"
            name="name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="商品描述"
            name="description"
            type="text"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="價格"
            name="price"
            type="number"
            fullWidth
            value={formData.price}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="圖片網址"
            name="imageUrl"
            type="text"
            fullWidth
            value={formData.imageUrl}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button onClick={handleSave} variant="contained">儲存</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}