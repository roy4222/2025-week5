import { IconButton, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => Promise<void>;
  isDeleting: boolean;
}

/**
 * 產品卡片組件
 * 顯示單一產品的資訊和操作按鈕
 */
export default function ProductCard({
  product,
  onDelete,
  isDeleting,
}: ProductCardProps) {
  const handleDelete = async () => {
    if (!confirm(`確定要刪除 ${product.name} 嗎？`)) return;

    try {
      await onDelete(product.id);
    } catch (err) {
      alert("刪除失敗，請重試");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 border-l-4 border-blue-500">
      {/* 刪除按鈕 */}
      <div className="flex justify-end">
        <IconButton
          aria-label="delete"
          size="small"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <CircularProgress size={18} />
          ) : (
            <DeleteIcon fontSize="small" />
          )}
        </IconButton>
      </div>

      {/* 產品資訊 */}
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
  );
}

