/**
 * 通用型別定義
 * 用於跨組件和服務的共用型別
 */

/**
 * API 回應包裝型別
 */
export interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

/**
 * 分頁回應型別
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

/**
 * 表單欄位型別定義
 * 用於動態表單生成
 */
export type FieldType = 'text' | 'textarea' | 'number' | 'email' | 'date';

export interface EntityField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  rows?: number;
  defaultValue?: string | number;
}

/**
 * CRUD 操作狀態
 */
export interface CRUDState<T> {
  items: T[];
  loading: boolean;
  error: string | null;
  submitting: boolean;
  deletingId: string | null;
}

/**
 * 對話框尺寸選項
 */
export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * 按鈕變體
 */
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

/**
 * 載入狀態變體
 */
export type LoadingVariant = 'spinner' | 'dots' | 'bars';

