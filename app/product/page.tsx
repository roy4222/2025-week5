"use client";
import { useState } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Navbar from "../navbar";
import { useProducts } from "@/hooks/useProducts";
import PageHeader from "@/app/product/PageHeader";
import ProductList from "@/app/product/ProductList";
import AddProductDialog from "@/app/product/AddProductDialog";

/**
 * 產品頁面主組件
 * 負責整合所有子組件並管理對話框狀態
 */
export default function ProductPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const {
    products,
    loading,
    isSubmitting,
    deletingId,
    addProduct,
    deleteProduct,
  } = useProducts();

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />

      <main className="flex-grow px-4 py-8 max-w-6xl mx-auto w-full">
        <PageHeader />

        <ProductList
          products={products}
          loading={loading}
          deletingId={deletingId}
          onDeleteProduct={deleteProduct}
        />

        {/* FAB 新增按鈕 */}
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          onClick={handleOpenDialog}
        >
          <AddIcon />
        </Fab>

        {/* 新增產品對話框 */}
        <AddProductDialog
          open={openDialog}
          onClose={handleCloseDialog}
          onSubmit={addProduct}
          isSubmitting={isSubmitting}
        />
      </main>
    </div>
  );
}