export const dynamic = 'force-dynamic';
import { Suspense } from 'react';
import { headers } from 'next/headers';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getLanguages } from '@/lib/supabase/cached-queries';
import { LessonClient } from './LessonClient';
import { buildLesson } from '@/lib/lesson-builder';
import LessonLoading from './loading';

export default async function LessonPage({ params }: { params: Promise<{ levelId: string }> }) {
  const { levelId } = await params;

  if (levelId === 'ai') {
    const { LessonAIClient } = await import('./LessonAIClient');
    return <LessonAIClient />;
  }

  const headerStore = await headers();
  const userId = headerStore.get('x-user-id');
  if (!userId) redirect('/onboarding');

  return (
    <Suspense fallback={<LessonLoading />}>
      <LessonData levelId={levelId} userId={userId} />
    </Suspense>
  );
}

async function LessonData({ levelId, userId }: { levelId: string; userId: string }) {
  const [supabase, cookieStore] = await Promise.all([createClient(), cookies()]);
  const cookieLangId = cookieStore.get('active_lang')?.value ?? 'ro';

  const [{ data: level }, { data: vocab }, languages] = await Promise.all([
    supabase.from('levels').select('*, categories(*)').eq('id', levelId).single(),
    supabase.from('vocabulary').select('*').eq('level_id', levelId).order('sort_order'),
    getLanguages(),
  ]);

  if (!vocab || vocab.length === 0) redirect('/home');

  const language = languages.find((l: { id: string }) => l.id === cookieLangId) ?? null;
  const exercises = buildLesson(vocab);

  return (
    <LessonClient
      exercises={exercises}
      levelId={levelId}
      userId={userId}
      languageId={cookieLangId}
      ttsLocale={language?.tts_locale ?? 'ro-RO'}
      levelLabel={(level as Record<string, unknown> & { label_he?: string })?.label_he ?? ''}
      categoryName={(level as Record<string, unknown> & { categories?: { name_he: string; emoji: string } })?.categories?.name_he ?? ''}
      categoryEmoji={(level as Record<string, unknown> & { categories?: { emoji: string } })?.categories?.emoji ?? ''}
    />
  );
}
