import { CircularProgress, Box } from "@mui/material";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
  loading: boolean;
  deletingId: string | null;
  onDeleteProduct: (id: string) => Promise<void>;
}

/**
 * 產品列表組件
 * 顯示產品網格或載入/空狀態
 */
export default function ProductList({
  products,
  loading,
  deletingId,
  onDeleteProduct,
}: ProductListProps) {
  // 載入狀態
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
      </Box>
    );
  }

  // 空狀態
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 text-lg">暫無產品，點擊 + 按鈕新增</p>
      </div>
    );
  }

  // 產品網格
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={onDeleteProduct}
          isDeleting={deletingId === product.id}
        />
      ))}
    </div>
  );
}

