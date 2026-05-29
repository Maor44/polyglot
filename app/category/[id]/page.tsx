export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { CategoryClient } from './CategoryClient';

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) redirect('/onboarding');

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  const langId = profile?.active_language_id ?? 'ro';

  const [{ data: category }, { data: levels }, { data: language }, { data: langProgress }, { data: languages }] = await Promise.all([
    supabase.from('categories').select('*').eq('id', id).single(),
    supabase.from('levels').select('*').eq('category_id', id).eq('language_id', langId).order('level_number'),
    supabase.from('languages').select('*').eq('id', langId).single(),
    supabase.from('user_language_progress').select('*').eq('user_id', user.id).eq('language_id', langId).single(),
    supabase.from('languages').select('*').order('sort_order'),
  ]);

  const levelIds = (levels ?? []).map((l: { id: string }) => l.id);
  const { data: userProgress } = await supabase
    .from('user_level_progress').select('*').eq('user_id', user.id)
    .in('level_id', levelIds.length > 0 ? levelIds : ['__none__']);

  return (
    <CategoryClient
      category={category}
      levels={levels ?? []}
      userProgress={userProgress ?? []}
      language={language}
      userId={user.id}
      profile={profile}
      langProgress={langProgress}
      languages={languages ?? []}
    />
  );
}
