export const dynamic = 'force-dynamic';
import { Suspense } from 'react';
import { headers } from 'next/headers';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getCategories, getLanguages } from '@/lib/supabase/cached-queries';
import { HomeClient } from './HomeClient';
import HomeLoading from './loading';

export default async function HomePage() {
  // Auth is already verified by middleware — read user ID from header (no getSession() call)
  const headerStore = await headers();
  const userId = headerStore.get('x-user-id');
  if (!userId) redirect('/onboarding');

  // Stream: send the skeleton immediately, resolve data behind it
  return (
    <Suspense fallback={<HomeLoading />}>
      <HomeData userId={userId} />
    </Suspense>
  );
}

async function HomeData({ userId }: { userId: string }) {
  const [supabase, cookieStore] = await Promise.all([createClient(), cookies()]);
  const cookieLangId = cookieStore.get('active_lang')?.value ?? 'ro';

  const [{ data: profile }, { data: langProgress }, { data: levels }, { data: userProgress }, categories, languages] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', userId).single(),
    supabase.from('user_language_progress').select('*').eq('user_id', userId).eq('language_id', cookieLangId).single(),
    supabase.from('levels').select('id, category_id, level_number, label_he, language_id, required_xp').eq('language_id', cookieLangId),
    supabase.from('user_level_progress').select('*').eq('user_id', userId),
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
