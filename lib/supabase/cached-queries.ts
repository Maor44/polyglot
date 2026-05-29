import { unstable_cache } from 'next/cache';
import { createServerClient } from '@supabase/ssr';

// No request cookies needed — categories and languages are public reads
function createPublicClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  );
}

export const getCategories = unstable_cache(
  async () => {
    const supabase = createPublicClient();
    const { data } = await supabase.from('categories').select('*').order('sort_order');
    return data ?? [];
  },
  ['categories'],
  { revalidate: 3600 }
);

export const getLanguages = unstable_cache(
  async () => {
    const supabase = createPublicClient();
    const { data } = await supabase.from('languages').select('*').order('sort_order');
    return data ?? [];
  },
  ['languages'],
  { revalidate: 3600 }
);
