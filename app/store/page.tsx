// 為了使用 MUI 元件，我們需要宣告這是一個 Client Component
"use client";

import { useState } from 'react';
import Link from "next/link";
import Navbar from "../navbar";

// 引入 Material-UI 元件
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField, // 1. 引入 TextField
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit'; // 引入編輯圖示
import SaveIcon from '@mui/icons-material/Save';   // 引入儲存圖示
import CancelIcon from '@mui/icons-material/Cancel'; // 引入取消圖示


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

export default function Store() {
  const [products, setProducts] = useState(initialProducts);
  // 2. 新增 state 來管理編輯狀態
  const [editingProductId, setEditingProductId] = useState(null); // 正在編輯的產品ID
  const [editedProduct, setEditedProduct] = useState(null); // 正在編輯的產品的暫存資料

  const handleAddProduct = () => {
    // ... (新增產品函式不變)
    const newProduct = {
      id: `p${Date.now()}`,
      name: "全新商品",
      description: "這是一個動態新增的商品項目。",
      price: Math.floor(Math.random() * 5000) + 1000,
      imageUrl: `https://via.placeholder.com/300?text=New+Item`,
    };
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  // 3. 處理 "編輯" 按鈕點擊
  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setEditedProduct({ ...product }); // 複製一份產品資料到暫存 state
  };

  // 4. 處理 "儲存" 按鈕點擊
  const handleSave = (productId) => {
    setProducts(currentProducts =>
      currentProducts.map(p => (p.id === productId ? editedProduct : p))
    );
    setEditingProductId(null); // 結束編輯模式
    setEditedProduct(null);
  };
  
  // 5. 處理 "取消" 按鈕點擊
  const handleCancel = () => {
    setEditingProductId(null); // 直接結束編輯模式
    setEditedProduct(null);
  };

  // 6. 處理輸入框內容變更
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({
      ...prev,
      // 如果欄位是 price，確保存為數字
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          {/* ... (標題和新增商品按鈕不變) */}
          <Typography variant="h4" component="h1">商品列表</Typography>
          <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleAddProduct}>新增商品</Button>
        </Box>

        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.imageUrl}
                  alt={product.name}
                />
                {/* 7. 條件渲染：根據是否在編輯模式顯示不同內容 */}
                {editingProductId === product.id ? (
                  // ----- 編輯模式 -----
                  <CardContent sx={{ flexGrow: 1, p: 2, '& .MuiTextField-root': { mb: 2 } }}>
                    <TextField label="商品名稱" name="name" value={editedProduct.name} onChange={handleInputChange} fullWidth/>
                    <TextField label="商品描述" name="description" value={editedProduct.description} onChange={handleInputChange} fullWidth multiline rows={3}/>
                    <TextField label="價格" name="price" type="number" value={editedProduct.price} onChange={handleInputChange} fullWidth/>
                  </CardContent>
                ) : (
                  // ----- 正常顯示模式 -----
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">{product.name}</Typography>
                    <Typography>{product.description}</Typography>
                    <Typography variant="h6" color="primary" sx={{ mt: 2 }}>NT$ {product.price.toLocaleString()}</Typography>
                  </CardContent>
                )}
                
                {/* 8. 條件渲染：根據是否在編輯模式顯示不同按鈕 */}
                <CardActions>
                  {editingProductId === product.id ? (
                    // ----- 編輯模式按鈕 -----
                    <>
                      <Button size="small" startIcon={<SaveIcon />} onClick={() => handleSave(product.id)} color="primary">儲存</Button>
                      <Button size="small" startIcon={<CancelIcon />} onClick={handleCancel} color="inherit">取消</Button>
                    </>
                  ) : (
                    // ----- 正常顯示模式按鈕 -----
                    <>
                      <Button size="small" startIcon={<AddShoppingCartIcon />}>加入購物車</Button>
                      <Button size="small" startIcon={<EditIcon />} onClick={() => handleEdit(product)}>編輯</Button>
                    </>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Link href="/" style={{ textDecoration: 'none', marginTop: '32px', display: 'inline-block' }}>
          <Button variant="contained">回到首頁</Button>
        </Link>
      </Container>
    </Box>
  );
}