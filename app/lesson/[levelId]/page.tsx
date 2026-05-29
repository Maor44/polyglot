export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getLanguages } from '@/lib/supabase/cached-queries';
import { LessonClient } from './LessonClient';
import { buildLesson } from '@/lib/lesson-builder';

export default async function LessonPage({ params }: { params: Promise<{ levelId: string }> }) {
  const { levelId } = await params;

  // AI lesson is handled client-side
  if (levelId === 'ai') {
    const { LessonAIClient } = await import('./LessonAIClient');
    return <LessonAIClient />;
  }

  const [supabase, cookieStore] = await Promise.all([createClient(), cookies()]);
  const cookieLangId = cookieStore.get('active_lang')?.value ?? 'ro';

  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) redirect('/onboarding');

  // languages list is cached — no extra DB query needed
  const [{ data: level }, { data: vocab }, languages] = await Promise.all([
    supabase.from('levels').select('*, categories(*)').eq('id', levelId).single(),
    supabase.from('vocabulary').select('*').eq('level_id', levelId).order('sort_order'),
    getLanguages(),
  ]);
  const language = languages.find((l: { id: string }) => l.id === cookieLangId) ?? null;

  if (!vocab || vocab.length === 0) redirect('/home');

  const exercises = buildLesson(vocab);

  return (
    <LessonClient
      exercises={exercises}
      levelId={levelId}
      userId={user.id}
      languageId={cookieLangId}
      ttsLocale={language?.tts_locale ?? 'ro-RO'}
      levelLabel={(level as Record<string, unknown> & { label_he?: string })?.label_he ?? ''}
      categoryName={(level as Record<string, unknown> & { categories?: { name_he: string; emoji: string } })?.categories?.name_he ?? ''}
      categoryEmoji={(level as Record<string, unknown> & { categories?: { emoji: string } })?.categories?.emoji ?? ''}
    />
  );
}
