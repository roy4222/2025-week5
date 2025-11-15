/**
 * 統一的資料實體型別定義
 * 集中管理所有 Supabase 資料表對應的 TypeScript 型別
 */

/**
 * 產品實體
 * 對應 products 資料表
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  created_at?: string;
}

/**
 * 遊戲實體
 * 對應 games 資料表
 */
export interface Game {
  id: string;
  title: string;
  genre: string;
  rating: number;
  created_at?: string;
}

/**
 * 商店商品實體
 * 對應 store 資料表
 */
export interface Store {
  id: string;
  name: string;
  description: string;
  price: number;
  created_at?: string;
}

/**
 * 動漫實體
 * 對應 animes 資料表
 */
export interface Anime {
  id: string;
  title: string;
  genre: string;
  rating: number;
  created_at?: string;
}

/**
 * 通用實體基礎介面
 * 所有實體都應該包含 id
 */
export interface BaseEntity {
  id: string;
  created_at?: string;
}

