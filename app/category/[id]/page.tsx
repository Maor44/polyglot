export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { CategoryClient } from './CategoryClient';

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [supabase, cookieStore] = await Promise.all([createClient(), cookies()]);
  const cookieLangId = cookieStore.get('active_lang')?.value ?? 'ro';

  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) redirect('/onboarding');

  // Run all queries in parallel — cookie langId avoids sequential profile waterfall,
  // and user_level_progress is fetched broadly so we don't need to wait on level IDs
  const [{ data: profile }, { data: category }, { data: levels }, { data: language }, { data: langProgress }, { data: languages }, { data: userProgress }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase.from('categories').select('*').eq('id', id).single(),
    supabase.from('levels').select('*').eq('category_id', id).eq('language_id', cookieLangId).order('level_number'),
    supabase.from('languages').select('*').eq('id', cookieLangId).single(),
    supabase.from('user_language_progress').select('*').eq('user_id', user.id).eq('language_id', cookieLangId).single(),
    supabase.from('languages').select('*').order('sort_order'),
    supabase.from('user_level_progress').select('*').eq('user_id', user.id),
  ]);

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
