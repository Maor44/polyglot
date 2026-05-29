export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { HomeClient } from './HomeClient';

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/onboarding');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) redirect('/onboarding');

  const langId = profile.active_language_id ?? 'ro';

  const { data: langProgress } = await supabase
    .from('user_language_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('language_id', langId)
    .single();

  if (!langProgress?.placement_done) redirect('/placement');

  const [{ data: categories }, { data: levels }, { data: userProgress }, { data: languages }] = await Promise.all([
    supabase.from('categories').select('*').order('sort_order'),
    supabase.from('levels').select('*').eq('language_id', langId),
    supabase.from('user_level_progress').select('*').eq('user_id', user.id),
    supabase.from('languages').select('*').order('sort_order'),
  ]);

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
