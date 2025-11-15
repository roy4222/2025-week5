/**
 * 通用實體表單對話框組件
 * 用於新增或編輯資料實體
 */

import React, { useState, useEffect } from "react";
import Dialog from "@/components/common/Dialog";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import TextArea from "@/components/common/TextArea";
import { EntityField } from "@/types/common";

interface EntityFormProps<T> {
  /**
   * 是否開啟對話框
   */
  open: boolean;

  /**
   * 關閉對話框的回呼函數
   */
  onClose: () => void;

  /**
   * 提交表單的回呼函數
   */
  onSubmit: (data: Partial<T>) => Promise<void>;

  /**
   * 編輯中的實體（編輯模式）
   */
  editingEntity?: T | null;

  /**
   * 表單欄位定義
   */
  fields: EntityField[];

  /**
   * 對話框標題
   */
  title?: string;

  /**
   * 是否正在提交
   */
  submitting?: boolean;
}

/**
 * 通用實體表單對話框組件
 */
export default function EntityForm<T extends Record<string, any>>({
  open,
  onClose,
  onSubmit,
  editingEntity,
  fields,
  title,
  submitting = false,
}: EntityFormProps<T>) {
  const [formData, setFormData] = useState<Partial<T>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 當編輯實體改變時，更新表單資料
  useEffect(() => {
    if (editingEntity) {
      setFormData(editingEntity);
    } else {
      // 新增模式：使用預設值
      const initialData: Partial<T> = {};
      fields.forEach((field) => {
        if (field.defaultValue !== undefined) {
          initialData[field.name as keyof T] = field.defaultValue as any;
        }
      });
      setFormData(initialData);
    }
    setErrors({});
  }, [editingEntity, fields, open]);

  // 處理輸入變更
  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // 清除該欄位的錯誤訊息
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // 驗證表單
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      if (field.required) {
        const value = formData[field.name as keyof T];
        if (value === undefined || value === null || value === "") {
          newErrors[field.name] = `${field.label}為必填項`;
        }
      }

      // 數字欄位的範圍驗證
      if (field.type === "number" && formData[field.name as keyof T] !== undefined) {
        const value = Number(formData[field.name as keyof T]);
        if (field.min !== undefined && value < field.min) {
          newErrors[field.name] = `${field.label}不能小於 ${field.min}`;
        }
        if (field.max !== undefined && value > field.max) {
          newErrors[field.name] = `${field.label}不能大於 ${field.max}`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 處理提交
  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("提交表單失敗:", error);
    }
  };

  // 處理關閉
  const handleClose = () => {
    if (!submitting) {
      setFormData({});
      setErrors({});
      onClose();
    }
  };

  // 渲染表單欄位
  const renderField = (field: EntityField) => {
    const value = formData[field.name as keyof T] || "";

    if (field.type === "textarea") {
      return (
        <TextArea
          key={field.name}
          id={field.name}
          label={field.label}
          value={String(value)}
          onChange={(e) => handleChange(field.name, e.target.value)}
          placeholder={field.placeholder}
          required={field.required}
          error={errors[field.name]}
          rows={field.rows}
          disabled={submitting}
        />
      );
    }

    return (
      <Input
        key={field.name}
        id={field.name}
        type={field.type}
        label={field.label}
        value={field.type === "number" ? Number(value) : String(value)}
        onChange={(e) => {
          const newValue = field.type === "number" 
            ? Number(e.target.value) 
            : e.target.value;
          handleChange(field.name, newValue);
        }}
        placeholder={field.placeholder}
        required={field.required}
        error={errors[field.name]}
        min={field.min}
        max={field.max}
        disabled={submitting}
      />
    );
  };

  const dialogTitle = title || (editingEntity ? "編輯" : "新增");

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      title={dialogTitle}
      size="md"
      closeOnBackdropClick={!submitting}
      actions={
        <>
          <Button
            variant="ghost"
            onClick={handleClose}
            disabled={submitting}
          >
            取消
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            loading={submitting}
          >
            {submitting ? "提交中..." : "提交"}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {fields.map((field) => renderField(field))}
      </div>
    </Dialog>
  );
}

