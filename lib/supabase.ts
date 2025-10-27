import { createClient } from '@supabase/supabase-js';

// 從環境變數中取得 Supabase URL 和 Anon Key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 創建 Supabase 客戶端
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

