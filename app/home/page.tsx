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

  // Fetch all remaining data in parallel — only langProgress needs to be checked before proceeding
  const [{ data: langProgress }, { data: categories }, { data: levels }, { data: languages }] = await Promise.all([
    supabase.from('user_language_progress').select('*').eq('user_id', user.id).eq('language_id', langId).single(),
    supabase.from('categories').select('id, name_he, emoji, color, sort_order').order('sort_order'),
    supabase.from('levels').select('id, category_id, level_number, label_he').eq('language_id', langId),
    supabase.from('languages').select('*').order('sort_order'),
  ]);

  if (!langProgress?.placement_done) redirect('/placement');

  // Scope to current language's levels only — avoids fetching all-time history
  const levelIds = (levels ?? []).map((l: { id: string }) => l.id);
  const { data: userProgress } = levelIds.length > 0
    ? await supabase.from('user_level_progress').select('level_id, completed, best_score').eq('user_id', user.id).in('level_id', levelIds)
    : { data: [] };

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
