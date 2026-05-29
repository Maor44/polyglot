export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCategories, getLanguages } from '@/lib/supabase/cached-queries';
import { HomeClient } from './HomeClient';

export default async function HomePage() {
  const [supabase, cookieStore] = await Promise.all([createClient(), cookies()]);
  const cookieLangId = cookieStore.get('active_lang')?.value ?? 'ro';

  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) redirect('/onboarding');

  // categories and languages are cached — only user-specific queries hit the DB
  const [{ data: profile }, { data: langProgress }, { data: levels }, { data: userProgress }, categories, languages] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase.from('user_language_progress').select('*').eq('user_id', user.id).eq('language_id', cookieLangId).single(),
    supabase.from('levels').select('id, category_id, level_number, label_he, language_id, required_xp').eq('language_id', cookieLangId),
    supabase.from('user_level_progress').select('*').eq('user_id', user.id),
    getCategories(),
    getLanguages(),
  ]);

  if (!profile) redirect('/onboarding');
  if (!langProgress?.placement_done) redirect('/placement');

  return (
    <HomeClient
      profile={profile}
      langProgress={langProgress}
      categories={categories}
      levels={levels ?? []}
      userProgress={userProgress ?? []}
      languages={languages}
    />
  );
}
