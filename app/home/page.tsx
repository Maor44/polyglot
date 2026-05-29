export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { HomeClient } from './HomeClient';

export default async function HomePage() {
  const [supabase, cookieStore] = await Promise.all([createClient(), cookies()]);
  const cookieLangId = cookieStore.get('active_lang')?.value ?? 'ro';

  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) redirect('/onboarding');

  // All queries in parallel — cookie langId avoids sequential profile waterfall,
  // and user_level_progress is fetched broadly so we don't need to wait on level IDs
  const [{ data: profile }, { data: langProgress }, { data: categories }, { data: levels }, { data: languages }, { data: userProgress }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase.from('user_language_progress').select('*').eq('user_id', user.id).eq('language_id', cookieLangId).single(),
    supabase.from('categories').select('id, name_he, emoji, color, sort_order').order('sort_order'),
    supabase.from('levels').select('id, category_id, level_number, label_he, language_id, required_xp').eq('language_id', cookieLangId),
    supabase.from('languages').select('*').order('sort_order'),
    supabase.from('user_level_progress').select('*').eq('user_id', user.id),
  ]);

  if (!profile) redirect('/onboarding');
  if (!langProgress?.placement_done) redirect('/placement');

  return (
    <HomeClient
      profile={profile}
      langProgress={langProgress}
      categories={categories ?? []}
      levels={levels ?? []}
      userProgress={userProgress ?? []}
      languages={languages ?? []}
    />
  );
}
