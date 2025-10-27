// 為了使用 MUI 元件，我們需要宣告這是一個 Client Component
"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import Navbar from "../navbar";
import { supabase } from '../../lib/supabase'; // 確保路徑正確

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
  CircularProgress,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// 更新 Product type，id 是數字
type Product = {
  id: number; // ID 現在是數字
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  created_at?: string;
};

// 用於表單的 type，ID 在新增時是可選的
type ProductFormData = Omit<Product, 'id' | 'created_at'> & {
  id?: number; 
};

export default function Store() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // 表單的初始狀態
  const initialFormData: ProductFormData = {
    name: '',
    description: '',
    price: 0,
    imageUrl: 'https://via.placeholder.com/300?text=New+Item',
  };
  
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);

  // --- Supabase Data Fetching ---
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // 從 'products' 表讀取
      const { data, error } = await supabase
        .from('products') 
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
      } else if (data) {
        setProducts(data);
      }
    } catch (err) {
      console.error('An unexpected error occurred:', err);
    } finally {
      setLoading(false);
    }
  };

  // --- Dialog Handlers ---

  const handleOpenAddDialog = () => {
    setEditingProduct(null);
    setFormData(initialFormData); // 重設為初始空表單 (沒有 id)
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({ ...product }); // 載入包含 id 的現有資料
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
  };

  // --- Supabase CRUD Operations ---

  const handleSave = async () => {
    if (!formData.name) {
      alert('商品名稱為必填項。');
      return;
    }

    if (editingProduct) {
      // 編輯模式 (Update) - formData 中有 id
      const { data, error } = await supabase
        .from('products')
        .update({
          name: formData.name,
          description: formData.description,
          price: formData.price,
          imageUrl: formData.imageUrl,
        })
        .eq('id', editingProduct.id) // 使用 editingProduct.id 來確保
        .select()
        .single();

      if (error) {
        console.error('Error updating product:', error);
        alert(`更新失敗: ${error.message}`);
      } else if (data) {
        setProducts(currentProducts =>
          currentProducts.map(p => (p.id === data.id ? data : p))
        );
        handleCloseDialog();
      }

    } else {
      // 新增模式 (Insert) - formData 中沒有 id
      
      // 我們需要移除 formData 中的 'id' (即使它是 undefined)，
      // 因為 insertData 不應該包含 id
      const { id, ...insertData } = formData; 

      const { data, error } = await supabase
        .from('products')
        .insert(insertData) // 插入沒有 id 的資料
        .select()
        .single();

      if (error) {
        console.error('Error adding product:', error);
        alert(`新增失敗: ${error.message}`);
      } else if (data) {
        setProducts(prevProducts => [data, ...prevProducts]);
        handleCloseDialog();
      }
    }
  };

  // 刪除 (id 是數字)
  const handleDelete = async (productId: number) => {
    if (!window.confirm('確定要刪除這個商品嗎？')) {
      return;
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) {
      console.error('Error deleting product:', error);
      alert(`刪除失敗: ${error.message}`);
    } else {
      setProducts(currentProducts =>
        currentProducts.filter(p => p.id !== productId)
      );
    }
  };

  // 處理輸入框內容變更
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  // --- Render ---

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">商品列表 (Supabase)</Typography>
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
                {/* 確保 price 是數字才能用 toLocaleString() */}
                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>NT$ {product.price.toLocaleString()}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<AddShoppingCartIcon />}>加入購物車</Button>
                <Button size="small" startIcon={<EditIcon />} onClick={() => handleOpenEditDialog(product)}>編輯</Button>
                <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(product.id)}>刪除</Button>
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

      {/* Dialog 編輯/新增視窗 (移除了 ID 欄位) */}
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