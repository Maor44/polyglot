export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getLanguages } from '@/lib/supabase/cached-queries';
import { CategoryClient } from './CategoryClient';

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [supabase, cookieStore] = await Promise.all([createClient(), cookies()]);
  const cookieLangId = cookieStore.get('active_lang')?.value ?? 'ro';

  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) redirect('/onboarding');

  // languages list is cached; language by id and category fetched in parallel
  const [{ data: profile }, { data: category }, { data: levels }, { data: langProgress }, { data: userProgress }, languages] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase.from('categories').select('*').eq('id', id).single(),
    supabase.from('levels').select('*').eq('category_id', id).eq('language_id', cookieLangId).order('level_number'),
    supabase.from('user_language_progress').select('*').eq('user_id', user.id).eq('language_id', cookieLangId).single(),
    supabase.from('user_level_progress').select('*').eq('user_id', user.id),
    getLanguages(),
  ]);
  const language = languages.find((l: { id: string }) => l.id === cookieLangId) ?? null;

  return (
    <CategoryClient
      category={category}
      levels={levels ?? []}
      userProgress={userProgress ?? []}
      language={language}
      userId={user.id}
      profile={profile}
      langProgress={langProgress}
      languages={languages}
    />
  );
}
