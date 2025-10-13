// 為了使用 MUI 元件，我們需要宣告這是一個 Client Component
"use client";

import Link from "next/link";
import Navbar from "../navbar"; // 假設 Navbar 元件路徑

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
  Button 
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'; // 引入購物車圖示

// 1. 新增四個產品的陣列
const products = [
  {
    id: "p001",
    name: "高效能筆記型電腦",
    description: "搭載最新處理器，適合專業人士與遊戲玩家。",
    price: 35000,
    imageUrl: "https://via.placeholder.com/300?text=Laptop", // 範例圖片 URL
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
  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          商品列表
        </Typography>

        {/* 使用 Grid 容器來排列產品卡片 */}
        <Grid container spacing={4}>
          {/* 2. 使用 .map() 將陣列渲染成 MUI Card */}
          {products.map((product) => (
            // Grid item: 設定在不同螢幕尺寸下的欄位寬度
            // xs={12}: 手機(最小)佔滿12欄 (1個一行)
            // sm={6}: 平板(small)佔6欄 (2個一行)
            // md={4}: 中等螢幕(medium)佔4欄 (3個一行)
            // lg={3}: 大螢幕(large)佔3欄 (4個一行)
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.imageUrl}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                    NT$ {product.price.toLocaleString()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" startIcon={<AddShoppingCartIcon />}>
                    加入購物車
                  </Button>
                  <Button size="small">查看詳情</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Link href="/" style={{ textDecoration: 'none', marginTop: '32px', display: 'inline-block' }}>
          <Button variant="contained">
            回到首頁
          </Button>
        </Link>
      </Container>
    </Box>
  );
}