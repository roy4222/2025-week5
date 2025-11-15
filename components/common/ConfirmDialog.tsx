/**
 * 確認對話框組件
 * 用於需要使用者確認的操作
 */

import React from "react";
import Dialog from "./Dialog";
import Button from "./Button";

interface ConfirmDialogProps {
  /**
   * 是否開啟對話框
   */
  open: boolean;

  /**
   * 關閉對話框的回呼函數
   */
  onClose: () => void;

  /**
   * 確認操作的回呼函數
   */
  onConfirm: () => void;

  /**
   * 對話框標題
   */
  title?: string;

  /**
   * 確認訊息
   */
  message: string;

  /**
   * 確認按鈕文字
   */
  confirmText?: string;

  /**
   * 取消按鈕文字
   */
  cancelText?: string;

  /**
   * 確認按鈕樣式
   */
  confirmVariant?: "primary" | "danger";

  /**
   * 是否為載入中狀態
   */
  loading?: boolean;
}

/**
 * 確認對話框組件
 */
export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "確認操作",
  message,
  confirmText = "確認",
  cancelText = "取消",
  confirmVariant = "primary",
  loading = false,
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      closeOnBackdropClick={!loading}
      actions={
        <>
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            variant={confirmVariant}
            onClick={handleConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <p className="text-gray-700">
        {message}
      </p>
    </Dialog>
  );
}

