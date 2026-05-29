export const dynamic = 'force-dynamic';
import { Suspense } from 'react';
import { headers } from 'next/headers';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getLanguages } from '@/lib/supabase/cached-queries';
import { CategoryClient } from './CategoryClient';
import CategoryLoading from './loading';

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const headerStore = await headers();
  const userId = headerStore.get('x-user-id');
  if (!userId) redirect('/onboarding');

  return (
    <Suspense fallback={<CategoryLoading />}>
      <CategoryData id={id} userId={userId} />
    </Suspense>
  );
}

async function CategoryData({ id, userId }: { id: string; userId: string }) {
  const [supabase, cookieStore] = await Promise.all([createClient(), cookies()]);
  const cookieLangId = cookieStore.get('active_lang')?.value ?? 'ro';

  const [{ data: profile }, { data: category }, { data: levels }, { data: langProgress }, { data: userProgress }, languages] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', userId).single(),
    supabase.from('categories').select('*').eq('id', id).single(),
    supabase.from('levels').select('*').eq('category_id', id).eq('language_id', cookieLangId).order('level_number'),
    supabase.from('user_language_progress').select('*').eq('user_id', userId).eq('language_id', cookieLangId).single(),
    supabase.from('user_level_progress').select('*').eq('user_id', userId),
    getLanguages(),
  ]);

  const language = languages.find((l: { id: string }) => l.id === cookieLangId) ?? null;

  return (
    <CategoryClient
      category={category}
      levels={levels ?? []}
      userProgress={userProgress ?? []}
      language={language}
      userId={userId}
      profile={profile}
      langProgress={langProgress}
      languages={languages}
    />
  );
}
