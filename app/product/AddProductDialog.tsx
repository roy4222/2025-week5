import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

interface AddProductDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, description: string) => Promise<void>;
  isSubmitting: boolean;
}

/**
 * 新增產品對話框組件
 * 提供表單輸入並處理產品新增邏輯
 */
export default function AddProductDialog({
  open,
  onClose,
  onSubmit,
  isSubmitting,
}: AddProductDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleClose = () => {
    if (!isSubmitting) {
      setName("");
      setDescription("");
      onClose();
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("請輸入產品名稱");
      return;
    }

    try {
      await onSubmit(name, description);
      setName("");
      setDescription("");
      onClose();
    } catch (err) {
      alert(err instanceof Error ? err.message : "發生錯誤，請重試");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>新增產品</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="產品名稱"
          type="text"
          fullWidth
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="例：RTX 5090 Ti"
          disabled={isSubmitting}
        />
        <TextField
          margin="dense"
          label="產品描述"
          type="text"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="例：24GB VRAM - 旗艦級效能"
          disabled={isSubmitting}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isSubmitting}>
          取消
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={isSubmitting}>
          {isSubmitting ? "提交中..." : "提交"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

